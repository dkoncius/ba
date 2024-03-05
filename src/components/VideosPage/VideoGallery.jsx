import { motion } from "framer-motion";
import React, { useContext, useState } from 'react';
import UserContext from "../../contexts/UserContext";
import { FaPlay, FaTrashAlt } from "react-icons/fa";

// Firebase
import { db, storage } from '../../firebase/firebase-config'; // Ensure you have the correct path
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage'; // Import deleteObject method

const VideoGallery = ({ videosData, setVideosData }) => {
  const { user } = useContext(UserContext);
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);

  const handleClick = (index) => {
    setPlayingVideoIndex(index === playingVideoIndex ? null : index);
  };


  const deleteVideo = async (selectedVideoId, fileName) => {
    console.log(selectedVideoId, fileName)
    const isConfirmed = window.confirm("Ar tikrai norite ištrinti šį vaizdo įrašą su duomenimis?");
    
    if (isConfirmed) {
      // Correctly use the `storage` instance here
      const videoFileRef = ref(storage, `users/${user.uid}/videos/${fileName}`);
    
      try {
        await deleteObject(videoFileRef);
        console.log("Video file deleted from storage");
    
        const videoDocRef = doc(db, 'users', user.uid, 'videos', selectedVideoId);
        await deleteDoc(videoDocRef);
        console.log("Video document deleted from Firestore");
    
        const updatedVideos = videosData.filter(video => video.id !== selectedVideoId);
        setVideosData(updatedVideos); // Corrected to use setVideosData
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    } else {
      console.log("Video deletion canceled");
    }
  };
  

  const animation = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        staggerChildren: 0.3
      }
    }
  };

  return (
    <motion.div variants={animation} initial="hidden" animate="visible" className="gallery">
      {videosData && videosData.map((video, index) => (
      <div className="video-container" key={video.id}>
        <video src={video.url} alt={`Video ${index}`} controlslist="nofullscreen" controls={playingVideoIndex === index} />
        {playingVideoIndex !== index && (
          <div className="video-overlay" onClick={() => handleClick(index)}>
            <div className="play-icon">
              <FaPlay />
            </div>
          </div>
        )}
        <button className="delete-icon" onClick={() => deleteVideo(video.id, video.fileName)}>
          <FaTrashAlt/>
        </button>
      </div>
    ))}
    </motion.div>
  );
};

export default VideoGallery;
