import "./scss/app.scss"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NewUserPage from './pages/NewUserPage';
import NewKidPage from './pages/NewKidPage';
import LoginPage from './pages/LoginPage';
import ContentPage from './pages/ContentPage';
import GalleryPage from "./components/ContentPage/NestedPages/GalleryPage";
import VideosPage from "./components/ContentPage/NestedPages/VideosPage";
import DocumentsPage from "./components/ContentPage/NestedPages/DocumentsPage";
import AudioPage from "./components/ContentPage/NestedPages/AudioPage";
import KidsPage from "./pages/KidsPage";
import EditKidPage from "./pages/EditKidPage";
import KidsProgressPage from "./pages/KidsProgressPage";

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
              <Route path="document" element={<DocumentsPage/>}/>
              <Route path="audio" element={<AudioPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
