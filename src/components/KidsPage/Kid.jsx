import { FaBirthdayCake } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { BsFillPencilFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from "react";

export const Kid = ({kid, motion, itemAnimation}) => {
  const navigate = useNavigate();

  const calculateAge = useCallback((birthDate) => {
    const birthdate = parseISO(birthDate);
    const years = differenceInYears(new Date(), birthdate);
    const months = differenceInMonths(new Date(), birthdate) % 12;
    const days = differenceInDays(new Date(), birthdate) % 30; // Approximation
    return `${years} years, ${months} months, ${days} days`;
  }, []);

  const handleEdit = (event) => {
  event.stopPropagation();
  navigate('/edit-kid', { state: { kidToEdit: kid } });
  };

  const handleChangeKid = () => {
  navigate('/content/gallery', { state: { kidToFeed: kid } });
  };

  return (
    <motion.div className='kid' key={kid.id} role="button" tabIndex={0} onClick={handleChangeKid}  variants={itemAnimation} layout="position">
      <BsFillPencilFill className='edit' aria-hidden="true" onClick={(event) => handleEdit(event)}/>
      <img 
        className='kid-image' 
        src={kid.image || '/assets/profile-1.jpg'} 
        alt={`profile of ${kid.name}`} 
      />
      <div className='kid-data'>
        <h2 className='kid-name'>{kid.name}</h2>
        <p className='kid-birthday'>
          <FaBirthdayCake aria-hidden="true"/> 
          {kid.birthDate}
        </p>
        <p className='kid-age'>
          <GiSandsOfTime aria-hidden="true"/> 
          {kid.birthDate}
        </p>
      </div>
    </motion.div>
  );
};
