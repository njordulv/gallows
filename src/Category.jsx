import { motion } from 'motion/react'
import { capitalizeWord } from './utils'
import { useStore } from './store'
import { genHiddenWord } from './utils'
import { siteConfig } from './config'

export const Category = ({
  name,
  onClick,
  setCount,
  setUsedLetters,
  getRandom,
  setRandomWord,
  setWord,
}) => {
  const { setCategory } = useStore()

  const handleClick = () => {
    setCategory(name)
    onClick()
    const words = siteConfig.categories[name]
    const newWord = getRandom(words)
    setRandomWord(newWord)
    setWord(genHiddenWord(newWord))
    setCount(0)
    setUsedLetters([])
  }

  return (
    <motion.li variants={item} onClick={handleClick}>
      {capitalizeWord(name)}
    </motion.li>
  )
}

const item = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -9,
    transition: {
      when: 'afterChildren',
    },
  },
}
