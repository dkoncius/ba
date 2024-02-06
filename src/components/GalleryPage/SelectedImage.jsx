import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';


const facesData = [
    {src: "/faces/angry.svg", mood: "angry"},
    {src: "/faces/cry.svg", mood: "cry"},
    {src: "/faces/laugh.svg", mood: "laugh"},
    {src: "/faces/love.svg", mood: "love"},
    {src: "/faces/peace.svg", mood: "peace"},
    {src: "/faces/wow.svg", mood: "wow"}
  ];

  const defaultFace = ""; // Add a default face image


const SelectedImage = ({imgSrc, alt, weight,height, mood, selectedImage, setSelectedImage, id, totalImages}) => {
    const [moodImage, setMoodImage] = useState(defaultFace); // Initialize with default face

    useEffect(() => {
        const face = facesData.find(face => face.mood === mood);
        if (face) {
            setMoodImage(face.src); // If face is found, set the moodImage to its src
        } else {
            setMoodImage(defaultFace); // If not found, revert to default face image
        }
    }, [mood]); // Add mood to the dependency array

  return (
    <div 
        className={selectedImage === id ? "selected-image" : "none"}>
        <header className="header">
            <AiOutlineArrowLeft onClick={() => setSelectedImage(null)}/>
        </header>

        <div className="image">         
            <img
                key={id}
                src={imgSrc}
                alt={alt}
            />

            <div className="navigation">
                <button
                className="previous-button"
                onClick={() => setSelectedImage(prev => prev - 1)} // Go to the previous image
                disabled={id === 0} // Disable if already at the first image
                >
                <AiOutlineArrowLeft className='icon' />
                </button>
                <button
                    className="next-button"
                    onClick={() => setSelectedImage(prev => prev + 1)} // Go to the next image
                    disabled={id === totalImages - 1} // Disable if already at the last image
                    >
                    <AiOutlineArrowRight className='icon' />
                </button>
            </div>
        </div>
        <div className="content">
            <div className="height">
                <p>ŪGIS</p>
                <h2>{height}</h2>
            </div>

            <div className="mood">
                <img src={moodImage} alt={mood} className="face" />
            </div>

            <div className="weight">
                <p>SVORIS</p>
                <h2>{weight}</h2>
            </div>
        </div>

      
    </div>
  )
}

export default SelectedImage