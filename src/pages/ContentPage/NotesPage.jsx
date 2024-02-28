import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiFilterAlt } from "react-icons/bi";
import ContentFiltering from '../../components/ContentPage/ContentFiltering';
import Notes from '../../components/NotesPage/Notes'; // Assuming this component is used to display notes
import AddNote from '../../components/NotesPage/AddNote';
import { db } from '../../firebase/firebase-config';
import { collection, doc, query, getDocs, where } from 'firebase/firestore';
import UserContext from '../../contexts/UserContext';

const NotesPage = () => {
  const { user } = useContext(UserContext);
  const { kidId } = useParams();
  const [isFiltering, setIsFiltering] = useState(false);
  const [notePage, setNotePage] = useState(false);
  const [notesData, setNotesData] = useState([]);

  useEffect(() => {
    const fetchNotesData = async () => {
      if (!user) {
        return;
      }

      try {
        const notesRef = collection(doc(db, 'users', user.uid), 'notes');
        const notesQuery = query(notesRef, where("kidId", "==", kidId));
        const notesDoc = await getDocs(notesQuery);
        const notesData = notesDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setNotesData(notesData);
      } catch (error) {
        console.error("Error fetching notes: ", error);
      }
    };

    fetchNotesData();
  }, [user, kidId, notesData]);

  return (
    <>
      <div className="container">
        <div className="content-filter">
          <BiFilterAlt className="filter-icon" onClick={() => setIsFiltering(!isFiltering)} />
          <button 
            className="button-green"
            onClick={() => setNotePage(true)}
          >Pridėti teksto įrašą +</button>
        </div>
      </div>
      {isFiltering ? 
        <ContentFiltering setIsFiltering={setIsFiltering}/> : <Notes notesData={notesData}/>
      }
      {notePage && <AddNote setNotePage={setNotePage}/>}
    </>
  );
};

export default NotesPage;
