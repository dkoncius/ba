import { Link } from "react-router-dom";
import "../scss/Registration.scss";

import { AiOutlineArrowLeft } from "react-icons/ai";
import Footer from "../components/Footer";

const Login = () => {
  return (
    <>
        <header className="registration-header">
            <Link to="/"><AiOutlineArrowLeft/></Link>
        </header>
        <main className="registration-main">
            <h1>Prisijungimas</h1>
            <form>
                <input type="email" placeholder="Įveskite el. paštą"/>
                <input type="text" placeholder="Slaptažodis"/>
                <p className="forgot-psw">Pamiršai slaptažodį?</p>
                <button className="button-green">Registruotis</button>
            </form>
            <p>Neturi paskyros <Link to="/new-user">Užsiregistruok</Link></p>
        </main>
        <Footer/>
    </>
  )
}

export default Login