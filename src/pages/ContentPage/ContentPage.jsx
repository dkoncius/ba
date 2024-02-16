import { useParams } from "react-router-dom";
import ContentHeader from "../../components/ContentPage/ContentHeader";
import ContentOptions from "../../components/ContentPage/ContentOptions";

import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";

const ContentPage = () => {
  const {user} = useContext(UserContext);
  const [selectedKidData, setSelectedKidData] = useState(null);
  
  const {kidId} = useParams();

  useEffect(() => {
    const fetchKidData = async () => {
      if (!user) return;
      const db = getFirestore();
      const kidRef = doc(db, 'users', user.uid, 'kids', kidId);
      const docSnap = await getDoc(kidRef);
  
      if (docSnap.exists()) {
        setSelectedKidData({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    };
  
    fetchKidData();
  }, [user, kidId])


  return (
    <>
     {selectedKidData && <ContentHeader selectedKidData={selectedKidData}/>}
    
    <ContentOptions/>
    </>
  )
}

export default ContentPage