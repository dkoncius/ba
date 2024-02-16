import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Footer from "../../components/General/Footer";
import ImageUploader from "../../components/LandingPage/ImageUploader";

import { getStorage, ref, deleteObject, listAll } from "firebase/storage";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

import UserContext from "../../contexts/UserContext";
import KidsContext from "../../contexts/KidsContext";

const EditKidPage = () => {
  const {user} = useContext(UserContext)
  const {kidsData, setKidsData} = useContext(KidsContext)
  const [kidData, setKidData] = useState()
  const navigate = useNavigate()
  const location = useLocation()

  const { kidId } = useParams(); // Assuming kidId is in the URL

  useEffect(() => {
    const fetchKidData = async () => {
      if (!user) return;
      const db = getFirestore();
      const kidRef = doc(db, 'users', user.uid, 'kids', kidId);
      const docSnap = await getDoc(kidRef);
  
      if (docSnap.exists()) {
        setKidData({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    };
  
    fetchKidData();
  }, [user, kidId]);

  // Update inputs
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setKidData(prevData => ({
          ...prevData,
          [name]: value,
      }));
  };

    const handleImageChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile instanceof Blob && selectedFile.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
              const dataUrl = event.target.result;
              setKidData(prevData => ({
                  ...prevData,
                  image: dataUrl,  // Updating image data in kidData
              }));
          };
          reader.readAsDataURL(selectedFile);
      } else {
          console.error('The selected file is not a valid image or no file was selected.');
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid, 'kids', kidData.id);
        await setDoc(userRef, kidData, { merge: true });
        console.log('Kid data updated successfully');

        // Correctly update kidsData in context
        setKidsData(kidsData.map(kid => kid.id === kidData.id ? kidData : kid));

        navigate('/kids');
    } catch (error) {
        console.error('Error updating kid data:', error);
    }
};

    const deleteKid = async (kidId) => {
      const storage = getStorage();
      
      try {
        // Define the kid's directory path in Cloud Storage
        const kidDirectoryRef = ref(storage, `users/${user.uid}/kids/${kidId}`);
        
        // Delete individual files and folders
        const filesAndDirectories = await listAll(kidDirectoryRef);
        for (let item of filesAndDirectories.items) {
          await deleteObject(item);
        }
        // Delete profile images
        const profileImageDirectoryRef = ref(storage, `users/${user.uid}/kids/${kidId}/profile-image`);
        const profileImages = await listAll(profileImageDirectoryRef);
        for (let image of profileImages.items) {
          await deleteObject(image);
        }
    
        // Delete memories
        const memoriesDirectoryRef = ref(storage, `users/${user.uid}/kids/${kidId}/memories`);
        const memoriesFiles = await listAll(memoriesDirectoryRef);
        for (let memory of memoriesFiles.items) {
          await deleteObject(memory);
        }
    
        // Once all files in storage are deleted, delete the kid's document from Firestore
        const kidRef = doc(getFirestore(), 'users', user.uid, 'kids', kidId);
        await deleteDoc(kidRef);
    
        // Update the kidsData state in KidsContext
        if (setKidsData) {
          setKidsData(prevKids => prevKids.filter(kid => kid.id !== kidId));
        }
    
        // Navigate back
        navigate('/kids');
      } catch (error) {
        console.error("Error deleting kid:", error);
      }
    };
    

  const handleDelete = () => {
    if(window.confirm(`Ar tikrai norite ištrinti ${kidData.name}?`)) {
      deleteKid(kidData.id);
      navigate("/kids")
    }
  };

  return (
    <>
      <header className="registration-header new-kid">
        <Link to="/kids"><AiOutlineArrowLeft/></Link>
      </header>
      <motion.main 
        initial={{ opacity: 0, y: 30}}
        animate={{ opacity: 1, y: 0}}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01]
         }}
      className="registration-main new-kid-main">
        <h1>Atnaujink vaiko duomenis</h1>
        {kidData && 
        
        <form onSubmit={handleSubmit}>
        <ImageUploader previewUrl={kidData.image} handleImageChange={handleImageChange} />
          <input
              type="text"
              name="name"
              placeholder="Vardas Pavardė"
              value={kidData.name}
              onChange={handleInputChange}
              required
          />
          <input
            type="date"
            name="birthDate"
            onChange={handleInputChange}
            value={kidData.birthDate || ''}
            placeholder="Gimimo data"
            className="date-input"
            required
          />
          <input
            type="number"
            name="height"
            step="any"
            min="0"
            placeholder="Ūgis (cm)"
            value={kidData.height}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="weight"
            step="any"
            min="0"
            placeholder="Svoris (kg)"
            value={kidData.weight}
            onChange={handleInputChange}
            required
          />
          <button className="button-green">IŠSAUGOTI</button>
          <button type="button" className='button-red' onClick={handleDelete}>IŠTRINTI</button>
        </form>
        }
      </motion.main>
      <Footer />
    </>
  );
};

export default EditKidPage;
