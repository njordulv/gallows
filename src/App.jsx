import { useState, useEffect } from 'react'
import { IoRefresh } from 'react-icons/io5'
import { getRandom, genHiddenWord, updateWord } from './utils'
import { siteConfig } from './config'
import { Canvas } from './Canvas'

function App() {
  const random = getRandom(siteConfig.categories.animals)
  const attempts = 7
  const [randomWord, setRandomWord] = useState(random)
  const hiddenWord = genHiddenWord(randomWord)
  const [word, setWord] = useState(hiddenWord)
  const [usedLetters, setUsedLetters] = useState([])
  const [count, setCount] = useState(0)

  const [defeats, setDefeats] = useState(() => {
    const defeat = localStorage.getItem('defeats')
    return defeat ? JSON.parse(defeat) : 0
  })

  const [wins, setWins] = useState(() => {
    const win = localStorage.getItem('wins')
    return win ? JSON.parse(win) : 0
  })

  const getLetter = (letter) => {
    if (usedLetters.includes(letter)) return

    setUsedLetters((prev) => [...prev, letter])

    const { updatedWord, guess } = updateWord(randomWord, word, letter)

    if (!guess && count < attempts) setCount((count) => count + 1)

    setWord(updatedWord)
  }

  useEffect(() => {
    if (count === attempts) {
      setDefeats((prev) => prev + 1)
    }
  }, [count, attempts])

  useEffect(() => {
    if (!word.includes('_')) {
      setWins((prev) => prev + 1)
    }
  }, [word])

  useEffect(() => {
    localStorage.setItem('defeats', JSON.stringify(defeats))
  }, [defeats])

  useEffect(() => {
    localStorage.setItem('wins', JSON.stringify(wins))
  }, [wins])

  const refresh = () => {
    const newWord = getRandom(siteConfig.categories.animals)
    setRandomWord(newWord)
    setWord(genHiddenWord(newWord))
    setCount(0)
    setUsedLetters([])
  }

  return (
    <div className="wrapper">
      <Canvas count={count} />
      <h1>{count < attempts ? word : randomWord}</h1>
      <div className="userboard">
        <button
          className="btn refresh-btn"
          type="button"
          title="Refresh"
          onClick={() => refresh()}
        >
          <IoRefresh size="23" />
        </button>
        <div className="stats">
          <span>Tries:</span>
          <span className="white">
            {count}/{attempts}
          </span>
        </div>
        <div className="stats">
          <span>Wins:</span>
          <span className="success">{wins}</span>
        </div>
        <div className="stats">
          <span>Defeats:</span>
          <span className="danger">{defeats}</span>
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
