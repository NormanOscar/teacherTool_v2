// App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Assessment from './pages/Assessment.jsx';
import NavBar from './components/NavBar.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import Admin from './pages/Admin.jsx';
import Logout from './pages/Logout.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/logout' element={<Logout />}/>
      </Routes>
    </BrowserRouter>
  );
}
