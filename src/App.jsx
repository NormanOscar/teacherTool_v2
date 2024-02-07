// App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Student from './pages/Student.jsx';
import Analyse from './pages/Analyse.jsx';
import NavBar from './components/NavBar.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import Admin from './pages/Admin.jsx';
import Logout from './pages/Logout.jsx';
import FinalAssessment from './pages/FinalAssessment.jsx';
import "./style/styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path='/analyse' element={<Analyse />}/>
        <Route path='/finalAssessment' element={<FinalAssessment />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/logout' element={<Logout />}/>
      </Routes>
    </BrowserRouter>
  );
}
