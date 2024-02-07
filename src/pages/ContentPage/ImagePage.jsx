import React, { useEffect, useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import ContentFiltering from '../../components/ContentPage/ContentFiltering';
import AddImage from '../../components/GalleryPage/AddImage';
import ImageGallery from '../../components/GalleryPage/ImageGallery';

const imagesData = [
  {id: 0, imgSrc: '../kids/kid-1.jpg', alt: 'kid-1', height: 51, mood: "angry", weight: 5.1},
  {id: 1, imgSrc: '../kids/kid-2.jpg', alt: 'kid-2', height: 46, mood: "laugh", weight: 4.6},
  {id: 2, imgSrc: '../kids/kid-3.jpg', alt: 'kid-3', height: 33, mood: "love", weight: 3.3},
  {id: 3, imgSrc: '../kids/kid-4.jpg', alt: 'kid-4', height: 48, mood: "peace", weight: 4.8},
];

const ImagePage = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [data, setData] = useState([])
  const [isFiltering, setIsFiltering] = useState(false)
  const [imagePage, setImagePage] = useState(false);

  useEffect(() => {
    setData(imagesData)
  }, [])

  return (
    <>
    <div className="content-filter">
        <BiFilterAlt className="filter-icon" onClick={() => setIsFiltering(!isFiltering)} />
        <button 
        className="button-green"
        onClick={() => setImagePage(true)}
        >Pridėti nuotrauką +</button>
    </div>

    {isFiltering ? 
    <ContentFiltering setIsFiltering={setIsFiltering}/> : 
    <ImageGallery data={data} imagesData={imagesData} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>}

    {imagePage && <AddImage setImagePage={setImagePage}/>}
    </>
  );
};

export default ImagePage;
