import { easeIn, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Option from '../../components/LandingPage/Option';
import Footer from "../../components/General/Footer";

const optionsData = [
    {
      iconSrc: 'landing/image-icon.png',
      title: 'Nuotraukos',
      description: 'Įamžinkite gražiausias ir įsimintiniausias vaiko gyvenimo akimirkas',
      link: "/content/images"
    },
    {
      iconSrc: 'landing/video-icon.png',
      title: 'Vaizdo įrašai',
      description: 'Išsaugokite gražiausius vaiko gyvenimo momentus',
      link: "/content/videos"
    },
    {
      iconSrc: 'landing/text-icon.png',
      title: 'Dienoraštis',
      description: 'Aprašykite vaiko raidą, pirmus žodžius bei vaiko ir savo emocijas, išreikškite meilę parašydami laišką savo vaikui',
      link: "/content/notes"
    },
    {
      iconSrc: 'landing/mic-icon.png',
      title: 'Garso įrašai',
      description: 'Įrašykite pirmąjį vaiko juoką, krykštavimus bei ištartą pirmąjį žodį',
      link: "/content/recordings"
    },
  ];

const LandingPage = () => {
  
  const headingsVariants = {
    offscreen: {
      opacity: 0, scale: 0.5
    },
    onscreen: {
      opacity: 1, scale: 1,
      transition: {
        type: "spring",
        duration: 0.8
      }
    }
  };

  return (
    <>
       <header className="landing-header">
        <div className="container">
          <div className="content">
            <motion.nav
                initial={{ opacity: 0, y: -30}}
                animate={{ opacity: 1, y: 0}}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
            >
              <Link to="/">
                <img className='logo' src="landing/logo.png" alt="logo" />
              </Link>
              <Link to="/login" className='button-outline'>Prisijungti</Link>
            </motion.nav>

            <motion.div
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{
                 duration: 0.5,
                 ease: easeIn
               }}
                className="hero"
            >
              <h1>Brangiausios vaiko akimirkos - vienoje vietoje!</h1>
              <Link to="/new-user" className="button-brown">Registruotis</Link>
            </motion.div>
          </div>
          <motion.img 
            initial={{ opacity: 0, y: -30}}
            animate={{ opacity: 1, y: 0}}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          className='cover' src="landing/cover.png" alt="cover" />
        </div>
      </header>

      <section className="memories-options">
        <div className="container">
          <motion.h2
            initial="offscreen"
            whileInView="onscreen"
            variants={headingsVariants}
            viewport={{ once: true }}
          >Prisiminimai keturiais skirtingais būdais</motion.h2>

          <div className="options">
            {optionsData.map((option, index) => (
            <Option iconSrc={option.iconSrc} title={option.title} description={option.description} key={index} motion={motion}/>
            ))}
          </div>

        </div>
          <div className="memories-options-bottom">
            <motion.div
                initial="offscreen"
                whileInView="onscreen"
                variants={headingsVariants}
                viewport={{ once: true }}
            >   
              <h2>Įsiamžinkite svarbiausias savo vaiko akimirkas dabar</h2>
              <Link to="/new-user" className="button-green">Registruotis</Link>
            </motion.div>  
          </div>
      </section>

      <Footer/>
    </>
  )
}

export default LandingPage