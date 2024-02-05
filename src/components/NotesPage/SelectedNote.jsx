import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const SelectedNote = ({ selectedNote, setSelectedNote, notesData }) => {
  const currentIndex = notesData.findIndex(note => note.id === selectedNote.id);

  const navigate = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < notesData.length) {
      setSelectedNote(notesData[newIndex]);
    }
  };

  return (
    <div className="selected-note">
      <div className="header">
        <button onClick={() => setSelectedNote(null)}>
          <AiOutlineArrowLeft />
        </button>
      </div>

      <h2>{selectedNote.noteTitle}</h2>
      <p className='selected-note-date'>{selectedNote.noteDate}</p>
      <p className='selected-note-text'>{selectedNote.noteText}</p>

      <nav>
        <button
          onClick={() => navigate(-1)}
          className={currentIndex === 0 ? "hidden" : ""}
        >
          <MdKeyboardArrowLeft />
        </button>

        <button
          onClick={() => navigate(1)}
          className={currentIndex === notesData.length - 1 ? "hidden" : ""}
        >
          <MdOutlineKeyboardArrowRight />
        </button>
      </nav>
    </div>
  )
}

export default SelectedNote;
