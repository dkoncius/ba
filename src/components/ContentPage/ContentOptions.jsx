import { useState, useEffect } from "react";
import { LuMountain } from "react-icons/lu";
import { BsCameraVideo } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMicOutline } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";

const optionsData = [
  {
    id: 1,
    icon: <LuMountain />,
    to: "gallery"
  },
  {
    id: 2,
    icon: <BsCameraVideo />,
    to: "video"
  },
  {
    id: 3,
    icon: <IoDocumentTextOutline />,
    to: "notes"
  },
  {
    id: 4,
    icon: <IoMicOutline />,
    to: "audio"
  }
];

const ContentOptions = () => {
  const [selectedOption, setSelectedOption] = useState(1);

  useEffect(() => {
    // Retrieve the selected option from localStorage on component mount
    const storedSelectedOption = localStorage.getItem("selectedOption");
    if (storedSelectedOption) {
      setSelectedOption(parseInt(storedSelectedOption));
    }
  }, []);

  const handleOptionClick = (id) => {
    setSelectedOption(id);
    // Store the selected option in localStorage
    localStorage.setItem("selectedOption", id.toString());
  };

  return (
    <>
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
    <Outlet/>
    </>
  );
};

export default ContentOptions;
