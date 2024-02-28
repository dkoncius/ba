import React from 'react'

const Note = ({note, handleNoteClick}) => {
  return (
    <div className="note" onClick={() => handleNoteClick(note.id)}>
        <h3 className='note-title'>{note.title}</h3>
        <p className='note-text'>{note.text.length > 100 ? note.text.substring(0, 100) + "..." : note.text}</p>
    </div>
  )
}

export default Note