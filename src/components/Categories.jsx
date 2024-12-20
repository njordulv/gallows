import { motion } from 'motion/react'
import { IoMenuOutline } from 'react-icons/io5'
import { siteConfig } from '@/config'
import { useStore } from '@/store'
import { Category } from '@/components/Category'

export const Categories = () => {
  const { open, setOpen } = useStore()

  return (
    <motion.div className="menu" animate={open ? 'open' : 'closed'}>
      <button title="Categories" onClick={setOpen} className="btn full-w">
        <IoMenuOutline size={24} />
      </button>
      <motion.ul
        initial={wrapper.closed}
        variants={wrapper}
        className={`list ${open ? 'open' : 'closed'}`}
        style={{ originY: 'top' }}
      >
        {Object.keys(siteConfig.categories).map((category) => (
          <Category key={category} name={category} />
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
