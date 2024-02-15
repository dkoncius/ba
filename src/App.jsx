import "./scss/app.scss"
import LandingPage from './pages/LandingPage/LandingPage';
import NewUserPage from './pages/FormsPages/NewUserPage';
import NewKidPage from './pages/FormsPages/NewKidPage';
import LoginPage from './pages/FormsPages/LoginPage';
import ContentPage from './pages/ContentPage/ContentPage';
import NotesPage from "./pages/ContentPage/NotesPage";
import AudioPage from "./pages/ContentPage/AudioPage";
import KidsPage from "./pages/KidPage/KidsPage";
import EditKidPage from "./pages/KidPage/EditKidPage";
import KidsProgressPage from "./pages/ContentPage/KidsProgressPage";
import ImagePage from "./pages/ContentPage/ImagePage";
import VideoPage from "./pages/ContentPage/VideosPage";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { doc, collection, query, getDocs } from 'firebase/firestore';
import { auth, db } from './firebase/firebase-config';
import { useEffect, useState } from "react";


function App() {
  const [user, setUser] = useState(null);
  const [hasKids, setHasKids] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const hasKidsStatus = await checkIfUserHasKids(user.uid);
        setHasKids(hasKidsStatus);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const checkIfUserHasKids = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const kidsCollection = collection(userDocRef, 'kids');
      const q = query(kidsCollection);
      const querySnapshot = await getDocs(q);
      
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking if user has kids:', error);
      return false;
    }
  }; 

  function ProtectedRouteWrapper({ component: Component, redirectTo, ...props }) {
    if (isLoading) {
        return null; // or return a loading spinner/component
    }

    return (
        user 
            ? (hasKids ? <Component {...props} /> : <Navigate to="/new-kid" replace />)
            : <Navigate to={redirectTo} replace />
    );
}

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage/>}/>
          <Route path='new-user' element={<NewUserPage/>}/>
          <Route path='new-kid' element={<NewKidPage user={user}/>}/>
          <Route path='edit-kid' element={<EditKidPage user={user}/>}/>
          <Route path="login" element={<LoginPage setUser={setUser} />} />
          <Route path='kids' element={<KidsPage user={user}/>}/>
          <Route path='progress' element={<KidsProgressPage/>}/>
          <Route path='content' element={<ContentPage user={user}/>}>
              <Route path="gallery" element={<ImagePage/>}/>
              <Route path="video" element={<VideoPage/>}/>
              <Route path="notes" element={<NotesPage/>}/>
              <Route path="audio" element={<AudioPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
