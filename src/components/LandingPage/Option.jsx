import React from 'react'

const Option = ({iconSrc, title, description, motion, scrollRef}) => {
  

  const cardVariants = {
    offscreen: {
      x: 300
    },
    onscreen: {
      x: 0,
      transition: {
        type: "spring",
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
    initial="offscreen"
    whileInView="onscreen"
    variants={cardVariants}
      viewport={{ once: true, amount: 0.5 }}
    className="option">
    <img src={iconSrc} alt={title} />
    <div className="option-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </motion.div>
  )
}

export default Option