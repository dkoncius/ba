import { motion  } from "framer-motion"
import React, { useState } from 'react';
import { FaPlay } from "react-icons/fa";

const VideoGallery = ({data}) => {
  // State to track the index of the currently playing video
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);

  const handleClick = (index) => {
    // Update the state to the index of the clicked video
    // If the same video is clicked again, it will remove the overlay
    setPlayingVideoIndex(index === playingVideoIndex ? null : index);
  }

  const animation = { 
    hidden: {opacity: 0, y: 30},
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        staggerChildren: 0.3
      }
      }
  }

  return (
    <motion.div 
    variants={animation} initial="hidden" animate="visible" 
    className="gallery">
      {data && data.map((data, index) => (
        <div className="video-container" onClick={() => handleClick(index)} key={index}>
          <video
            key={data.id}
            src={data.src}
            alt={data.alt}
            controls={playingVideoIndex === index} // Show controls if this video is playing
          />
          {/* Conditionally render the overlay based on playingVideoIndex */}
          {playingVideoIndex !== index && (
            <div className="video-overlay">
              <div className="play-icon">
                <FaPlay/>
              </div>
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}

export default VideoGallery;
