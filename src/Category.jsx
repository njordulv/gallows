import { motion } from 'motion/react'
import { capitalizeWord } from '@/utils'
import { useStore } from '@/store'
import { genHiddenWord } from '@/utils'
import { siteConfig } from '@/config'

export const Category = ({
  name,
  setOpen,
  getRandom,
  setRandomWord,
  setWord,
}) => {
  const { setCategory, reset } = useStore()

  const handleClick = () => {
    setCategory(name)
    setOpen()
    const words = siteConfig.categories[name]
    const newWord = getRandom(words)
    setRandomWord(newWord)
    setWord(genHiddenWord(newWord))
    reset()
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
