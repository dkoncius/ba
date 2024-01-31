import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Footer from "../components/General/Footer";
import ImageUploader from "../components/LandingPage/ImageUploader";

const EditKidPage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [kidData, setKidData] = useState("");
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch(name) {
      case "date": setKidData(value); break;
    }
  };

  return (
    <>
      <header className="registration-header new-kid">
        <Link to="/"><AiOutlineArrowLeft/></Link>
      </header>
      <main className="registration-main new-kid-main">
        <h1>Atnaujink vaiko duomenis</h1>
        <form onSubmit={handleSubmit}>
          <ImageUploader />
          <input type="text" placeholder="Vardas" value="Petras" />

          <div className="flex">
            <input
              type={isFocused || kidData ? "date" : "text"}
              name="birthDate"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleInputChange}
              value="2022-06-13"
              placeholder="Gimimo data"
              className="date-input"
            />
            <input type="text" placeholder="Lytis" value="vyras" />
            <input type="text" placeholder="Ūgis" value="46" />
            <input type="text" placeholder="Svoris" value="4.6" />
          </div>
          <button className="button-green">Išsaugoti</button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default EditKidPage;
