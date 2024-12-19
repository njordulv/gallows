import { create } from 'zustand'
import { siteConfig } from '@/config'

export const useStore = create((set) => ({
  attempts: 7,
  open: false,
  setOpen: () => set((state) => ({ open: !state.open })),
  theme: siteConfig.categories['animals'],
  category: '',
  setCategory: (name) =>
    set({ category: name, theme: siteConfig.categories[name || 'animals'] }),
  count: 0,
  setCount: () => set((state) => ({ count: state.count + 1 })),
  usedLetters: [],
  addUsedLetter: (letter) =>
    set((state) => ({
      usedLetters: state.usedLetters.includes(letter)
        ? state.usedLetters
        : [...state.usedLetters, letter],
    })),
  wins: JSON.parse(localStorage.getItem('wins')) || 0,
  looses: JSON.parse(localStorage.getItem('looses')) || 0,
  setWins: () =>
    set((state) => {
      const updatedWins = state.wins + 1
      localStorage.setItem('wins', JSON.stringify(updatedWins))
      return { wins: updatedWins }
    }),
  setLooses: () =>
    set((state) => {
      const updatedLooses = state.looses + 1
      localStorage.setItem('looses', JSON.stringify(updatedLooses))
      return { looses: updatedLooses }
    }),
  reset: () =>
    set({
      open: false,
      count: 0,
      usedLetters: [],
    }),
}))
