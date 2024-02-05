import React, { useEffect, useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import Gallery from '../../components/GalleryPage/Gallery';
import ContentFiltering from '../../components/ContentPage/ContentFiltering';

const imagesData = [
  {id: 1, imgSrc: '../kids/kid-1.jpg', alt: 'kid-1', height: 51, mood: ":)", weight: 5.1},
  {id: 2, imgSrc: '../kids/kid-2.jpg', alt: 'kid-2', height: 46, mood: ":)", weight: 4.6},
  {id: 3, imgSrc: '../kids/kid-3.jpg', alt: 'kid-3', height: 33, mood: ":)", weight: 3.3},
  {id: 4, imgSrc: '../kids/kid-4.jpg', alt: 'kid-4', height: 48, mood: ":)", weight: 4.8},
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [data, setData] = useState([])
  const [isFiltering, setIsFiltering] = useState(false)

  useEffect(() => {
    setData(imagesData)
  }, [])

  return (
    <>
    <div className="content-filter">
        <BiFilterAlt className="filter-icon" onClick={() => setIsFiltering(!isFiltering)} />
        <button className="button-green ">Pridėti nuotrauką +</button>
    </div>

    {isFiltering ? 
    <ContentFiltering setIsFiltering={setIsFiltering}/> : 
    <Gallery data={data} imagesData={imagesData} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>}

    
    </>
  );
};

export default GalleryPage;
