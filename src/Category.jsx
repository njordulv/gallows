import { motion } from 'motion/react'
import { capitalizeWord } from './utils'
import { useStore } from './store'

export const Category = ({ name, onClick }) => {
  const { setCategory } = useStore()

  const handleClick = () => {
    setCategory(name)
    onClick()
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
    y: -15,
    transition: {
      when: 'afterChildren',
    },
  },
}
