import {  useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import Filtering from '../Filtering';

const AudioPage = () => {
  const [isFiltering, setIsFiltering] = useState(false)

  return (
    <>
        <div className="content-filter">
        <BiFilterAlt className="filter-icon" onClick={() => setIsFiltering(!isFiltering)} />
        <button className="button-green ">Pridėti garso įrašą +</button>
        </div>
        {isFiltering ? 
        <Filtering setIsFiltering={setIsFiltering}/> : <h1>Audio page</h1>}
    </>
  )
}

export default AudioPage