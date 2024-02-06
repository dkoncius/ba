import { useState } from 'react';
import { RxCross1 } from "react-icons/rx";

const facesData = [
  {src: "/faces/angry.svg", mood: "angry"},
  {src: "/faces/cry.svg", mood: "cry"},
  {src: "/faces/laugh.svg", mood: "laugh"},
  {src: "/faces/love.svg", mood: "love"},
  {src: "/faces/peace.svg", mood: "peace"},
  {src: "/faces/wow.svg", mood: "wow"},
];

const AddImage = ({ setImagePage }) => {
  const [selectedMood, setSelectedMood] = useState(facesData[0].mood);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  const handleSelectMood = (mood) => {
    setSelectedMood(mood);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (value === '') {
      name === 'height' ? setHeight(value) : setWeight(value);
    } else {
      const numValue = parseFloat(value);
      const limitedValue = Math.max(0, Math.min(numValue, 500));
  
      if (name === 'height') {
        setHeight(String(limitedValue));
      } else if (name === 'weight') {
        setWeight(String(limitedValue));
      }
    }
  };

  const handleInputBlur = (e) => { // Corrected the function name to handleInputBlur
    const { name, value } = e.target;
  
    if (name === 'weight') {
      const numValue = parseFloat(value);
      const limitedValue = Math.max(0, Math.min(numValue, 500));
      setWeight(String(limitedValue.toFixed(1))); // Apply .toFixed(1) formatting after blur
    }
  };
  
  return (
    <div className="add-image">
      <button className="close" onClick={() => setImagePage(false)}>
        <RxCross1 />
      </button>
      <img className="image" src="/kids/kid-1.jpg" alt="kid-1" />

      <div className="image-data">
        <div className="height">
          <p className="title">Ūgis<br /> (CM)</p>
          <input 
            className="units" 
            type="number" 
            step={1} 
            min="0" 
            max="500"
            name="height"
            value={height}
            onChange={handleInputChange} 
          />
        </div>
        <div className="image-mood">
          {facesData.map((face, index) => (
            <img
              className={selectedMood === face.mood ? "face selected" : " face"}
              src={face.src}
              alt={face.emotion}
              key={index}
              onClick={() => handleSelectMood(face.mood)} 
            />
          ))}
        </div>
        <div className="weight">
          <p className="title">Svoris <br /> (KG)</p>
          <input 
            className="units" 
            type="number" 
            step={0.1} 
            min="0" 
            max="500"
            name="weight"
            value={weight}
            onChange={handleInputChange}
            onBlur={handleInputBlur} // Add onBlur event here
          />
        </div>
      </div>
  
      <div className="button-green" onClick={() => setImagePage(false)}>Išsaugoti</div>
    </div>
  );
};

export default AddImage;
