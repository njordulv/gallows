import { useState } from 'react'
import { motion } from 'motion/react'
import { IoMenuOutline } from 'react-icons/io5'
import { siteConfig } from './config'

const wrapperVariants = {
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

const itemVariants = {
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

export const Categories = () => {
  const [open, setOpen] = useState(false)

  return (
    <motion.div className="menu" animate={open ? 'open' : 'closed'}>
      <button onClick={() => setOpen((pv) => !pv)}>
        <IoMenuOutline size={23} />
      </button>
      <motion.ul
        initial={wrapperVariants.closed}
        variants={wrapperVariants}
        className={`list ${open ? 'open' : 'closed'}`}
        style={{ originY: 'top' }}
      >
        {Object.keys(siteConfig.categories).map((category) => (
          <motion.li
            key={category}
            variants={itemVariants}
            onClick={() => setOpen(false)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}
