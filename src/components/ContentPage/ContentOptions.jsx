import { useState, useEffect } from "react";
import { LuMountain } from "react-icons/lu";
import { BsCameraVideo } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMicOutline } from "react-icons/io5";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

const optionsData = [
  {
    id: 1,
    icon: <LuMountain />,
    to: "images"
  },
  {
    id: 2,
    icon: <BsCameraVideo />,
    to: "videos"
  },
  {
    id: 3,
    icon: <IoDocumentTextOutline />,
    to: "notes"
  },
  {
    id: 4,
    icon: <IoMicOutline />,
    to: "recordings"
  }
];

const ContentOptions = () => {
  const {kidId} = useParams()
  const [selectedOption, setSelectedOption] = useState(1);
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem("selectedOption");

    if (stored) {
      const storedData = JSON.parse(stored);

      setSelectedOption(storedData.id);
      // Conditionally navigate based on the app's current route to avoid unwanted redirections
      navigate(`/${kidId}/content/${storedData.contentType}`);
    }
  }, [navigate]);

  const handleOptionClick = (id) => {
    const selectedContent = optionsData.find(option => option.id === id);
    setSelectedOption(id);
  
    const contentType = selectedContent ? selectedContent.to : 'unknown';
  
    // Save the selected option ID and content type
    localStorage.setItem("selectedOption", JSON.stringify({ id, contentType }));
  };
  

  return (
    <> 
    <div className="container">
      <nav className="content-options">
        {optionsData.map((option) => (
          <Link
            to={option.to}
            key={option.id}
            className={`content-option ${selectedOption === option.id ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option.id)}
          >
            {option.icon}
            <span>{option.label}</span>
          </Link>
        ))}
      </nav>
    </div>
    
    <Outlet/>
    </>
  );
};

export default ContentOptions;
