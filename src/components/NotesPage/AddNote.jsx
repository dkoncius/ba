import React, { useContext, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { db } from '../../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import UserContext from '../../contexts/UserContext';
import { useParams } from 'react-router-dom';

const AddNote = ({ setNotePage }) => {
  const {kidId} = useParams();
  const {user} = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('lt-LT');

  const adjustTextAreaHeight = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleSaveNote = async () => {
    if (!title.trim() && !text.trim()) {
      alert('Note is empty!');
      return;
    }
    try {
      await addDoc(collection(db, `users/${user.uid}/notes`), {
        kidId: kidId,
        title: title,
        text: text,
        date: formattedDate
      });
      alert('Note saved successfully');
      setNotePage(false); // Close the note page or redirect as needed
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Error saving note');
    }
  };

  return (
    <div className="add-note">
      <div className="container">
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
          onChange={(e) => {
            adjustTextAreaHeight(e);
            setTitle(e.target.value);
          }}
          value={title}
        />
        <p className='note-date'>{formattedDate}</p>
        <textarea
          name='text'
          className='note-text'
          placeholder='Sukurkite įrašą...'
          onChange={(e) => {
            adjustTextAreaHeight(e);
            setText(e.target.value);
          }}
          value={text}
          style={{ minHeight: '100px' }}
        />
        <button onClick={handleSaveNote} className='button-green'>Išsaugoti</button>
      </div>
    </div>
  );
}

export default AddNote;
