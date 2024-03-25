import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer>
        <Link to="/">
          <img className='logo' src="/landing/logo.png" alt="logo" />
        </Link>
        <div>
        <p>2024 © Visos teisės priklauso <b>Kudikio dienoraštis</b></p>
        <p>Informacinis adresas: <b>kudikiodienorastis@gmail.com</b></p>
        <p>Bendrosios sąlygos ir nuostatos:<b>
          <Link to="/policy"> Privatumo politika</Link>
        </b></p>
        </div>
    </footer>
  )
}

export default Footer