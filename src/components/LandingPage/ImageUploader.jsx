import { AiFillPlusCircle } from 'react-icons/ai';

const ImageUploader = () => {
  return (
    <>
      <input
          id="file"
          type="file"
          name="image"
          placeholder="Profilio nuotrauka"
        />
        <label className='file-container' htmlFor="file">
            <img className="profile-image-preview" src="/kids/kid-1.jpg" alt="Selected profile" />
            <AiFillPlusCircle className='icon'/>
        </label>
    </>
  );
};

export default ImageUploader;
