import React from 'react'

const Note = ({note, handleNoteClick}) => {
  return (
    <div className="note" onClick={() => handleNoteClick(note.id)}>
        <h3 className='note-title'>{note.noteTitle}</h3>
        <p className='note-text'>{note.noteText.length > 100 ? note.noteText.substring(0, 100) + "..." : note.noteText}</p>
    </div>
  )
}

export default Note