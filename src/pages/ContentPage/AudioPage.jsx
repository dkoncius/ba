import {  useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import ContentFiltering from '../../components/ContentPage/ContentFiltering';
import AddAudio from '../../components/AudioPage/AddAudio';
import AudioLibrary from '../../components/AudioPage/AudioLibrary';

const AudioPage = () => {
  const [isFiltering, setIsFiltering] = useState(false)
  const [audioPage, setAudioPage] = useState(false);

  return (
    <>
        <div className="content-filter">
        <BiFilterAlt className="filter-icon" onClick={() => setIsFiltering(!isFiltering)} />
        <button className="button-green" onClick={() => setAudioPage(true)}>Pridėti garso įrašą +</button>
        </div>
        {isFiltering ? 
        <ContentFiltering setIsFiltering={setIsFiltering}/> : 
          <AudioLibrary/>
        }

        {audioPage && <AddAudio setAudioPage={setAudioPage}/>}
    </>
  )
}

export default AudioPage