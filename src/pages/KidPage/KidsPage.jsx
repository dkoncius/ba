import { useNavigate, useLocation } from 'react-router-dom';
import { motion  } from "framer-motion"
import { RxCross1 } from "react-icons/rx";
import { Kid } from '../../components/KidsPage/Kid';
import { collection, getDocs, doc, getFirestore, query } from 'firebase/firestore';
import { signOutUser } from '../../firebase/auth';
import { useEffect, useState } from 'react';


const KidsPage = ({user}) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [kids, setKids] = useState([]);
  const [kidData, setKidData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchKids = async () => {
      try {
        if (!user) {
          return;
        }

        const db = getFirestore();
        const kidsRef = collection(doc(db, 'users', user.uid), 'kids'); // We'll use the provided 'user' prop directly here.
        const kidsQuery = query(kidsRef);
        const kidDocs = await getDocs(kidsQuery);

        const kidsData = kidDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setKids(kidsData);
      } catch (error) {
        console.error('Error fetching kids:', error);
        setError('Failed to fetch kids data, please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchKids();
  }, [user]);

  useEffect(() => {
    if (location.state) {
      setKidData(location.state.selectedKid);
    } else {
      console.log("Kids component");
    }
  }, [location.state]);

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
    return navigate('/content/gallery', { state: { kidToFeed: kidData} });
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
          delay: kids.length * 0.3, // Assumes each child will start after 0.3s of the previous one
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
      {kids.map((kid) => (
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