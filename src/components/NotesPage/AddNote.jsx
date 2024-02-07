import React, { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const AddNote = ({ setNotePage }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('lt-LT');

  const adjustTextAreaHeight = (e) => {
    // Temporarily shrink the textarea to 'auto' to let it adjust based on content
    e.target.style.height = 'auto';
    // Then set the height to the scrollHeight plus a little extra space to avoid scroll bar appearance
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents adding a new line
    }
  };

  return (
    <div className="add-note">
      <div className="header">
        <button onClick={() => setNotePage(false)}>
          <AiOutlineArrowLeft />
        </button>
      </div>

      <textarea
        name='title'
        className='note-title'
        placeholder='Pavadinimas'
        onKeyDown={handleTitleKeyDown}
        onChange={adjustTextAreaHeight} // Optional: If you want the title to expand vertically as well
      />
      <p className='note-date'>{formattedDate}</p>
      <textarea
        name='text'
        className='note-text'
        placeholder='Sukurkite įrašą...'
        onChange={adjustTextAreaHeight}
        style={{ minHeight: '100px' }} // Set a minimum height
      />
    </div>
  );
}

export default AddNote;
