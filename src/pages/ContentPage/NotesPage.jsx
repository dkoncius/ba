import {  useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import ContentFiltering from '../../components/ContentPage/ContentFiltering';
import Notes from '../../components/NotesPage/Notes';

const NotesPage = () => {
  const [isFiltering, setIsFiltering] = useState(false)

  return (
    <>
        <div className="content-filter">
          <BiFilterAlt className="filter-icon" onClick={() => setIsFiltering(!isFiltering)} />
          <button className="button-green ">Pridėti teksto įrašą +</button>
        </div>

        {isFiltering ? 
        <ContentFiltering setIsFiltering={setIsFiltering}/> : <Notes/>
        }
    </>
  )
}

export default NotesPage