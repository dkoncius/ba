import {  useContext, useEffect, useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import ContentFiltering from '../../components/ContentPage/ContentFiltering';
import AddAudio from '../../components/AudioPage/AddAudio';
import AudioLibrary from '../../components/AudioPage/AudioLibrary';
import UserContext from '../../contexts/UserContext';
import { useParams } from 'react-router-dom';

// Firebase
import { db } from '../../firebase/firebase-config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const AudioPage = () => {
  const { user } = useContext(UserContext);
  const { kidId } = useParams();
  const [audioPage, setAudioPage] = useState(false);
  const [recordingsData, setRecordingsData] = useState([])

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!user || !kidId) return;
  
      try {
        const recordingsRef = collection(db, `users/${user.uid}/recordings`);
        // Order the results by the 'createdAt' field in descending order to get newest images first
        const recordingsQuery = query(recordingsRef, where("kidId", "==", kidId), orderBy("createdAt", "desc"));
        const recordingsSnapshot = await getDocs(recordingsQuery);
        const recordingsList = recordingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setRecordingsData(recordingsList);
      } catch (error) {
        console.error("Error fetching recordings: ", error);
      }
    };
  
    fetchRecordings();
  }, [user, kidId, audioPage]);

  return (
    <div className="container">
      <div className="content-filter">
      <button className="button-green" onClick={() => setAudioPage(true)}>Pridėti garso įrašą +</button>
      </div>
      <AudioLibrary recordingsData={recordingsData} setRecordingsData={setRecordingsData}/>

      {audioPage && <AddAudio setAudioPage={setAudioPage}/>}
  </div>
  )
}

export default AudioPage