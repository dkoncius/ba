import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const facesData = [
    {src: "/faces/angry.svg", mood: "angry"},
    {src: "/faces/cry.svg", mood: "cry"},
    {src: "/faces/laugh.svg", mood: "laugh"},
    {src: "/faces/love.svg", mood: "love"},
    {src: "/faces/peace.svg", mood: "peace"},
    {src: "/faces/wow.svg", mood: "wow"}
  ];

  const defaultFace = "";

  const SelectedImage = ({ imageData, setSelectedImage, totalImages }) => {
    const [moodImage, setMoodImage] = useState(defaultFace); // Initialize with default face
    const [animate, setAnimate] = useState(false); // Initialize animate state

    useEffect(() => {
        if (imageData) {
            const face = facesData.find(face => face.mood === imageData.mood);
            if (face) {
                setMoodImage(face.src);
            } else {
                setMoodImage(defaultFace); 
            }
        }
    }, [imageData && imageData.mood]); 

    if (!imageData) {
        return null;
    }

    return (
        <div className="selected-image">
            <header className="header">
                <AiOutlineArrowLeft onClick={() => setSelectedImage(null)}/>
            </header>

            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                onSlideChange={(swiper) => {
                    setSelectedImage(swiper.activeIndex);
                    setAnimate(false);
                    setTimeout(() => setAnimate(true), 10); // Reset animation
                }}
                initialSlide={imageData.id}
                spaceBetween={50}
                slidesPerView={1}
            >
                {Array.from({ length: totalImages }, (_, index) => (
                    <SwiperSlide key={index}>
                        {index === imageData.id && (
                            <div className="image">
                                <img src={imageData.imgSrc} alt={imageData.alt} />

                                <div className={animate ? 'content content-animate' : 'content'}>
                                    <div className="height">
                                        <p>ŪGIS</p>
                                        <h2>{imageData.height}</h2>
                                    </div>

                                    <div className="mood">
                                        <img src={moodImage} alt={imageData.mood} className="face" />
                                    </div>

                                    <div className="weight">
                                        <p>SVORIS</p>
                                        <h2>{imageData.weight}</h2>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SelectedImage;