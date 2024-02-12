import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Footer from "../../components/General/Footer";

const NewUserPage = () => {

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/login")
  }

  return (
    <div className="registration-page">
      <header className="registration-header">
          <Link to="/"><AiOutlineArrowLeft/></Link>
      </header>
      <motion.main 
         initial={{ opacity: 0, y: 30}}
         animate={{ opacity: 1, y: 0}}
         transition={{
           duration: 1,
           ease: [0, 0.71, 0.2, 1.01]
         }}
       className="registration-main">
          <h1>Registracija</h1>
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Įveskite savo vardą"/>
              <input type="email" placeholder="Įveskite el. paštą"/>
              <input type="text" placeholder="Sukurkite slaptažodį"/>
              <input type="text" placeholder="Pakartokite slaptažodį" />
              <button className="button-green">Registruotis</button>
          </form>
          <p>Jau turite paskyrą? <Link to="/login">Prisijungti</Link></p>
      </motion.main>
      <Footer/>
    </div>
      
  )
}

export default NewUserPage