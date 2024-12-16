import { useState } from 'react'
import { IoRefresh } from 'react-icons/io5'
import { getRandom, genHiddenWord, updateWord } from './utils'
import { siteConfig } from './config'
import { Canvas } from './Canvas'
import './App.css'

function App() {
  const random = getRandom(siteConfig.words)
  const [randomWord, setRandomWord] = useState(random)
  const hiddenWord = genHiddenWord(randomWord)
  const [word, setWord] = useState(hiddenWord)
  const [usedLetters, setUsedLetters] = useState([])
  const [count, setCount] = useState(0)

  const getLetter = (letter) => {
    if (usedLetters.includes(letter)) return

    setUsedLetters((prev) => [...prev, letter])

    const { updatedWord, guess } = updateWord(randomWord, word, letter)

    if (!guess) setCount((count) => count + 1)

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
      <h1>{count < 7 ? word : randomWord}</h1>
      <button
        className="btn refresh-btn"
        type="button"
        onClick={() => restart()}
      >
        <IoRefresh size="23" />
      </button>
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
