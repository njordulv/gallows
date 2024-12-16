import { motion } from 'motion/react'

// eslint-disable-next-line react/prop-types
export const Canvas = ({ count, color = '#363636' }) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1.1,
      opacity: 1,
      transition: {
        pathLength: { type: 'spring', duration: 1.1 },
        opacity: { duration: 0.02 },
      },
    },
  }

  return (
    <motion.svg
      width="288"
      height="400"
      viewBox="0 0 288 400"
      initial="hidden"
      animate="visible"
    >
      <motion.line // stage
        x1="2"
        y1="397"
        x2="286"
        y2="397"
        stroke={color}
      />
      <motion.line // pole
        x1="200"
        y1="0"
        x2="200"
        y2="397"
        stroke={color}
        strokeWidth={5}
      />
      <motion.line // top
        x1="50"
        y1="2"
        x2="200"
        y2="2"
        stroke={color}
      />
      <motion.line // rib
        x1="160"
        y1="0"
        x2="200"
        y2="40"
        stroke={color}
      />
      {count > 0 && (
        <motion.line // rope
          x1="50"
          y1="0"
          x2="52"
          y2="100"
          stroke={color}
          variants={draw}
        />
      )}
      {count > 1 && (
        <motion.circle // head
          cx="52"
          cy="122"
          r="20"
          stroke={color}
          variants={draw}
        />
      )}
      {count > 2 && (
        <motion.line // body
          x1="51"
          y1="144"
          x2="51"
          y2="210"
          stroke={color}
          variants={draw}
        />
      )}
      {count > 3 && (
        <motion.line // r arm
          x1="51"
          y1="158"
          x2="63"
          y2="190"
          stroke={color}
          variants={draw}
        />
      )}
      {count > 4 && (
        <motion.line // l arm
          x1="51"
          y1="158"
          x2="38"
          y2="190"
          stroke={color}
          variants={draw}
        />
      )}
      {count > 5 && (
        <motion.line // r leg
          x1="51"
          y1="210"
          x2="66"
          y2="246"
          stroke={color}
          variants={draw}
        />
      )}
      {count > 6 && (
        <motion.line // l leg
          x1="51"
          y1="210"
          x2="36"
          y2="246"
          stroke={color}
          variants={draw}
        />
      )}
    </motion.svg>
  )
}
