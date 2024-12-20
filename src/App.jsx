import { useState, useEffect } from 'react'
import { getRandom } from '@/utils'
import { siteConfig } from '@/config'
import { useStore } from '@/store'
import { Canvas } from '@/components/Canvas'
import { Stats } from '@/components/Stats'
import { RefreshBtn } from '@/components/RefreshBtn'
import { Categories } from '@/components/Categories'
import { AlphabetBtn } from '@/components/AlphabetBtn'

function App() {
  const {
    theme,
    count,
    category,
    attempts,
    word,
    randomWord,
    setRandomWord,
    setWins,
    setLooses,
    reset,
  } = useStore()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setRandomWord(getRandom(theme))
  }, [theme, setRandomWord])

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true)
      return
    }
    if (
      word &&
      !word.includes('_') &&
      word
        .split('')
        .every(
          (char, index) =>
            char === randomWord[index] || randomWord[index] === ' '
        )
    ) {
      setWins()
      setTimeout(() => {
        reset()
      }, 2000)
    }
  }, [hasMounted, word, randomWord, setWins, reset])

  useEffect(() => {
    if (count === attempts) {
      setLooses()
      setTimeout(() => {
        reset()
      }, 2000)
    }
  }, [count, attempts, setLooses, reset])

  return (
    <div className="wrapper">
      <Canvas count={count} />
      <div className="heading">
        <div className="theme">
          Theme: <span className="theme__name">{category || 'animals'}</span>
        </div>
        <h1>{count < attempts ? word : randomWord}</h1>
      </div>
      <div className="userboard">
        <Stats />
        <RefreshBtn />
        <Categories />
      </div>
      <div className="alphabet">
        {siteConfig.alphabet.map((letter, index) => (
          <AlphabetBtn key={index} letter={letter} />
        ))}
      </div>
    </div>
  )
}

export default App
