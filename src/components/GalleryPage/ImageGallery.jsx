import SelectedImage from './SelectedImage';

const ImageGallery = ({data, imagesData, selectedImage, setSelectedImage}) => {
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
      {selectedImage !== null && (
        <SelectedImage
          imageData={imagesData.find(data => data.id === selectedImage)}
          setSelectedImage={setSelectedImage}
          totalImages={imagesData.length}
        />
      )}
    </div>
  )
}

export default ImageGallery