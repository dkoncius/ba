import { motion  } from "framer-motion"
import SelectedImage from './SelectedImage';

const ImageGallery = ({data, imagesData, selectedImage, setSelectedImage}) => {

  const animation = { 
    hidden: {opacity: 0, y: 30},
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        staggerChildren: 0.3
      }
    }
}


  return (
    <motion.div 
    variants={animation} initial="hidden" animate="visible" 
    className="gallery">
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
      {selectedImage !== null && (
        <SelectedImage
          imageData={imagesData.find(data => data.id === selectedImage)}
          setSelectedImage={setSelectedImage}
          totalImages={imagesData.length}
        />
      )}
    </motion.div>
  )
}

export default ImageGallery