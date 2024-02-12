import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Footer from "../../components/General/Footer";

const LoginPage = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/content/gallery")
  }

  return (
    <div className="registration-page">
        <header className="registration-header login-header">
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
            <h1>Prisijungimas</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Įveskite el. paštą"/>
                <input type="text" placeholder="Slaptažodis"/>
                <p className="forgot-psw">Pamiršai slaptažodį?</p>
                <button className="button-green">Prisijungti</button>
            </form>
            <p>Neturi paskyros <Link to="/new-user">Užsiregistruok</Link></p>
        </motion.main>
        <Footer/>
    </div>
  )
}

export default LoginPage