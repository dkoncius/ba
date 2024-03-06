import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from 'react';

const AudioLibrary = ({ recordingsData }) => {
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const audioRefs = useRef({});
  
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
    // Initialize audio elements and set up metadata loading
    recordingsData.forEach(recording => {
      const audio = new Audio(recording.url);
      audio.preload = "metadata"; // Suggest loading metadata
      audioRefs.current[recording.id] = audio;
  
      audio.onloadedmetadata = () => {
        // Now correctly using audio.duration
        setDuration(prev => ({
          ...prev,
          [recording.id]: formatTime(audio.duration),
        }));
        console.log(`${recording.id} duration:`, audio.duration);
      };
    });
  
    return () => {
      // Cleanup: pause all audio elements
      Object.values(audioRefs.current).forEach(audio => audio.pause());
    };
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
    // Always clear any existing interval when attempting to play or pause
    clearInterval(intervalRef.current);
  
    const audio = audioRefs.current[id];
    
    if (currentPlaying === id) {
      // If the clicked audio is already the current playing one, toggle its state
      if (audio.paused) {
        audio.play();
        startTimer(id); // Start or resume the timer for the current audio
      } else {
        audio.pause();
        setCurrentPlaying(null); // Reset the currentPlaying state if paused
      }
    } else {
      // If a different audio is clicked, pause the currently playing (if any) and play the new one
      if (currentPlaying && audioRefs.current[currentPlaying]) {
        audioRefs.current[currentPlaying].pause(); // Pause the currently playing audio
      }
      
      audio.play();
      setCurrentPlaying(id); // Update the currentPlaying state to the new audio
      startTimer(id); // Start the timer for the new audio
    }
  };
  
const startTimer = (id) => {
  intervalRef.current = setInterval(() => {
    const audio = audioRefs.current[id];
    if (audio.ended) {
      setCurrentPlaying(null);
      clearInterval(intervalRef.current);
    } else {
      if (isFinite(audio.duration) && (!duration[id] || duration[id] === 'Loading...')) {
        setDuration(prev => ({
          ...prev,
          [id]: formatTime(audio.duration),
        }));
      }
      setProgress(prev => ({
        ...prev,
        [id]: (audio.currentTime / audio.duration) * 100,
      }));
      setCurrentTime(prev => ({
        ...prev,
        [id]: formatTime(audio.currentTime),
      }));
    }
  }, 1000);
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
      {recordingsData.map(({ id, createdAt, title }) => (
        <div className="track" key={id}>
          <div className="icon" onClick={() => togglePlay(id)}>
            <img src={currentPlaying === id && !audioRefs.current[id].paused ? "/content/pause.svg" : "/content/play.svg"} alt="Play/Pause" />
          </div>
          <div className="track-content">
            <h3 className='track-title'>{title}</h3>
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
