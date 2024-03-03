import React, { useContext, useEffect, useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import { useParams } from 'react-router-dom'; // If kidId comes from URL
import ImageGallery from '../../components/ImagesPage/ImageGallery';
import AddImage from '../../components/ImagesPage/AddImage';
import { db } from '../../firebase/firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import UserContext from '../../contexts/UserContext';

const ImagesPage = () => {
  const { user } = useContext(UserContext);
  const { kidId } = useParams(); // Assuming kidId is part of the URL
  const [imagesData, setImagesData] = useState([]);
  const [imagePage, setImagePage] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    const fetchImages = async () => {
      if (!user || !kidId) return;

      try {
        const imagesRef = collection(db, `users/${user.uid}/images`);
        const imagesQuery = query(imagesRef, where("kidId", "==", kidId));
        const imagesSnapshot = await getDocs(imagesQuery);
        const imagesList = imagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setImagesData(imagesList);
        setData(imagesList)
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchImages();
  }, [user, kidId, imagePage, selectedImage]);


  

  return (
    <div className="container">
      <div className="content-filter">
        <BiFilterAlt className="filter-icon" onClick={() => setIsFiltering(!isFiltering)} />
        <button 
          className="button-green"
          onClick={() => setImagePage(true)}
        >
          Pridėti nuotrauką +
        </button>
      </div>
  
      {isFiltering ? 
        <ContentFiltering setIsFiltering={setIsFiltering}/> : 
        <ImageGallery imagesData={imagesData} data={data} setData={setData} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
      }
  
      {imagePage && <AddImage setImagePage={setImagePage}/>}
    </div>
  );
};

export default ImagesPage;
