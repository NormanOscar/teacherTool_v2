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
    modal.classList.remove('show');
    modalBackdrop.remove();
  }

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg p-4 mb-2 mx-2 border-bottom" style={{backgroundColor: '#ededed'}}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Hämta elev</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/assessment">Bedömning</NavLink>
          </li>
        </ul>
      </nav>
      <button className="mobile-toggler d-lg-none" type="button" data-bs-toggle="modal" data-bs-target="#navbModal">
        <FontAwesomeIcon icon="bars" size='2xl' color='black'/>
      </button>

      <div className="modal fade" id="navbModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog" id='modal-dialog'>
          <div className="modal-content" id='modal-content'>
            <div className="modal-header" id='modal-header'>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>

            <div className="modal-body" id='modal-body'>    
              <div className="modal-line lines">
                <NavLink className="nav-link" onClick={handleClick} to="/">Hämta elev</NavLink>
              </div>
              <hr/>
              <div className="modal-line lines">
                <NavLink className="nav-link" onClick={handleClick} to="/assessment">Bedömning</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};