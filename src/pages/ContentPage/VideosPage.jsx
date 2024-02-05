import {  useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import ContentFiltering from '../../components/ContentPage/ContentFiltering';

const VideosPage = () => {
  const [isFiltering, setIsFiltering] = useState(false)

  return (
    <>
       <div className="content-filter">
        <BiFilterAlt className="filter-icon" onClick={() => setIsFiltering(!isFiltering)} />
        <button className="button-green ">Pridėti video +</button>
       </div>
       {isFiltering ? 
        <ContentFiltering setIsFiltering={setIsFiltering}/> : <h1>Video page</h1>}
    </>
  )
}

export default VideosPage