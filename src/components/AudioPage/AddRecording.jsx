import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaPause } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const AddRecording = ({ setRecordingPage }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [lineHeights, setLineHeights] = useState([]);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 0.3; // Increment progress
          } else {
            clearInterval(interval);
            return prevProgress;
          }
        });
      }, 300); // Update progress every second
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    const numberOfLines = recordingProgress * 2; // example: 2 lines per second
    if (lineHeights.length < numberOfLines) {
      setLineHeights((prevHeights) => {
        const newHeights = [...prevHeights];
        for (let i = prevHeights.length; i < numberOfLines; i++) {
          // Use sine function to create wave effect
          const waveHeight = 50 + Math.sin(i / 10) * 25; // Adjust the wave frequency and amplitude
          newHeights.push(waveHeight);
        }
        return newHeights;
      });
    }
  }, [recordingProgress, lineHeights.length]);

  const renderVerticalLines = () => {
    return lineHeights.map((height, i) => (
      <div
        key={i}
        className="vertical-line"
        style={{
          left: `${i}%`,
          height: `${height}%`
        }}
      ></div>
    ));
  };

  return (
    <div className="add-recording">
      <button className="close" onClick={() => setRecordingPage(false)}>
        <RxCross1 />
      </button>
      <div className="progress">
        {renderVerticalLines()}
        {/* Render red line after vertical lines so it naturally appears on top */}
        <div className="red-line" style={{ left: `${recordingProgress * 2}%` }}></div>
      </div>

      <div className="progress-time">00:00:24</div>

      <button className="recording-button" onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? <FaPause /> : <GoDotFill />}
      </button>

      <div className="button-green" onClick={() => setRecordingPage(false)}>Išsaugoti</div>
    </div>
  );
};

export default AddRecording;
