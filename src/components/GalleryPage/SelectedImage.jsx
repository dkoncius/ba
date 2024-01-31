import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';


const SelectedImage = ({imgSrc, alt, weight,height, mood, selectedImage, setSelectedImage, id, totalImages}) => {
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
                <h2>{mood}</h2>
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