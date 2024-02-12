import {  useEffect, useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import ContentFiltering from '../../components/ContentPage/ContentFiltering';
import VideoGallery from '../../components/VideoPage/VideoGallery';
import AddVideo from '../../components/VideoPage/AddVideo';

const videosData = [
  {id: 0, src: '/kids-videos/video-1.mp4', alt: 'video-1', height: 51, mood: "angry", weight: 5.1},
  {id: 1, src: '/kids-videos/video-2.mp4', alt: 'video-2', height: 46, mood: "laugh", weight: 4.6},
  {id: 2, src: '/kids-videos/video-3.mp4', alt: 'video-3', height: 33, mood: "love", weight: 3.3},
  {id: 3, src: '/kids-videos/video-4.mp4', alt: 'video-4', height: 48, mood: "peace", weight: 4.8},
  {id: 3, src: '/kids-videos/video-5.mp4', alt: 'video-5', height: 44, mood: "cry", weight: 4.4}
];

const VideoPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [data, setData] = useState([])
  const [isFiltering, setIsFiltering] = useState(false)
  const [videoPage, setVideoPage] = useState(false);

  useEffect(() => {
    setData(videosData)
  }, [])


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
      <VideoGallery data={data} videosData={videosData} selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo}/>}
  
      {videoPage && <AddVideo setVideoPage={setVideoPage}/>}
    </div>
  )
}

export default VideoPage