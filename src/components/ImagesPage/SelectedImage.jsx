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

  const SelectedImage = ({ data, setSelectedImage, totalImages }) => {
    const [moodImage, setMoodImage] = useState(defaultFace);
    const [animate, setAnimate] = useState(false);
  
    useEffect(() => {
      const face = facesData.find(face => face.mood === data.mood);
      setMoodImage(face ? face.src : defaultFace);
    }, [data]);
  
    if (!data) {
      return null;
    }
  
    return (
      <div className="selected-image">
        <header className="header">
          <AiOutlineArrowLeft onClick={() => setSelectedImage(null)}/>
        </header>
  
        <Swiper
          navigation
          pagination={{ clickable: true }}
          initialSlide={data.id}
          spaceBetween={50}
          slidesPerView={1}
        >
          {Array.from({ length: totalImages }, (_, index) => (
            <SwiperSlide key={index}>
              {/* Assuming you want to display something specific for each slide based on the index */}
              {/* For simplicity, let's assume you want to show the same selected image on each slide */}
              <div className="image">
                <img src={data.url} alt="Selected" />
                <div className={animate ? 'content content-animate' : 'content'}>
                  <div className="height">
                    <p>ŪGIS</p>
                    <h2>{data.height} CM</h2>
                  </div>
  
                  <div className="mood">
                    <img src={moodImage} alt={data.mood} className="face" />
                  </div>
  
                  <div className="weight">
                    <p>SVORIS</p>
                    <h2>{data.weight} KG</h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };
  
  export default SelectedImage;