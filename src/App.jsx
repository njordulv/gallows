import { useState, useEffect } from 'react'
import { IoRefresh } from 'react-icons/io5'
import { getRandom, genHiddenWord, updateWord, triesCount } from './utils'
import { siteConfig } from './config'
import { Canvas } from './Canvas'
import { Categories } from './Categories'
import { AlphabetBtn } from './AlphabetBtn'
import { useStore } from './store'

function App() {
  const category = useStore((state) => state.selectCategory)
  const random = getRandom(siteConfig.categories[category || 'animals'])
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
    const words = siteConfig.categories[category || 'animals']
    const newWord = getRandom(words)
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
          <span className="danger">{defeats}</span>
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
          setCount={setCount}
          setUsedLetters={setUsedLetters}
          getRandom={getRandom}
          setRandomWord={setRandomWord}
          setWord={setWord}
          refresh={() => refresh()}
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
