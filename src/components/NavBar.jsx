// Components/NavBar.js
import { NavLink } from 'react-router-dom';

const NavBar = () => {
 return (
  <nav className="navbar navbar-expand-lg p-4 m-2">
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">Hämta elev</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/intervention">Intervention</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/assessment">Bedömning</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/analyse">Analys</NavLink>
      </li>
    </ul>
  </nav>
 );
};

export default NavBar;