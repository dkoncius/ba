import { FaBirthdayCake } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { BsFillPencilFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from "react";
import KidContext from "../../contexts/KidContext";

export const Kid = ({kid, motion, itemAnimation}) => {
  const {selectedKidData, setSelectedKidData} = useContext(KidContext);
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
  navigate('/edit-kid');
  };

  const handleChangeKid = () => {
  navigate('/content/images');
  };


  useEffect(() => {
    setSelectedKidData(kid)
  }, [])

  return (
    <motion.div className='kid' key={selectedKidData.id} role="button" tabIndex={0} onClick={handleChangeKid}  variants={itemAnimation} layout="position">
      <BsFillPencilFill className='edit' aria-hidden="true" onClick={(event) => handleEdit(event)}/>
      <img 
        className='kid-image' 
        src={selectedKidData.image || '/assets/profile-1.jpg'} 
        alt={`profile of ${selectedKidData.name}`} 
      />
      <div className='kid-data'>
        <h2 className='kid-name'>{selectedKidData.name}</h2>
        <p className='kid-birthday'>
          <FaBirthdayCake aria-hidden="true"/> 
          {selectedKidData.birthDate}
        </p>
        <p className='kid-age'>
          <GiSandsOfTime aria-hidden="true"/> 
          {selectedKidData.birthDate}
        </p>
      </div>
    </motion.div>
  );
};
