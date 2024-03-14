import React, { useContext, useEffect, useState } from 'react';
import ImageGallery from '../../components/ImagesPage/ImageGallery';
import AddImage from '../../components/ImagesPage/AddImage';
import ContentFiltering from '../../components/ContentPage/ContentFiltering';

import UserContext from '../../contexts/UserContext';
import { BiFilterAlt } from "react-icons/bi";
import { useParams } from 'react-router-dom'; // If kidId comes from URL

// Firebase
import { db } from '../../firebase/firebase-config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const ImagesPage = () => {
  const { user } = useContext(UserContext);
  const { kidId } = useParams(); // Assuming kidId is part of the URL
  const [imagesData, setImagesData] = useState([]);
  const [imagePage, setImagePage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    const fetchImages = async () => {
      if (!user || !kidId) return;
  
      try {
        const imagesRef = collection(db, `users/${user.uid}/images`);
        // Order the results by the 'createdAt' field in descending order to get newest images first
        const imagesQuery = query(imagesRef, where("kidId", "==", kidId), orderBy("createdAt", "desc"));
        const imagesSnapshot = await getDocs(imagesQuery);
        const imagesList = imagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
        setImagesData(imagesList);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };
  
    fetchImages();
  }, [user, kidId, imagePage, selectedImage]);


  

  return (
    <div className="container">
      <div className="content-filter">
        <button 
          className="button-green"
          onClick={() => setImagePage(true)}
        >
          Pridėti nuotrauką +
        </button>
      </div>
      {!imagePage && <ImageGallery imagesData={imagesData} setImagesData={setImagesData} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>}
  
      {imagePage && <AddImage setImagePage={setImagePage}/>}
    </div>
  );
};

export default ImagesPage;
