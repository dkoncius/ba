import { useLocation } from "react-router-dom";
import ContentHeader from "../../components/ContentPage/ContentHeader";
import ContentOptions from "../../components/ContentPage/ContentOptions";

import { getFirestore, doc, collection, query, getDocs, limit } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";

const ContentPage = () => {
  const {user} = useContext(UserContext);
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kidData, setKidData] = useState(null);
  const location = useLocation();

  // const fetchMemories = async (kidId) => {
  //   const db = getFirestore();
  //   const currentUser = getAuth().currentUser;

  //   const userRef = doc(db, 'users', currentUser.uid);
  //   const kidRef = doc(userRef, 'kids', kidId);
  //   const memoryRef = collection(kidRef, 'memories');

  //   const memoryDocs = await getDocs(memoryRef);

  //   if (!memoryDocs.empty) {
  //     const memoriesData = memoryDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //     setMemories(memoriesData);
  //   } else {
  //     console.log('No memories found for the kid');
  //   }
  // };

  // const fetchFirstKid = async () => {
  //   try {
  //     if (!user) return;
  //     const db = getFirestore();
  //     const currentUser = getAuth().currentUser;
  //     const userRef = doc(db, 'users', currentUser.uid);
  //     const kidsRef = collection(userRef, 'kids');
  //     const kidsQuery = query(kidsRef, limit(1));
  //     const kidDocs = await getDocs(kidsQuery);

  //     if (!kidDocs.empty) {
  //       const firstKidData = { id: kidDocs.docs[0].id, ...kidDocs.docs[0].data() };
  //       setKidData(firstKidData);
  //       // fetchMemories(firstKidData.id);
  //     } else {
  //       console.log('No kids data found');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching first kid: ', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // Attempt to load kidData from location.state or localStorage
    const storedKidData = localStorage.getItem('kidData');
    if (location.state && location.state.kidToFeed) {
      setKidData(location.state.kidToFeed);
      // fetchMemories(location.state.kidToFeed.id);
      localStorage.setItem('kidData', JSON.stringify(location.state.kidToFeed)); // Persist to localStorage
      setLoading(false);
    } else if (storedKidData) {
      const parsedKidData = JSON.parse(storedKidData);
      setKidData(parsedKidData);
      // fetchMemories(parsedKidData.id);
      setLoading(false);
    } else {
      fetchFirstKid();
    }
  }, [user, location.state]);

  const hasMemories = memories && memories.length > 0;


  return (
    <>
     {!loading && <ContentHeader kidData={kidData} />}
    
    <ContentOptions/>
    </>
  )
}

export default ContentPage