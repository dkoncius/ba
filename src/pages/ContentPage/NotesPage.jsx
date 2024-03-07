import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiFilterAlt } from "react-icons/bi";
import ContentFiltering from '../../components/ContentPage/ContentFiltering';
import Notes from '../../components/NotesPage/Notes'; // Assuming this component is used to display notes
import AddNote from '../../components/NotesPage/AddNote';
import { db } from '../../firebase/firebase-config';
import { collection, doc, query, getDocs, where, orderBy  } from 'firebase/firestore';
import UserContext from '../../contexts/UserContext';

const NotesPage = () => {
  const { user } = useContext(UserContext);
  const { kidId } = useParams();
  const [notePage, setNotePage] = useState(false);
  const [notesData, setNotesData] = useState([]);

  let notesRef

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user || !kidId) return;
  
      try {
        const notesRef = collection(db, `users/${user.uid}/notes`);
        // Order the results by the 'createdAt' field in descending order to get newest notes first
        const notesQuery = query(notesRef, where("kidId", "==", kidId), orderBy("createdAt", "desc"));
        const notesSnapshot = await getDocs(notesQuery);
        const notesList = notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
        setNotesData(notesList);
      } catch (error) {
        console.error("Error fetching notes: ", error);
      }
    };
  
    fetchNotes();
  }, [user, kidId, notePage]); 

  const handleAddNewNote = (newNote) => {
    setNotesData(prevNotes => [...prevNotes, newNote]);
  };

  return (
    <>
      <div className="container">
        <div className="content-filter">
          <button 
            className="button-green"
            onClick={() => setNotePage(true)}
          >Pridėti teksto įrašą +</button>
        </div>
      </div>
      <Notes notesData={notesData} setNotesData={setNotesData}/>
      {notePage && <AddNote setNotePage={setNotePage} onAddNewNote={handleAddNewNote}/>}
    </>
  );
};

export default NotesPage;
