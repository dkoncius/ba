import {  useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import ContentFiltering from '../../components/ContentPage/ContentFiltering';
import Recordings from '../../components/AudioPage/Recordings';
import AddRecording from '../../components/AudioPage/AddRecording';

const AudioPage = () => {
  const [isFiltering, setIsFiltering] = useState(false)
  const [recordingPage, setRecordingPage] = useState(false);

  return (
    <>
        <div className="content-filter">
        <BiFilterAlt className="filter-icon" onClick={() => setIsFiltering(!isFiltering)} />
        <button className="button-green" onClick={() => setRecordingPage(true)}>Pridėti garso įrašą +</button>
        </div>
        {isFiltering ? 
        <ContentFiltering setIsFiltering={setIsFiltering}/> : 
          <Recordings/>
        }

        {recordingPage && <AddRecording setRecordingPage={setRecordingPage}/>}
    </>
  )
}

export default AudioPage