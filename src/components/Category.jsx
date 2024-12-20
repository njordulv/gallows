import { motion } from 'motion/react'
import { capitalizeWord } from '@/utils'
import { useStore } from '@/store'

export const Category = ({ name }) => {
  const { setOpen, setCategory, reset } = useStore()

  const handleClick = () => {
    setCategory(name)
    setOpen()
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
