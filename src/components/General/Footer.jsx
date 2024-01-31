import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer>
        <Link to="/">
          <img className='logo' src="/landing/logo.png" alt="logo" />
        </Link>
    </footer>
  )
}

export default Footer