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

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { collection, doc, query, getDocs } from "firebase/firestore";
import { auth, db} from './firebase/firebase-config'
import { useContext, useEffect, useState } from "react";
import UserContext from "./contexts/UserContext";
import KidsContext from "./contexts/KidsContext";
import PolicyPage from "./pages/PrivacyPage/PolicyPage";


function App() {
  const [user, setUser] = useState(null);
  const [kidsData, setKidsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(''); // Define an error state


  // Load kids to context
  useEffect(() => {
    const fetchKids = async () => {
      try {
        if (!user) {
          return;
        }

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


  useEffect(() => {
    // Firebase auth state change listener
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const ProtectedRouteWrapper = ({ redirectTo }) => {
    const { user, isLoading } = useContext(UserContext);

    if (isLoading) {
      return <div className="loader"></div>; // Show loading indicator
    }

    if (!user) {
      return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      <KidsContext.Provider value={{ kidsData, setKidsData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/new-user" element={<NewUserPage />} />
            <Route path="/new-kid" element={<NewKidPage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/" element={<LandingPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRouteWrapper redirectTo="/" />}>
              <Route path="/kids" element={<KidsPage />} />
              <Route path="/kids/:kidId/edit-kid" element={<EditKidPage />} />
              <Route path="/:kidId/progress" element={<KidsProgressPage />} />
              <Route path="/:kidId/content" element={<ContentPage />}>
                <Route path="images" element={<ImagesPage />} />
                <Route path="videos" element={<VideosPage />} />
                <Route path="notes" element={<NotesPage />} />
                <Route path="recordings" element={<AudioPage />} />
              </Route>
            </Route>

            {/* Redirect any non-matching route to the landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </KidsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;