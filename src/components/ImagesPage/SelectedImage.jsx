import { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import UserContext from '../../contexts/UserContext';

// Firebase
import { db, storage } from '../../firebase/firebase-config';
import { doc, deleteDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useParams } from 'react-router-dom';

const facesData = [
    {src: "/faces/angry.svg", mood: "angry"},
    {src: "/faces/cry.svg", mood: "cry"},
    {src: "/faces/laugh.svg", mood: "laugh"},
    {src: "/faces/love.svg", mood: "love"},
    {src: "/faces/peace.svg", mood: "peace"},
    {src: "/faces/wow.svg", mood: "wow"}
  ];

  const defaultFace = "";

  const SelectedImage = ({ imagesData, setImagesData, selectedImage, setSelectedImage, totalImages }) => {
    const {kidId} = useParams()
    const {user} = useContext(UserContext);
    const [moodImage, setMoodImage] = useState(defaultFace);
    const [animate, setAnimate] = useState(false);
  
    useEffect(() => {
      const face = facesData.find(face => face.mood === selectedImage.mood);
      setMoodImage(face ? face.src : defaultFace);
    }, [selectedImage]);
  
    if (!imagesData) {
      return null;
    }

    const deleteImage = async (selectedImageId, fileName) => {
      // Display a confirmation dialog
      const isConfirmed = window.confirm("Ar tikrai norite ištrintį šią nuotrauką su duomenimis?");
      
      // Proceed with deletion only if the user confirmed
      if (isConfirmed) {
        // Remove the image from the local state in the parent component
        const updatedImages = imagesData.filter(image => image.id !== selectedImage.id);
        // Assuming you have a function to update the parent component's state
        setImagesData(updatedImages); // Update the local state
      
        // Delete the image from Firebase
        const imageDocRef = doc(db, 'users', user.uid, 'images', selectedImage.id);

        // Delete image from storage
        const imageFileRef = ref(storage, `users/${user.uid}/kids/${kidId}/images/${fileName}`);

        try {
          await deleteObject(imageFileRef);
          console.log("Image file deleted from storage");

          await deleteDoc(imageDocRef)
          setSelectedImage(null); // Optionally reset the selected image to null
        } catch (error) {
          console.error("Error deleting image from Firebase:", error);
        }
      } else {
        // User clicked 'Cancel', do not delete the image
        console.log("Image deletion canceled");
      }
    };
    
  
    return (
      <div className="selected-image">
        <header className="header">
          <AiOutlineArrowLeft onClick={() => setSelectedImage(null)}/>
        </header>
  
        <Swiper
          navigation
          pagination={{ clickable: true }}
          initialSlide={imagesData.id}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={(swiper) => {
            const newSelectedImage = imagesData[swiper.activeIndex];
            setSelectedImage(newSelectedImage); // Update the selected image based on the active index
          }}
        >
          {Array.from({ length: totalImages }, (_, index) => (
            <SwiperSlide key={index}>
              <div className="image">
                <img src={selectedImage.url} alt="Selected" />
                <div className={animate ? 'content content-animate' : 'content'}>
                  <div className="height">
                    <p>ŪGIS</p>
                    <h2>{selectedImage.height} CM</h2>
                  </div>
  
                  <div className="mood">
                    <img src={moodImage} alt={selectedImage.mood} className="face" />
                  </div>
  
                  <div className="weight">
                    <p>SVORIS</p>
                    <h2>{selectedImage.weight} KG</h2>
                  </div>
                </div>
                <button onClick={() => deleteImage(selectedImage.id, selectedImage.fileName)} className="delete-btn">
                  Ištrinti
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };
  
  export default SelectedImage;