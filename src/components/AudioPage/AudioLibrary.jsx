import { motion } from "framer-motion";
import React, { useState, useEffect, useRef, useContext } from 'react';
import UserContext from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

// Firebase
import { db, storage } from '../../firebase/firebase-config'; // Ensure you have the correct path
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

const AudioLibrary = ({ recordingsData, setRecordingsData }) => {
  const { user } = useContext(UserContext);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const audioRefs = useRef({});
  const { kidId } = useParams();
  
  const intervalRef = useRef();
  const [progress, setProgress] = useState({});
  const [currentTime, setCurrentTime] = useState({});
  const [duration, setDuration] = useState({});

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '00' : ''}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    recordingsData.forEach(recording => {
      const audio = new Audio(recording.url);
      audio.onloadedmetadata = () => {
        audioRefs.current[recording.id] = audio;
      };
    });
    return () => Object.values(audioRefs.current).forEach(audio => audio && audio.pause());
  }, [recordingsData]);
  
  const onProgressBarClick = (id, e) => {
    const audio = audioRefs.current[id];
    const progressBar = e.currentTarget; // Get the progress bar element
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // X position within the progress bar
    const clickRatio = clickX / progressBar.offsetWidth; // Ratio of click position to total width
    const newTime = clickRatio * audio.duration; // Calculate new currentTime based on click
    audio.currentTime = newTime;
  };

  const togglePlay = (id) => {
    clearInterval(intervalRef.current); // Clear existing interval every time a play/pause action is triggered
  
    const audio = audioRefs.current[id];
  
    if (currentPlaying === id) {
      // Toggle play/pause for the current audio
      if (audio.paused) {
        audio.play();
        startTimer(id);
      } else {
        audio.pause();
        setCurrentPlaying(null);
        // Reset progress and current time immediately when paused
        setProgress(prev => ({ ...prev, [id]: 0 }));
        setCurrentTime(prev => ({ ...prev, [id]: formatTime(0) }));
      }
    } else {
      // Stop currently playing audio (if any) and play the new one
      if (currentPlaying && audioRefs.current[currentPlaying]) {
        audioRefs.current[currentPlaying].pause();
        // Reset progress and current time of the previously playing audio
        setProgress(prev => ({ ...prev, [currentPlaying]: 0 }));
        setCurrentTime(prev => ({ ...prev, [currentPlaying]: formatTime(0) }));
      }
  
      audio.play();
      setCurrentPlaying(id);
      startTimer(id);
    }
  };
  
  const startTimer = (id) => {
    intervalRef.current = setInterval(() => {
      const audio = audioRefs.current[id];
      if (audio.ended) {
        setCurrentPlaying(null);
        // Also reset progress and current time when audio ends
        setProgress(prev => ({ ...prev, [id]: 0 }));
        setCurrentTime(prev => ({ ...prev, [id]: formatTime(0) }));
        clearInterval(intervalRef.current); // Ensure to clear the interval here
      } else {
        setProgress(prev => ({ ...prev, [id]: (audio.currentTime / audio.duration) * 100 }));
        setCurrentTime(prev => ({ ...prev, [id]: formatTime(audio.currentTime) }));
      }
    }, 1000);
  };

  const deleteAudio = async (selectedAudioId, fileName) => {
    const isConfirmed = window.confirm("Ar tikrai norite ištrinti šį įrašą?");
    if (isConfirmed) {
      const audioFileRef = ref(storage, `users/${user.uid}/kids/${kidId}/recordings/${fileName}.mp3`);
      try {
        await deleteObject(audioFileRef);
        console.log("Audio file deleted from storage");

        const audioDocRef = doc(db, `users/${user.uid}/recordings`, selectedAudioId);
        await deleteDoc(audioDocRef);
        console.log("Audio document deleted from Firestore");

        const updatedAudios = recordingsData.filter(audio => audio.id !== selectedAudioId);
        setRecordingsData(updatedAudios);
      } catch (error) {
        console.error("Error deleting audio:", error);
      }
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
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <motion.div variants={animation} initial="hidden" animate="visible" className="recordings">
      {recordingsData.map(({ id, createdAt, fileName }) => (
        <div className="track" key={id}>
          <div className="icon" onClick={() => togglePlay(id)}>
            <img src={currentPlaying === id && !audioRefs.current[id].paused ? "/content/pause.svg" : "/content/play.svg"} alt="Play/Pause" />
          </div>
          <div className="icon deletion-icon" onClick={() => deleteAudio(id, fileName)}>
            <FaTrashAlt />
          </div>
          <div className="track-content">
            <h3 className='track-fileName'>{fileName}</h3>
            <div>
              <div className={currentPlaying === id ? "track-progress-line" : "track-progress-line hidden"} onClick={(e) => onProgressBarClick(id, e)}>
                <div className="track-progress-fill" style={{ width: `${progress[id] || 0}%` }}></div>
                <div className="track-progress-dot" style={{ left: `${progress[id] || 0}%` }}></div>
                <div className="track-progress-time">
                  <div className="track-time">{currentTime[id] || '00:00'}</div>
                </div>
              </div>
            </div>
            <p className={currentPlaying === id ? 'track-date hidden' : 'track-date'}>{new Date(createdAt.seconds * 1000).toLocaleDateString("lt")}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default AudioLibrary;
