import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Footer from "../../components/General/Footer";
import { auth } from '../../firebase/firebase-config';
import { signOutUser, signInWithEmail, resetPassword } from '../../firebase/auth';
import { useEffect, useState } from "react";

const LoginPage = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetRequested, setResetRequested] = useState(false);

  const navigate = useNavigate()

  const getErrorMessage = (firebaseError) => {
    switch (firebaseError) {
      case 'Firebase: Error (auth/wrong-password).':
        return 'Neteisingas slaptažodis';
      case 'Firebase: Error (auth/user-not-found).':
        return 'Vartotojas nerastas';
      default:
        return undefined;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        setUser(user);
        navigate('/content/gallery');
      }
    });
    return unsubscribe;
  }, [setUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signInWithEmail(email, password);
    if (response.error) {
      setError(getErrorMessage(response.error));
      console.log(getErrorMessage(response.error))
      signOutUser();
    } else if (!auth.currentUser.emailVerified) {
      setError('Prašome patvirtinti paštą prieš prisijungiant.');
      signOutUser();
    } else {
      navigate('/content/gallery');
    }
  };

  const handleResetPassword = async () => {
    const response = await resetPassword(email);
    if (response.success) {
      setResetRequested(true);
    } else {
      setError(response.error);
    }
  };

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
              <input type="email" placeholder="El. paštas" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Slaptažodis" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit" className="button-green">Prisijungti</button>
              
              {error === 'Neteisingas slaptažodis' && (
                <p className="userNotFound">
                  {error}. <a onClick={handleResetPassword} >Pamiršote slaptažodį?</a>
                </p>
              )}
              {resetRequested && <p className="passwordReset">Slaptažodžio atstatymo nuoroda <br /> sėkmingai išsiųsta į {email}</p>}
              {error && error !== 'Neteisingas slaptažodis' && <p className="userNotFound">{error}</p>}
              
              <p className="new-user">Neturi paskyros? <Link to="/new-user">Registruotis</Link></p>
            </form>
        </motion.main>
        <Footer/>
    </div>
  )
}

export default LoginPage