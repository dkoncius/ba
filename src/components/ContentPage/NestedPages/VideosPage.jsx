import {  useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import Filtering from '../Filtering';

const VideosPage = () => {
  const [isFiltering, setIsFiltering] = useState(false)

  return (
    <>
       <div className="content-filter">
        <BiFilterAlt className="filter-icon" onClick={() => setIsFiltering(!isFiltering)} />
        <button className="button-green ">Pridėti video +</button>
       </div>
       {isFiltering ? 
        <Filtering setIsFiltering={setIsFiltering}/> : <h1>Video page</h1>}
    </>
  )
}

export default VideosPage