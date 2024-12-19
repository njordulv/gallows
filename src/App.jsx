import { useState, useEffect } from 'react'
import { IoRefresh } from 'react-icons/io5'
import { getRandom, genHiddenWord, updateWord, triesCount } from './utils'
import { siteConfig } from './config'
import { Canvas } from './Canvas'
import { Categories } from './Categories'
import { AlphabetBtn } from './AlphabetBtn'
import { useStore } from './store'

function App() {
  const { count, setCount, category, usedLetters, addUsedLetter, reset } =
    useStore()
  const theme = siteConfig.categories[category || 'animals']
  const random = getRandom(theme)
  const attempts = 7
  const [randomWord, setRandomWord] = useState(random)
  const hiddenWord = genHiddenWord(randomWord)
  const [word, setWord] = useState(hiddenWord)

  const [looses, setLooses] = useState(() => {
    const loose = localStorage.getItem('looses')
    return loose ? JSON.parse(loose) : 0
  })

  const [wins, setWins] = useState(() => {
    const win = localStorage.getItem('wins')
    return win ? JSON.parse(win) : 0
  })

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
  }, [count, attempts])

  useEffect(() => {
    if (!word.includes('_')) {
      setWins((prev) => prev + 1)
    }
  }, [word])

  useEffect(() => {
    localStorage.setItem('looses', JSON.stringify(looses))
  }, [looses])

  useEffect(() => {
    localStorage.setItem('wins', JSON.stringify(wins))
  }, [wins])

  const refresh = () => {
    const words = theme
    const newWord = getRandom(words)
    setRandomWord(newWord)
    setWord(genHiddenWord(newWord))
    reset()
  }

  return (
    <div className="wrapper">
      <Canvas count={count} />
      <h1>{count < attempts ? word : randomWord}</h1>
      <div className="userboard">
        <div className="stats">
          <span>Tries:</span>
          <span className="white">{triesCount(count, attempts)}</span>
        </div>
        <div className="stats">
          <span>Wins:</span>
          <span className="success">{wins}</span>
        </div>
        <div className="stats">
          <span>Looses:</span>
          <span className="danger">{looses}</span>
        </div>
        <button
          className="btn refresh-btn"
          type="button"
          title="Refresh"
          onClick={() => refresh()}
        >
          <IoRefresh size={23} />
        </button>
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
