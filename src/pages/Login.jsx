import { Link, useNavigate } from "react-router-dom";
import "../scss/Registration.scss";

import { AiOutlineArrowLeft } from "react-icons/ai";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <>
        <header className="registration-header">
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
    </>
  )
}

export default Login