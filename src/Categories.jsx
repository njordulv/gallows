import { useState } from 'react'
import { motion } from 'motion/react'
import { IoMenuOutline } from 'react-icons/io5'
import { siteConfig } from './config'
import { Category } from './Category'

export const Categories = ({
  setCount,
  setUsedLetters,
  getRandom,
  setRandomWord,
  setWord,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <motion.div className="menu" animate={open ? 'open' : 'closed'}>
      <button onClick={() => setOpen((pv) => !pv)}>
        <IoMenuOutline size={23} />
      </button>
      <motion.ul
        initial={wrapper.closed}
        variants={wrapper}
        className={`list ${open ? 'open' : 'closed'}`}
        style={{ originY: 'top' }}
      >
        {Object.keys(siteConfig.categories).map((category) => (
          <Category
            key={category}
            name={category}
            onClick={() => setOpen(false)}
            setCount={setCount}
            setUsedLetters={setUsedLetters}
            getRandom={getRandom}
            setRandomWord={setRandomWord}
            setWord={setWord}
          />
        ))}
      </motion.ul>
    </motion.div>
  )
}

const wrapper = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
}
