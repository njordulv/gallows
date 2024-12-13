import { useState } from 'react'
import { IoRefresh } from 'react-icons/io5'
import { getRandom } from './utils/functions'
import { siteConfig } from './config/site'
import './App.css'

function App() {
  const [randomWord, setRandomWord] = useState(getRandom(siteConfig.words))
  const [word, setWord] = useState(randomWord.split('').map(() => '_'))
  const [usedLetters, setUsedLetters] = useState([])
  const [count, setCount] = useState(0)

  const updateCount = () => setCount((count) => count + 1)

  const getLetter = (letter) => {
    if (usedLetters.includes(letter)) return

    setUsedLetters((prev) => [...prev, letter])

    let guess = false

    const updatedWord = word.map((el, index) => {
      if (randomWord[index] === letter) {
        guess = true
        return letter
      } else {
        return el
      }
    })

    !guess && updateCount()

    setWord(updatedWord)
  }

  const restart = () => {
    const newWord = getRandom(siteConfig.words)
    setRandomWord(newWord)
    setWord(newWord.split('').map(() => '_'))
    setCount(0)
    setUsedLetters([])
  }

  return (
    <div className="wrapper">
      <h1>{count < 7 ? word : randomWord}</h1>
      <h2>Count is {count}</h2>
      <h3>{randomWord}</h3>
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
