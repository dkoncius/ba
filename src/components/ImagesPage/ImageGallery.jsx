import { motion } from "framer-motion";
import SelectedImage from './SelectedImage';
import { useState } from "react";

const ImageGallery = ({ imagesData, setData, data, selectedImage, setSelectedImage}) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Add state to track the current index

  const handleImageClick = (imageId) => {
    console.log("Clicked image ID:", imageId); // Check if this logs correctly when an image is clicked
    const index = imagesData.findIndex(image => image.id === imageId);
    console.log("Found index:", index); // Verify the index is found correctly
    if (index !== -1) {
      setSelectedImage(imagesData[index]);
      setCurrentIndex(index);
      console.log("Selected image set to:", imagesData[index]); // Verify the selected image imageData looks correct
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
      {imagesData && imagesData.map((image, index) => ( // Add index parameter
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
          setData={setData}
          data={data}
        />
      )}
    </motion.div>
  );
}

export default ImageGallery;
