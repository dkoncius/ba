import React, { useState, useRef, useEffect } from 'react'

const recordingsData = [
    { id: 1, timeStamp: "1673781532", title: "Juokas", src: '/sounds/sound-1.mp3' },
    { id: 2, timeStamp: "1705317532", title: "Verksmas", src: '/sounds/sound-2.mp3' },
    { id: 3, timeStamp: "1707131932", title: "Pirmieji žodžiai", src: '/sounds/sound-3.mp3' },
]

const AudioLibrary = () => {
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const audioRefs = useRef(recordingsData.reduce((acc, value) => {
    acc[value.id] = new Audio(value.src);
    return acc;
  }, {}));
  const intervalRef = useRef();

  const [progress, setProgress] = useState({});
  const [currentTime, setCurrentTime] = useState({});
  const [duration, setDuration] = useState({});

  const formatTime = (time) => {
    const rounded = Math.floor(time);
    const minutes = Math.floor(rounded / 60);
    const seconds = rounded - minutes * 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const startTimer = (id) => {
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      const audio = audioRefs.current[id];
      if (audio.ended) {
        setCurrentPlaying(null);
      } else {
        setProgress(prev => ({ ...prev, [id]: (audio.currentTime / audio.duration) * 100 }));
        setCurrentTime(prev => ({ ...prev, [id]: formatTime(audio.currentTime) }));
      }
    }, 1000);
  };

  const onProgressBarClick = (id, e) => {
    const progressBar = e.target;
    const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
    const newTime = audioRefs.current[id].duration * clickPosition;
    audioRefs.current[id].currentTime = newTime;
    setProgress(prev => ({ ...prev, [id]: clickPosition * 100 }));
  };

  const togglePlay = (id) => {
    const wasPlaying = id === currentPlaying;
    if (currentPlaying != null) {
      const currentAudio = audioRefs.current[currentPlaying];
      currentAudio.pause();
      clearInterval(intervalRef.current);
    }

    const newAudio = audioRefs.current[id];
    if (!wasPlaying) {
      setCurrentPlaying(id);
      newAudio.play();
      startTimer(id);
    } else {
      setCurrentPlaying(null);
    }
  };

  useEffect(() => {
    recordingsData.forEach(recording => {
      const audio = audioRefs.current[recording.id];
      audio.onloadedmetadata = () => {
        setDuration(prev => ({ ...prev, [recording.id]: formatTime(audio.duration) }));
      };
    });
    return () => {
      recordingsData.forEach(recording => {
        audioRefs.current[recording.id].pause();
      });
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="recordings">
      {recordingsData.map(({ id, timeStamp, title }) => (
        <div className="track" key={id}>
          <div className="icon" onClick={() => togglePlay(id)}>
            <img src={currentPlaying === id ? "/content/pause.svg" : "/content/play.svg"} alt="" />
          </div>
          <div className="track-content">
            <h3 className='track-title'>{title}</h3>
            <div>
              <div className={currentPlaying === id ? "track-progress-line" : "track-progress-line hidden"} onClick={(e) => onProgressBarClick(id, e)}>
                <div className="track-progress-fill" style={{ width: `${progress[id] || 0}%` }}></div>
                <div className="track-progress-dot" style={{ left: `${progress[id] || 0}%` }}></div>
                <div className="track-progress-time">
                  <div className="track-time">{currentTime[id] || '00:00'}</div>
                  <div className="track-duration">{duration[id] || '00:00'}</div>
                </div>
              </div>
            </div>
            <p className={currentPlaying === id ? 'track-date hidden' : 'track-date'}>{new Date(parseInt(timeStamp) * 1000).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AudioLibrary
