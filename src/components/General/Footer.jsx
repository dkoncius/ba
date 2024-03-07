import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer>
        <Link to="/">
          <img className='logo' src="/landing/logo.png" alt="logo" />
        </Link>
        <p>2024 © Visos teisės priklauso <b>Kudikio dienoraštis</b></p>
        <p>Informacinis adresas: <b>obukaite.reda.reda@gmail.com</b></p>
    </footer>
  )
}

export default Footer