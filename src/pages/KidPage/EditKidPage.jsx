import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Footer from "../../components/General/Footer";
import ImageUploader from "../../components/LandingPage/ImageUploader";

import { getStorage, ref, deleteObject, listAll } from "firebase/storage";
import { getFirestore, doc, collection, query, getDocs, limit, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { getAuth } from 'firebase/auth';

const EditKidPage = ({user}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [kidData, setKidData] = useState({
    name: '',
    birthDate: '',
    height: '',
    weight: '',
    image: null,
  })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()


   // Fetch the first kid's data from Firestore
   const fetchFirstKid = async () => {
    if (!user) return;
    
    try {
        const db = getFirestore();
        const auth = getAuth();
        const currentUser = auth.currentUser;
        
        const kidsRef = collection(doc(db, 'users', currentUser.uid), 'kids');
        const kidsQuery = query(kidsRef, limit(1));
        const kidDocs = await getDocs(kidsQuery);

        if (!kidDocs.empty) {
            setKidData({ 
                id: kidDocs.docs[0].id, 
                ...kidDocs.docs[0].data() 
            });
        } else {
            console.log('No kids data found');
        }
        } catch (error) {
            console.error('Error fetching first kid: ', error);
            // You might want to handle the error more gracefully here
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (location.state && location.state.kidToEdit) {
            setKidData(location.state.kidToEdit);
            setLoading(false);
        } else {
            fetchFirstKid();
        }
    }, [user, location.state]);

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
          const kidRef = doc(db, 'users', user.uid, 'kids', kidId);
          await deleteDoc(kidRef);
      
          // Navigate back
          navigate('/kids', { state: { lastDeletedKidId: kidId } });
      
      } catch (error) {
          console.error("Error deleting kid:", error);
      }
  };

  const handleDelete = () => {
    if(window.confirm(`Ar tikrai norite ištrinti ${kidData.name}?`)) {
      deleteKid(kidData.id);
      goBackToKids();
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
          <button className="button-green">
            IŠSAUGOTI
          </button>
        </form>
      </motion.main>
      <Footer />
    </>
  );
};

export default EditKidPage;
