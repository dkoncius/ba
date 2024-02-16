import "./scss/app.scss"
import LandingPage from './pages/LandingPage/LandingPage';
import NewUserPage from './pages/FormsPages/NewUserPage';
import NewKidPage from './pages/FormsPages/NewKidPage';
import LoginPage from './pages/FormsPages/LoginPage';
import ContentPage from './pages/ContentPage/ContentPage';
import NotesPage from "./pages/ContentPage/NotesPage";
import AudioPage from "./pages/ContentPage/AudioPage";
import KidsPage from "./pages/KidsPage/KidsPage";
import EditKidPage from "./pages/KidsPage/EditKidPage";
import KidsProgressPage from "./pages/ContentPage/KidsProgressPage";
import ImagesPage from "./pages/ContentPage/ImagesPage";
import VideosPage from "./pages/ContentPage/VideosPage";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { doc, collection, query, getDocs, getFirestore, limit } from 'firebase/firestore';
import { auth, db } from './firebase/firebase-config'
import { getAuth } from 'firebase/auth';;
import { useEffect, useState } from "react";
import UserContext from "./contexts/UserContext";
import KidsContext from "./contexts/KidsContext";


function App() {
  const [user, setUser] = useState(null);
  const [kidsData, setKidsData] = useState([]);
  const [selectedKidData, setSelectedKidData] = useState(null);
  const [hasKids, setHasKids] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  // Load kids to context
  useEffect(() => {
    const fetchKids = async () => {
      try {
        if (!user) {
          return;
        }

        const db = getFirestore();
        const kidsRef = collection(doc(db, 'users', user.uid), 'kids'); // We'll use the provided 'user' prop directly here.
        const kidsQuery = query(kidsRef);
        const kidDocs = await getDocs(kidsQuery);

        const kidsData = kidDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setKidsData(kidsData);
      } catch (error) {
        console.error('Error fetching kids:', error);
        setError('Failed to fetch kids data, please try again later.');
      }
    };

    fetchKids();
  }, [user]);


  // Check if user has kids
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


  // Load first or selected kid
  const fetchFirstKid = async () => {
    try {
      if (!user) return;
      const db = getFirestore();
      const currentUser = getAuth().currentUser;
      const userRef = doc(db, 'users', currentUser.uid);
      const kidsRef = collection(userRef, 'kids');
      const kidsQuery = query(kidsRef, limit(1));
      const kidDocs = await getDocs(kidsQuery);

      if (!kidDocs.empty) {
        const firstKidData = { id: kidDocs.docs[0].id, ...kidDocs.docs[0].data() };
        setSelectedKidData(firstKidData);
        // fetchMemories(firstKidData.id);
      } else {
        console.log('No kids data found');
      }
    } catch (error) {
      console.error('Error fetching first kid: ', error);
    }
  };

  const handleSelectKid = (kid) => {
    localStorage.setItem('selectedKidId', kid.id);
    setSelectedKidData(kid);
  };

  useEffect(() => {
    const init = async () => {
      const savedKidId = localStorage.getItem('selectedKidId');
      if(savedKidId) {
        await fetchKidById(savedKidId);
      } else if(user) {
        await fetchFirstKid();
      }
    };
  
    init();
  }, [user]); // Removed selectedKidData from dependencies

//   function ProtectedRouteWrapper({ component: Component, redirectTo, ...props }) {
//     if (isLoading) {
//         return null; // or return a loading spinner/component
//     }

//     return (
//         user 
//             ? (hasKids ? <Component {...props} /> : <Navigate to="/new-kid" replace />)
//             : <Navigate to={redirectTo} replace />
//     );
// }

  return (
    <>
    <UserContext.Provider  value={{user, setUser}}>
      <KidsContext.Provider value={{kidsData, setKidsData}}>
          <BrowserRouter>
            <Routes>
              <Route index element={<LandingPage/>}/>
              <Route path='new-user' element={<NewUserPage/>}/>
              <Route path='new-kid' element={<NewKidPage/>}/>
              <Route path='kids/:kidId/edit-kid' element={<EditKidPage/>}/>
              <Route path="login" element={<LoginPage/>} />
              <Route path='kids' element={<KidsPage/>}/>
              <Route path='progress' element={<KidsProgressPage/>}/>
              <Route path='/:kidId/content' element={<ContentPage/>}>
                  <Route path="images" element={<ImagesPage/>}/>
                  <Route path="videos" element={<VideosPage/>}/>
                  <Route path="notes" element={<NotesPage/>}/>
                  <Route path="recordings" element={<AudioPage/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
      </KidsContext.Provider>
    </UserContext.Provider>
    </>
  )
}

export default App
