import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import NewUser from './pages/NewUser';
import NewKid from './pages/NewKid';
import Login from './pages/Login';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/new-user' element={<NewUser/>}/>
          <Route path='/new-kid' element={<NewKid/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
