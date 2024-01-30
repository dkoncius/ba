import React, { useEffect, useState } from 'react';
import SelectedImage from '../../GalleryPage/SelectedImage';

const imagesData = [
  {id: 1, imgSrc: '../kids/kid-1.jpg', alt: 'kid-1', height: 51, mood: ":)", weight: 5.1},
  {id: 2, imgSrc: '../kids/kid-2.jpg', alt: 'kid-2', height: 46, mood: ":)", weight: 4.6},
  {id: 3, imgSrc: '../kids/kid-3.jpg', alt: 'kid-3', height: 33, mood: ":)", weight: 3.3},
  {id: 4, imgSrc: '../kids/kid-4.jpg', alt: 'kid-4', height: 48, mood: ":)", weight: 4.8},
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    setData(imagesData)
  }, [])

  return (
    <div className="gallery">
      {data && data.map((data) => (
          <img
          className='image'
            key={data.id}
            src={data.imgSrc}
            alt={data.alt}
            onClick={() => setSelectedImage(data.id)}
          />
      ))}


      {/* Selected image */}
    {imagesData.map((data) => (
        <SelectedImage 
        key={data.id} 
        id={data.id} 
        imgSrc={data.imgSrc}
        alt={data.alt}
        weight={data.weight}
        height={data.height}
        mood={data.mood}
        selectedImage={selectedImage} 
        setSelectedImage={setSelectedImage} 
        totalImages={imagesData.length} 
        />
      ))}

    </div>
  );
};

export default GalleryPage;
