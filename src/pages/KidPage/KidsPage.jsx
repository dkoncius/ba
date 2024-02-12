import { motion  } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import { Kid } from '../../components/KidsPage/Kid';

const kidsData = [
    {id: 1, name: "Tomas", birthDate: "2022-01-26", image: "/kids/kid-1.jpg"},
    {id: 2, name: "Deividas", birthDate: "2022-01-26", image: "/kids/kid-2.jpg"},
    {id: 3, name: "Dominykas", birthDate: "2022-01-26", image: "/kids/kid-3.jpg"},
]

const KidsPage = () => {
    const navigate = useNavigate()

const handleSignOut = async () => {
    navigate('/login');
    };

const goBackToFeed = () => {
    return navigate('/content/gallery');
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
      {kidsData.map((kid) => (
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