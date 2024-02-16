import { useNavigate } from 'react-router-dom';
import { motion  } from "framer-motion"
import { RxCross1 } from "react-icons/rx";
import { Kid } from '../../components/KidsPage/Kid';
import { signOutUser } from '../../firebase/auth';
import { useContext, useState } from 'react';
import KidsContext from '../../contexts/KidsContext';


const KidsPage = () => {
  const {kidsData} = useContext(KidsContext);

  const navigate = useNavigate()


  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out: ', error);
    } finally {
      navigate('/login');
    }
  };

  const goBackToFeed = () => {
    if(!kidsData.length) return 
    navigate(`/${kidsData[0].id}/content/images`);
  }

  const handleAddKid = () => {
    navigate('/new-kid');
  };
  
    const listAnimation = { 
      hidden: {opacity: 0},
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3
        }
      }
    }
  
  const itemAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5
      }
    }
  };

    // Button Animation with delay
    const buttonAnimation = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delay: kidsData.length * 0.3, // Assumes each child will start after 0.3s of the previous one
          duration: 0.5
        }
      }
    };

  return (
    <div className="container">

     <nav className='kids-nav'>
      <p className='logout' onClick={handleSignOut}>
        Log Out
      </p>
      <div className="icon" onClick={goBackToFeed}>
        <RxCross1/>
      </div>
    </nav>

    <h1>Pasirink savo vaikutį</h1>

    <motion.section 
    variants={listAnimation} initial="hidden" animate="visible" 
    className='kids-container'>
      {kidsData && kidsData.map((kid) => (
        <Kid
         key={kid.id}
         kid={kid} 
         itemAnimation={itemAnimation}
         motion={motion} />
        ))}
      <motion.button 
        variants={buttonAnimation}
        initial="hidden"
        animate="visible"
        className='button-green'
        onClick={handleAddKid}>
          Pridėti vaiką +
      </motion.button>
    </motion.section>
    </div>
  )
}

export default KidsPage