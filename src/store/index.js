import { create } from 'zustand'

export const useStore = create((set) => ({
  selectCategory: '',
  setCategory: (name) => set({ selectCategory: name }),
}))
