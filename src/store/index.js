import { create } from 'zustand'

export const useStore = create((set) => ({
  open: false,
  setOpen: () => set((state) => ({ open: !state.open })),
  category: '',
  setCategory: (name) => set({ category: name }),
  count: 0,
  setCount: () => set((state) => ({ count: state.count + 1 })),
  usedLetters: [],
  addUsedLetter: (letter) =>
    set((state) => ({
      usedLetters: state.usedLetters.includes(letter)
        ? state.usedLetters
        : [...state.usedLetters, letter],
    })),
  reset: () =>
    set({
      open: false,
      count: 0,
      usedLetters: [],
    }),
}))
