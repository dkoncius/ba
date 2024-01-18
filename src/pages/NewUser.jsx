import { Link } from "react-router-dom";
import "../scss/Registration.scss";

import { AiOutlineArrowLeft } from "react-icons/ai";
import Footer from "../components/Footer";

const NewUser = () => {
  return (
    <>
        <header className="registration-header">
            <Link to="/"><AiOutlineArrowLeft/></Link>
        </header>
        <main className="registration-main">
            <h1>Registracija</h1>
            <form>
                <input type="text" placeholder="Įveskite savo vardą"/>
                <input type="email" placeholder="Įveskite el. paštą"/>
                <input type="text" placeholder="Sukurkite slaptažodį"/>
                <input type="text" placeholder="Pakartokite slaptažodį" />
                <button className="button-green">Registruotis</button>
            </form>
            <p>Jau turite paskyrą? <Link>Prisijungti</Link></p>
        </main>
        <Footer/>
    </>
  )
}

export default NewUser