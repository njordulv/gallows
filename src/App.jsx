import { useState } from 'react'
import { IoRefresh } from 'react-icons/io5'
import { getRandom, genHiddenWord, updateWord } from './utils'
import { siteConfig } from './config'
import { Canvas } from './Canvas'

function App() {
  const random = getRandom(siteConfig.words)
  const attempts = 7
  const [randomWord, setRandomWord] = useState(random)
  const hiddenWord = genHiddenWord(randomWord)
  const [word, setWord] = useState(hiddenWord)
  const [usedLetters, setUsedLetters] = useState([])
  const [count, setCount] = useState(0)

  const getLetter = (letter) => {
    if (usedLetters.includes(letter)) return

    setUsedLetters((prev) => [...prev, letter])

    const { updatedWord, guess } = updateWord(randomWord, word, letter)

    if (!guess && count < attempts) setCount((count) => count + 1)

    setWord(updatedWord)
  }

  const restart = () => {
    const newWord = getRandom(siteConfig.words)
    setRandomWord(newWord)
    setWord(genHiddenWord(newWord))
    setCount(0)
    setUsedLetters([])
  }

  return (
    <div className="wrapper">
      <Canvas count={count} />
      <h1>{count < attempts ? word : randomWord}</h1>
      <div className="desk">
        <button
          className="btn refresh-btn"
          type="button"
          title="Reset"
          onClick={() => restart()}
        >
          <IoRefresh size="23" />
        </button>
        <div className="attempts">
          <span>{count}</span>
          <span>/</span>
          <span>{attempts}</span>
        </div>
      </div>
      <div className="buttons">
        {siteConfig.alphabet.map((letter, index) => (
          <button
            key={index}
            disabled={usedLetters.includes(letter)}
            onClick={() => getLetter(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
