import { useContext, useState, useRef } from 'react';
import { RxCross1 } from "react-icons/rx";
import { AiFillPlusCircle } from 'react-icons/ai';
import { storage, db } from '../../firebase/firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useParams } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

const AddVideo = ({ setVideoPage }) => {
  const { user } = useContext(UserContext);
  const { kidId } = useParams();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);


  const handleVideoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    } else {
      alert('The selected file is not a valid video.');
    }
  };

  const handleVideoUpload = async () => {
    if (!file) {
      alert('Prašome pasirinkti vaizdo įrašą');
      return;
    }
  
    try {
      setIsUploading(true);
      const videoRef = ref(storage, `users/${user.uid}/kids/${kidId}/videos/${file.name}`);
      const uploadTaskSnapshot = await uploadBytes(videoRef, file);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
  
      await addDoc(collection(db, `users/${user.uid}/videos`), {
        url: downloadURL,
        kidId: kidId,
        fileName: file.name, // Ensure you're capturing the file name if needed for deletion or reference
        createdAt: serverTimestamp() // Include a timestamp for when the video is uploaded
      });
  
      alert("Video successfully uploaded.");
      setVideoPage(false); // Navigate back to the video gallery
    } catch (error) {
      console.error("Error uploading video:", error);
      alert('Failed to upload the video. Please try again.');
    } finally {
      setIsUploading(true);
    }

  };

  return (
    <div className="add-video">
      <button className="close" onClick={() => setVideoPage(false)}>
        <RxCross1 />
      </button>
      <div className="file-container" onClick={() => fileInputRef.current.click()}>
        {previewUrl ? (
          <video className="video-preview" controlsList="nofullscreen" controls src={previewUrl}></video>
        ) : (
          <button>
            <AiFillPlusCircle className='icon'/>
          </button>
        )}
        <input
          ref={fileInputRef}
          id="file"
          type="file"
          name="video"
          accept="video/*"
          onChange={handleVideoChange}
          style={{ display: 'none' }}
        />
      </div>
      <button className="button-green" onClick={handleVideoUpload} disabled={isUploading}>
        {isUploading ? 'Išsaugojama...' : 'Išsaugoti'}
      </button>
    </div>
  );
};

export default AddVideo;
