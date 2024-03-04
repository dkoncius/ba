import {  useContext, useEffect, useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import ContentFiltering from '../../components/ContentPage/ContentFiltering';
import VideoGallery from '../../components/VideosPage/VideoGallery';
import AddVideo from '../../components/VideosPage/AddVideo';

// Firestore
import { db } from '../../firebase/firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import UserContext from '../../contexts/UserContext';
import { useParams } from 'react-router-dom';

const videosData = [
  {id: 0, src: '/kids-videos/video-1.mp4', alt: 'video-1', height: 51, mood: "angry", weight: 5.1},
  {id: 1, src: '/kids-videos/video-2.mp4', alt: 'video-2', height: 46, mood: "laugh", weight: 4.6},
  {id: 2, src: '/kids-videos/video-3.mp4', alt: 'video-3', height: 33, mood: "love", weight: 3.3},
  {id: 3, src: '/kids-videos/video-4.mp4', alt: 'video-4', height: 48, mood: "peace", weight: 4.8},
  {id: 3, src: '/kids-videos/video-5.mp4', alt: 'video-5', height: 44, mood: "cry", weight: 4.4}
];

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
        const videosQuery = query(videosRef, where("kidId", "==", kidId));
        const videosSnapshot = await getDocs(videosQuery);
        const videosList = videosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(videosList)
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
          <BiFilterAlt className="filter-icon" onClick={() => setIsFiltering(!isFiltering)} />
          <button 
          className="button-green"
          onClick={() => setVideoPage(true)}
          >Pridėti video +</button>
      </div>
  
      {isFiltering ? 
      <ContentFiltering setIsFiltering={setIsFiltering}/> : 
      <VideoGallery videosData={videosData}/>}
  
      {videoPage && <AddVideo setVideoPage={setVideoPage}/>}
    </div>
  )
}

export default VideosPage