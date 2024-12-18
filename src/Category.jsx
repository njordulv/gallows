import { motion } from 'motion/react'
import { capitalizeWord } from './utils'

export const Category = ({ name, onClick }) => {
  return (
    <motion.li variants={item} onClick={onClick}>
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
