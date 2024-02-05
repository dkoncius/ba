import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaPause } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const AddRecording = ({ setRecordingPage }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // Time in seconds
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [lineHeights, setLineHeights] = useState([]);

  const maxDuration = 10; // 5 minutes in seconds

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => {
          const nextTime = prevTime + 1;
          if (nextTime <= maxDuration) {
            setRecordingProgress((nextTime / maxDuration) * 100);
            return nextTime;
          } else {
            setIsRecording(false);
            clearInterval(interval);
            return prevTime;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    // Assuming each second corresponds to a certain number of vertical lines
    const numberOfLines = Math.floor(recordingProgress * 2); // example: 2 lines per second
    if (lineHeights.length < numberOfLines) {
      setLineHeights((prevHeights) => {
        const newHeights = [...prevHeights];
        for (let i = prevHeights.length; i < numberOfLines; i++) {
          const waveHeight = 50 + Math.sin(i / 10) * 25; // Adjust the wave frequency and amplitude
          newHeights.push(waveHeight);
        }
        return newHeights;
      });
    }
  }, [recordingProgress, lineHeights.length]);

  const renderVerticalLines = () => {
    return lineHeights.slice(0, Math.floor(recordingProgress)).map((height, i) => (
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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="add-recording">
      <button className="close" onClick={() => setRecordingPage(false)}>
        <RxCross1 />
      </button>
      <div className="progress">
        {renderVerticalLines()}
        <div className="red-line" style={{ left: `${recordingProgress}%` }}></div>
      </div>

      <div className="progress-time">{formatTime(elapsedTime)}</div>

      <button className="recording-button" onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? <FaPause /> : <GoDotFill />}
      </button>

      <div className="button-green" onClick={() => setRecordingPage(false)}>Išsaugoti</div>
    </div>
  );
};

export default AddRecording;
