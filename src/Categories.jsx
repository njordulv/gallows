import { motion } from 'motion/react'
import { IoMenuOutline } from 'react-icons/io5'
import { siteConfig } from '@/config'
import { Category } from '@/Category'
import { useStore } from '@/store'

export const Categories = ({ getRandom, setRandomWord, setWord }) => {
  const { open, setOpen } = useStore()

  return (
    <motion.div className="menu" animate={open ? 'open' : 'closed'}>
      <button title="Categories" onClick={setOpen}>
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
            setOpen={setOpen}
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
      staggerChildren: 0.09,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.09,
    },
  },
}
