import { motion } from "framer-motion"
import React, { useState } from 'react';
import Note from './Note';
import SelectedNote from './SelectedNote';

const Notes = ({notesData}) => {
  const [selectedNote, setSelectedNote] = useState(null);

  const handleNoteClick = (noteId) => {
    const selectedNoteData = notesData.find(note => note.id === noteId);
    setSelectedNote(selectedNoteData);
  };

  const animation = { 
    hidden: {opacity: 0, y: 30},
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        staggerChildren: 0.3
      }
    }
  }

  return (
    <>  
    <motion.div 
      variants={animation} initial="hidden" animate="visible" 
      className="notes container">
      {notesData.map((note) => (
        <Note
          note={note}
          key={note.id}
          handleNoteClick={handleNoteClick} // Pass a click handler
        />
      ))}

      {/* Display the clicked note */}
    </motion.div>
    {selectedNote && <SelectedNote selectedNote={selectedNote} setSelectedNote={setSelectedNote} notesData={notesData}/>}
    </>
  );
};

export default Notes;
