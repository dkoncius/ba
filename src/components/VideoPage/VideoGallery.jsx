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

  return (
    <div className="gallery">
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
    </div>
  );
}

export default VideoGallery;
