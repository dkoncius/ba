import React, { useEffect, useRef } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const SelectedNote = ({ selectedNote, setSelectedNote, notesData }) => {
  const currentIndex = notesData.findIndex(note => note.id === selectedNote.id);

  // Use useRef to create references for the title and text textareas
  const titleRef = useRef(null);
  const textRef = useRef(null);

  const navigate = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < notesData.length) {
      setSelectedNote(notesData[newIndex]);
    }
  };

  // Adjusts the height of the textarea referenced by the ref argument
  const adjustTextAreaHeight = (ref) => {
    if (ref && ref.current) {
      const element = ref.current;
      element.style.height = 'auto'; // Reset height to recalculate
      element.style.height = `${element.scrollHeight}px`; // Set to scroll height
    }
  };

  useEffect(() => {
    // Adjust heights when selectedNote changes
    adjustTextAreaHeight(titleRef);
    adjustTextAreaHeight(textRef);
  }, [selectedNote]); // Dependency array includes selectedNote to trigger effect when it changes

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents adding a new line
    }
  };

  const handleChange = (ref) => (e) => {
    adjustTextAreaHeight(ref); // Adjust height on change
  };

  return (
    <div className="selected-note">
      <div className="container">
      
        <div className="header">
          <button onClick={() => setSelectedNote(null)}>
            <AiOutlineArrowLeft />
          </button>
        </div>

        <textarea
          name='title'
          className='note-title'
          placeholder='Pavadinimas'
          onKeyDown={handleTitleKeyDown}
          onChange={handleChange(titleRef)} // Adjust height on change, passing the ref
          ref={titleRef} // Attach the ref to the element
          value={selectedNote.noteTitle}
        />
        <p className='note-date'>{selectedNote.noteDate}</p>
        <textarea
          name='text'
          className='note-text'
          placeholder='Sukurkite įrašą...'
          onChange={handleChange(textRef)} // Adjust height on change, passing the ref
          ref={textRef} // Attach the ref to the element
          value={selectedNote.noteText}
        />

        <nav>
          <button
            onClick={() => navigate(-1)}
            className={currentIndex === 0 ? "hidden" : ""}
          >
            <MdKeyboardArrowLeft />
          </button>

          <button
            onClick={() => navigate(1)}
            className={currentIndex === notesData.length - 1 ? "hidden" : ""}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SelectedNote;
