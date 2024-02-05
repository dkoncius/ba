import "./scss/app.scss"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import NewUserPage from './pages/FormsPages/NewUserPage';
import NewKidPage from './pages/FormsPages/NewKidPage';
import LoginPage from './pages/FormsPages/LoginPage';
import ContentPage from './pages/ContentPage/ContentPage';
import GalleryPage from "./pages/ContentPage/GalleryPage";
import VideosPage from "./pages/ContentPage/VideosPage";
import NotesPage from "./pages/ContentPage/NotesPage";
import AudioPage from "./pages/ContentPage/AudioPage";
import KidsPage from "./pages/KidPage/KidsPage";
import EditKidPage from "./pages/KidPage/EditKidPage";
import KidsProgressPage from "./pages/ContentPage/KidsProgressPage";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage/>}/>
          <Route path='new-user' element={<NewUserPage/>}/>
          <Route path='new-kid' element={<NewKidPage/>}/>
          <Route path=':id/edit-kid' element={<EditKidPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='kids' element={<KidsPage/>}/>
          <Route path='progress' element={<KidsProgressPage/>}/>
          <Route path='content' element={<ContentPage/>}>
              <Route path="gallery" element={<GalleryPage/>}/>
              <Route path="video" element={<VideosPage/>}/>
              <Route path="notes" element={<NotesPage/>}/>
              <Route path="audio" element={<AudioPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
