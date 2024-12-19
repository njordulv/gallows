import { IoRefresh } from 'react-icons/io5'
import { genHiddenWord } from '@/utils'
import { useStore } from '@/store'

export const RefreshBtn = ({ getRandom, setRandomWord, setWord }) => {
  const { theme, reset } = useStore()

  const refresh = () => {
    const newWord = getRandom(theme)
    setRandomWord(newWord)
    setWord(genHiddenWord(newWord))
    reset()
  }

  return (
    <button
      className="btn refresh-btn"
      type="button"
      title="Refresh"
      onClick={() => refresh()}
    >
      <IoRefresh size={23} />
    </button>
  )
}
