import SelectedImage from './SelectedImage';

const Gallery = ({data, imagesData, selectedImage, setSelectedImage}) => {
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
  )
}

export default Gallery