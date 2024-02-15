import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Footer from "../../components/General/Footer";
import { signOutUser, signUpWithEmail } from '../../firebase/auth';
import similar from 'string-similarity'; // new import

const NewUserPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extracting the part of the email before the '@' symbol
    const emailPrefix = email.substring(0, email.indexOf('@'));

    // If the email prefix is too similar to the password, display an error
    const similarity = similar.compareTwoStrings(emailPrefix, password);
    if (similarity > 0.8) {
      setError('Jūsų el. paštas yra pernelyg panašus į jūsų slaptažodį');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Slaptažodis turėtų būti bent 8 raidžių ir turėti bent vieną didžiąją raidę bei skaičių.');
      return;
    }

    const response = await signUpWithEmail(email, password);
    console.log(response.error); // Let's inspect the error to understand its structure

    if (response.error === "Firebase: Error (auth/email-already-in-use).") {
      setError("Toks el. paštas jau naudojamas.");
    } else {
      setEmail('');
      setPassword('');
      setSuccess('Sėkmingai užsiregistravote! Patvirtinkite registraciją savo pašte. Laiškas gali būti šiukledežėje arba spam aplankale :)');
      setError('');
      signOutUser();
    }
  };

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
          {!success && (
              <>
                <input
                  type="email"
                  placeholder="El. paštas"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Slaptažodis"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="button-green">Registruotis</button>
                <p>Jau turite paskyrą? <Link to="/login">Prisijungti</Link></p>
              </>
            )}
            {error && <p className="userNotFound">{error}</p>}
            {success && (
            <>
              <p className='success'>{success}</p>
              <Link to="/login">
                <button className="button-green">Prisijungti</button>
              </Link>
            </>
          )}
          </form>
      </motion.main>
      <Footer/>
    </div>
      
  )
}

export default NewUserPage