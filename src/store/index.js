import { create } from 'zustand'
import { siteConfig } from '@/config'
import {
  uniqueArray,
  isValidCategory,
  getLocalStorage,
  setLocalStorage,
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
  usedLetters: [],
  addUsedLetter: (letter) =>
    set((state) => ({
      usedLetters: uniqueArray(state.usedLetters, letter),
    })),
  wins: getLocalStorage('wins', 0),
  looses: getLocalStorage('looses', 0),
  setWins: () =>
    set((state) => {
      const updatedWins = state.wins + 1
      setLocalStorage('wins', updatedWins)
      return { wins: updatedWins }
    }),
  setLooses: () =>
    set((state) => {
      const updatedLooses = state.looses + 1
      setLocalStorage('looses', updatedLooses)
      return { looses: updatedLooses }
    }),
  reset: () =>
    set({
      open: false,
      count: 0,
      usedLetters: [],
    }),
}))
