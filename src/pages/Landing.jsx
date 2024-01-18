import "../scss/Landing.scss";
import Option from '../components/Option';
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const optionsData = [
    {
      iconSrc: 'landing/image-icon.png',
      title: 'Nuotraukos',
      description: 'Įsiamžinkite nuostabiausias vaiko akimirkas',
    },
    {
      iconSrc: 'landing/video-icon.png',
      title: 'Video',
      description: 'Įsiamžinkite nuostabiausias vaiko akimirkas',
    },
    {
      iconSrc: 'landing/text-icon.png',
      title: 'Tekstas',
      description: 'Įsiamžinkite nuostabiausias vaiko akimirkas',
    },
    {
      iconSrc: 'landing/mic-icon.png',
      title: 'Garso įrašas',
      description: 'Įsiamžinkite nuostabiausias vaiko akimirkas',
    },
  ];

const Landing = () => {
  return (
    <>
       <header className="landing-header">
        <div className="container">
          <div className="content">
            <nav>
              <img className='logo' src="landing/logo.png" alt="logo" />
              <Link to="/login" className='button-outline'>Prisijungti</Link>
            </nav>
            <h1>Brangiausios akimirkos su vaiku - vienoje vietoje</h1>
            <Link to="/new-user" className="button-brown">Registruotis</Link>
          </div>
          <img className='cover' src="landing/cover.png" alt="cover" />
        </div>
      </header>

      <section className="memories-options">
        <div className="container">
          <h2>Prisiminimai keturiais skirtingais būdais</h2>

          <div className="options">
            {optionsData.map((option, index) => (
            <Option iconSrc={option.iconSrc} title={option.title} description={option.description} key={index}/>
            ))}
          </div>

        </div>
          <div className="memories-options-bottom">    
            <h2>Įsiamžinkite svarbiausias savo vaiko akimirkas dabar</h2>
            <Link to="/new-user" className="button-green">Registruotis</Link>
          </div>
      </section>

      <Footer/>
    </>
  )
}

export default Landing