import React from 'react'

const Option = ({iconSrc, title, description}) => {
  return (
    <div className="option">
    <img src={iconSrc} alt={title} />
    <div className="option-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
  )
}

export default Option