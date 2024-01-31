import {  useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import Filtering from '../Filtering';

const DocumentsPage = () => {
  const [isFiltering, setIsFiltering] = useState(false)

  return (
    <>
        <div className="content-filter">
        <BiFilterAlt className="filter-icon" onClick={() => setIsFiltering(!isFiltering)} />
        <button className="button-green ">Pridėti teksto įrašą +</button>
        </div>
        {isFiltering ? 
        <Filtering setIsFiltering={setIsFiltering}/> : <h1>Document page</h1>}
    </>
  )
}

export default DocumentsPage