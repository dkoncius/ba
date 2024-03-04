import { useContext, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { AiFillPlusCircle } from 'react-icons/ai';
import { storage, db } from '../../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { readAndCompressImage } from 'browser-image-resizer';
import { useParams } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';



const facesData = [
  {src: "/faces/angry.svg", mood: "angry"},
  {src: "/faces/cry.svg", mood: "cry"},
  {src: "/faces/laugh.svg", mood: "laugh"},
  {src: "/faces/love.svg", mood: "love"},
  {src: "/faces/peace.svg", mood: "peace"},
  {src: "/faces/wow.svg", mood: "wow"},
];

const AddImage = ({ setImagePage }) => {
  const {user} = useContext(UserContext);
  const { kidId } = useParams();
  const [selectedMood, setSelectedMood] = useState(facesData[0].mood);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');


  // Image Resize Configuration
  const imageConfig = {
    quality: 0.7,
    maxWidth: 1080,
    maxHeight: 1080,
    autoRotate: true,
    debug: true,
  };

  const handleSelectMood = (mood) => {
    setSelectedMood(mood);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'file') {
      const newFile = files[0];
      if (newFile) {
        setFile(newFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(newFile);
      }
    } else {
      if (value === '') {
        // Directly setting to 0 or keeping the field empty as appropriate
        name === 'height' ? setHeight('') : setWeight('');
      } else {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) { // Check if numValue is not NaN
          const limitedValue = Math.max(0, Math.min(numValue, 500));
          name === 'height' ? setHeight(String(limitedValue)) : setWeight(String(limitedValue));
        } else {
          // Optionally handle the case where numValue is NaN, e.g., reset to default or keep old value
          name === 'height' ? setHeight('') : setWeight('');
        }
      }
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
  
    if (name === 'weight') {
      const numValue = parseFloat(value);
      const limitedValue = Math.max(0, Math.min(numValue, 500));
      setWeight(String(limitedValue.toFixed(1))); // Apply .toFixed(1) formatting after blur
    }
  };

  const saveImageData = async () => {
    // Basic validation checks
    if (!file) {
        alert('Please select an image.');
        return;
    }

    // Validate height and weight
    const numericHeight = parseFloat(height);
    const numericWeight = parseFloat(weight);
    if (isNaN(numericHeight) || numericHeight <= 0 || numericHeight > 500) {
        alert('Please enter a valid height between 0 and 500 cm.');
        return;
    }
    if (isNaN(numericWeight) || numericWeight <= 0 || numericWeight > 500) {
        alert('Please enter a valid weight between 0 and 500 kg.');
        return;
    }

    try {
        const resizedImage = await readAndCompressImage(file, imageConfig);
        const storageRef = ref(storage, `users/${user.uid}/images/${file.name}`);
        const uploadTaskSnapshot = await uploadBytes(storageRef, resizedImage);
        const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
        
        await addDoc(collection(db, `users/${user.uid}/images`), {
            url: downloadURL,
            mood: selectedMood,
            height: numericHeight.toString(), // Ensure stored as string if necessary
            weight: numericWeight.toString(), // Ensure stored as string if necessary
            kidId: kidId,
        });

        console.log("Image successfully uploaded and document created.");
        setImagePage(false); // Navigate back to the ImageGallery
    } catch (error) {
        console.error("Error uploading file or saving data:", error);
    }
};


  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile instanceof Blob && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setPreviewUrl(dataUrl);
        setFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      console.error('The selected file is not a valid image or no file was selected.');
    }
  };
  
  return (
    <div className="add-image">
      <button className="close" onClick={() => setImagePage(false)}>
        <RxCross1 />
      </button>
      <input
        id="file"
        type="file"
        name="image"
        onChange={handleImageChange}
      />
      <label htmlFor="file" className='file-container'>
        {/* Display the image preview if available, otherwise show the icon */}
        {previewUrl ? (
          <img className="profile-image-preview" src={previewUrl} alt="Selected profile" />
        ) : (
          <AiFillPlusCircle className='icon'/>
        )}
      </label>

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
      <div className="button-green" onClick={saveImageData}>Išsaugoti</div>

    </div>
  );
};

export default AddImage;
