import {  useContext, useEffect, useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import { useParams } from 'react-router-dom';
import ContentFiltering from '../../components/ContentPage/ContentFiltering';
import VideoGallery from '../../components/VideosPage/VideoGallery';
import AddVideo from '../../components/VideosPage/AddVideo';
import UserContext from '../../contexts/UserContext';

// Firestore
import { db } from '../../firebase/firebase-config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';


const VideosPage = () => {
  const { user } = useContext(UserContext);
  const { kidId } = useParams();
  const [videosData, setVideosData] = useState([]);
  const [videoPage, setVideoPage] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);


  useEffect(() => {
    const fetchVideos = async () => {
      if (!user || !kidId) return;

      try {
        const videosRef = collection(db, `users/${user.uid}/videos`);
        const videosQuery = query(videosRef, where("kidId", "==", kidId), orderBy("createdAt", "desc"));
        const videosSnapshot = await getDocs(videosQuery);
        const videosList = videosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVideosData(videosList);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchVideos();
  }, [user, kidId, videoPage]);


  return (
    <div className="container">
      <div className="content-filter">
          <button 
          className="button-green"
          onClick={() => setVideoPage(true)}
          >Pridėti video +</button>
      </div>
    
      {!videoPage && <VideoGallery videosData={videosData} setVideosData={setVideosData}/>}
     
  
      {videoPage && <AddVideo setVideoPage={setVideoPage}/>}
    </div>
  )
}

export default VideosPage