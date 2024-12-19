import { useState, useEffect } from 'react'
import { getRandom, genHiddenWord, updateWord } from '@/utils'
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
    setCount,
    usedLetters,
    addUsedLetter,
    attempts,
    setLooses,
    setWins,
  } = useStore()
  const random = getRandom(theme)
  const [randomWord, setRandomWord] = useState(random)
  const hiddenWord = genHiddenWord(randomWord)
  const [word, setWord] = useState(hiddenWord)

  const getLetter = (letter) => {
    if (usedLetters.includes(letter)) return
    addUsedLetter(letter)

    const { updatedWord, guess } = updateWord(randomWord, word, letter)

    if (!guess && count < attempts) {
      setCount()
    }
    setWord(updatedWord)
  }

  useEffect(() => {
    if (count === attempts) {
      setLooses((prev) => prev + 1)
    }
  }, [count, attempts, setLooses])

  useEffect(() => {
    if (!word.includes('_')) {
      setWins((prev) => prev + 1)
    }
  }, [word, setWins])

  return (
    <div className="wrapper">
      <Canvas count={count} />
      <h1>{count < attempts ? word : randomWord}</h1>
      <div className="userboard">
        <Stats />
        <RefreshBtn
          getRandom={getRandom}
          setRandomWord={setRandomWord}
          setWord={setWord}
        />
        <Categories
          getRandom={getRandom}
          setRandomWord={setRandomWord}
          setWord={setWord}
        />
      </div>
      <div className="buttons">
        {siteConfig.alphabet.map((letter, index) => (
          <AlphabetBtn
            key={index}
            letter={letter}
            disabled={usedLetters.includes(letter)}
            onClick={() => getLetter(letter)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
