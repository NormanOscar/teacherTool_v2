// Components/NavBar.js
import { NavLink } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faX);

export default function NavBar () {
  function handleClick() {
    const modal = document.querySelector('#navbModal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    modal.style.display = 'none';
    modalBackdrop.style.display = 'none';
    modal.classList.remove('show');
    modalBackdrop.classList.remove('show');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg p-4 mb-2 mx-2">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Hämta elev</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/assessment">Bedömning</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/analyse">Analys</NavLink>
          </li>
        </ul>
      </nav>
      <button className="mobile-toggler d-lg-none" type="button" data-bs-toggle="modal" data-bs-target="#navbModal">
        <FontAwesomeIcon icon="bars" size='2xl'/>
      </button>

      <div className="modal fade" id="navbModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>

            <div className="modal-body">    
              <div className="modal-line">
                <NavLink className="nav-link" onClick={handleClick} to="/">Hämta elev</NavLink>
              </div>

              <div className="modal-line">
                <NavLink className="nav-link" onClick={handleClick} to="/assessment">Bedömning</NavLink>
              </div>

              <div className="modal-line">
                <NavLink className="nav-link" onClick={handleClick} to="/analyse">Analys</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};