import { motion } from "framer-motion";
import SelectedImage from './SelectedImage';
import { useState } from "react";

const ImageGallery = ({ imagesData, setImagesData, selectedImage, setSelectedImage}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (imageId) => {
    const index = imagesData.findIndex(image => image.id === imageId);
    if (index !== -1) {
      setSelectedImage(imagesData[index]);
      setCurrentIndex(index);
    }
  };

  const animation = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        staggerChildren: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={animation}
      initial="hidden"
      animate="visible"
      className="gallery">
      {selectedImage == null && imagesData && imagesData.map((image, index) => (
        <img
          className='image'
          key={image.id}
          src={image.url}
          alt={image.alt || 'Image'}
          onClick={() => handleImageClick(image.id)}
        />
      ))}

      {/* Selected image */}
      {selectedImage !== null && (
        <SelectedImage
          imagesData={imagesData}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          totalImages={imagesData.length}
          currentIndex={currentIndex}
          setImagesData={setImagesData}
        />
      )}
    </motion.div>
  );
}

export default ImageGallery;
