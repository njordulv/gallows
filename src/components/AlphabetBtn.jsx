import { useStore } from '@/store'

export const AlphabetBtn = ({ letter }) => {
  const { usedLetters, handleLetterClick } = useStore()

  return (
    <button
      disabled={usedLetters.includes(letter)}
      onClick={() => handleLetterClick(letter)}
    >
      {letter}
    </button>
  )
}
