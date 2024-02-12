import { motion  } from "framer-motion"
import React, { useState } from 'react';
import Note from './Note';
import SelectedNote from './SelectedNote';

const notesData = [
  { id: 1, noteTitle: "Pradėjo vaikščioti", noteText: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti perferendis est dolorem cumque quam deserunt unde consectetur commodi omnis eveniet voluptatibus, asperiores...", noteDate: "2024-01-15" },
  { id: 2, noteTitle: "Sunkumai", noteText: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source", noteDate: "2024-01-20" },
  { id: 3, noteTitle: "Tėvų pagalba", noteText: "Asperiores omnis vero blanditiis sit officiis sequi.", noteDate: "2024-02-05" }
];

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState(null);

  const handleNoteClick = (noteId) => {
    console.log("clicked");
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
