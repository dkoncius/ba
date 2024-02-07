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

  const adjustTextAreaHeight = (e) => {
    // Temporarily shrink the textarea to 'auto' to let it adjust based on content
    e.target.style.height = 'auto';
    // Then set the height to the scrollHeight plus a little extra space to avoid scroll bar appearance
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents adding a new line
    }
  };

  return (
    <div className="selected-note">
      <div className="header">
        <button onClick={() => setSelectedNote(null)}>
          <AiOutlineArrowLeft />
        </button>
      </div>

      <textarea
        name='title'
        className='note-title'
        placeholder='Pavadinimas'
        onKeyDown={handleTitleKeyDown}
        onChange={adjustTextAreaHeight} // Optional: If you want the title to expand vertically as well
        value={selectedNote.noteTitle}
      />
      <p className='note-date'>{selectedNote.noteDate}</p>
      <textarea
        name='text'
        className='note-text'
        placeholder='Sukurkite įrašą...'
        onChange={adjustTextAreaHeight}
        value={selectedNote.noteText}
      />

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
