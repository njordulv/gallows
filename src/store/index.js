import { create } from 'zustand'
import { siteConfig } from '@/config'
import {
  uniqueArray,
  isValidCategory,
  getLocalStorage,
  setLocalStorage,
  updateWord,
  getRandom,
  generateHiddenWord,
} from '@/utils'

export const useStore = create((set) => ({
  attempts: 7,
  open: false,
  setOpen: () => set((state) => ({ open: !state.open })),
  theme: siteConfig.categories['animals'],
  category: '',
  setCategory: (name) =>
    set({
      category: isValidCategory(siteConfig, name) ? name : '',
      theme: siteConfig.categories[name || 'animals'],
    }),
  count: 0,
  setCount: () => set((state) => ({ count: state.count + 1 })),
  word: '',
  randomWord: '',
  setRandomWord: (word) =>
    set({
      randomWord: word,
      word: word
        .split('')
        .map((char) => (char === ' ' ? ' ' : '_'))
        .join(''),
    }),
  handleLetterClick: (letter) =>
    set((state) => {
      if (state.usedLetters.includes(letter)) return state

      const updatedUsedLetters = uniqueArray(state.usedLetters, letter)
      const { updatedWord, guess } = updateWord(
        state.randomWord,
        state.word,
        letter
      )

      const newState = {
        usedLetters: updatedUsedLetters,
        word: updatedWord,
      }

      if (!guess && state.count < state.attempts) {
        newState.count = state.count + 1
      }

      return newState
    }),
  usedLetters: [],
  addUsedLetter: (letter) =>
    set((state) => ({
      usedLetters: uniqueArray(state.usedLetters, letter),
    })),
  wins: getLocalStorage('wins', 0),
  setWins: () =>
    set((state) => {
      const updatedWins = state.wins + 1
      setLocalStorage('wins', updatedWins)
      return { wins: updatedWins }
    }),
  looses: getLocalStorage('looses', 0),
  setLooses: () =>
    set((state) => {
      const updatedLooses = state.looses + 1
      setLocalStorage('looses', updatedLooses)
      return { looses: updatedLooses }
    }),
  reset: () =>
    set((state) => {
      const newWord = getRandom(state.theme)
      return {
        randomWord: newWord,
        word: generateHiddenWord(newWord),
        open: false,
        count: 0,
        usedLetters: [],
      }
    }),
}))
