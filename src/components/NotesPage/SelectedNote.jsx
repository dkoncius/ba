import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { db } from '../../firebase/firebase-config';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import UserContext from '../../contexts/UserContext';

const SelectedNote = ({ selectedNote, setSelectedNote, notesData, setNotesData }) => {
  const {user} = useContext(UserContext)
  const [note, setNote] = useState(selectedNote); // Local state to track changes
  const currentIndex = notesData.findIndex(note => note.id === selectedNote.id);

  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    setNote(selectedNote); // Update local state when selectedNote changes
  }, [selectedNote]);

  const navigate = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < notesData.length) {
      const newSelectedNote = notesData[newIndex];
      setNote(newSelectedNote); // Update local state
      setSelectedNote(newSelectedNote); // Update parent state
    }
  };

  const adjustTextAreaHeight = (ref) => {
    if (ref && ref.current) {
      const element = ref.current;
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextAreaHeight(titleRef);
    adjustTextAreaHeight(textRef);
  }, [note]); // Re-adjust when note changes

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleChange = (field) => (e) => {
    const { value } = e.target;
    const updatedNote = { ...note, [field]: value };
    setNote(updatedNote); // Update local state
    adjustTextAreaHeight(field === 'title' ? titleRef : textRef);
  };
  
  const updateNotesData = () => {
    const updatedNotes = notesData.map(n => n.id === note.id ? { ...note } : n);
    setNotesData(updatedNotes); // Update the local state
  
    // Update the note in Firebase
    updateFirebaseNote(note);
  };
  
  const updateFirebaseNote = async (note) => {
    // Assuming `db` is your Firestore instance and `user.uid` is available
    const noteDocRef = doc(db, 'users', user.uid, 'notes', note.id);
  
    try {
      await updateDoc(noteDocRef, note);
      console.log("Note updated in Firebase");
    } catch (error) {
      console.error("Error updating note in Firebase:", error);
    }
  };

  const deleteNote = async () => {
    const confirmation = confirm("Ar tikrai norite ištrinti įrašą?")
    if(!confirmation) return
    // Remove the note from the local state
    const updatedNotes = notesData.filter(n => n.id !== note.id);
    setNotesData(updatedNotes); // Update the local state
  
    // Delete the note from Firebase
    const noteDocRef = doc(db, 'users', user.uid, 'notes', note.id);
    try {
      await deleteDoc(noteDocRef);
      console.log("Note deleted from Firebase");
      setSelectedNote(null); // Optionally reset the selected note to null
    } catch (error) {
      console.error("Error deleting note from Firebase:", error);
    }
  };

  // Convert timestamp to date
  const dateConverter = (seconds) => {
    const date = new Date(seconds * 1000)
    return date.toLocaleDateString("lt")
  }

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
          onChange={handleChange('title')}
          onBlur={() => {setSelectedNote(note); updateNotesData();}} // Update parent and global state when focus leaves the title field
          ref={titleRef}
          value={note.title}
        />
        <p className='note-date'>{dateConverter(selectedNote.createdAt.seconds)}</p>
        <textarea
          name='text'
          className='note-text'
          placeholder='Sukurkite įrašą...'
          onChange={handleChange('text')}
          onBlur={() => {setSelectedNote(note); updateNotesData();}} // Update parent and global state when focus leaves the text field
          ref={textRef}
          value={note.text}
        />

        <nav>
          <button
            onClick={() => navigate(-1)}
            className={currentIndex === 0 ? "nav-btn hidden" : "nav-btn"}
          >
            <MdKeyboardArrowLeft />
          </button>

          <button onClick={deleteNote} className="delete-btn">
            Delete Note
          </button>
          <button
            onClick={() => navigate(1)}
            className={currentIndex === notesData.length - 1 ? "nav-btn hidden" : "nav-btn"}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SelectedNote;
