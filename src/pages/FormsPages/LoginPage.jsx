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
        <main className="registration-main">
            <h1>Prisijungimas</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Įveskite el. paštą"/>
                <input type="text" placeholder="Slaptažodis"/>
                <p className="forgot-psw">Pamiršai slaptažodį?</p>
                <button className="button-green">Prisijungti</button>
            </form>
            <p>Neturi paskyros <Link to="/new-user">Užsiregistruok</Link></p>
        </main>
        <Footer/>
    </div>
  )
}

export default LoginPage