import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Analyse from './pages/Analyse.jsx';
import Assessment from './pages/Assessment.jsx';
import Intervention from './pages/Intervention.jsx';
import NavBar from './components/NavBar.jsx';

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intervention" element={<Intervention />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/analyse" element={<Analyse />} />
      </Routes>
    </>
  )
}