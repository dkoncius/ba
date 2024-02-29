import { motion  } from "framer-motion"
import SelectedImage from './SelectedImage';

const ImageGallery = ({data,selectedImage, setSelectedImage}) => {
  console.log(data)
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
          src={data.url}
          alt={data.alt}
          onClick={() => setSelectedImage(data.id)}
        />
    ))}


      {/* Selected image */}
      {selectedImage !== null && (
      <SelectedImage
          data={data.find(data => data.id === selectedImage)}
          setSelectedImage={setSelectedImage}
          totalImages={data.length}
          />
        )}
      </motion.div>
  )
}

export default ImageGallery