import {  useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import ContentFiltering from '../../components/ContentPage/ContentFiltering';
import Notes from '../../components/NotesPage/Notes';
import AddNote from '../../components/NotesPage/AddNote';

const NotesPage = () => {
  const [isFiltering, setIsFiltering] = useState(false)
  const [notePage, setNotePage] = useState(false);


  return (
    <>
    <div className="container">
      <div className="content-filter">
        <BiFilterAlt className="filter-icon" onClick={() => setIsFiltering(!isFiltering)} />
        <button 
        className="button-green "
        onClick={() => setNotePage(true)}
        >Pridėti teksto įrašą +</button>
      </div>
      </div>
      {isFiltering ? 
      <ContentFiltering setIsFiltering={setIsFiltering}/> : <Notes/>
      }



      {notePage && <AddNote setNotePage={setNotePage}/>}
    </>
  )
}

export default NotesPage