// Components/NavBar.js
import { NavLink, Nav, Navbar } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(true);
    }
    if (localStorage.getItem('userId')) {
      let userId = JSON.parse(localStorage.getItem('userId'));
      let users = JSON.parse(localStorage.getItem('userData'));
      let user = users.find(user => user.id === userId);
      setUser(user);
    }
  }, []);

  return (
    <Navbar collapseOnSelect expand='sm' className="border-bottom px-2" style={{ backgroundColor: '#e5e5e5' }}>
      <Navbar.Toggle aria-controls='navbarScroll' />
      <Navbar.Collapse id='navbarScroll'>
        <Nav className="custom-navbar" activeKey={location.pathname}>
          {login ? (
            <>
              <NavLink href="/">
                Hämta elev
              </NavLink>
              <NavLink href='/assessment'>
                Bedömning
              </NavLink>
              { user && user.role === "admin" && 
                <NavLink href='/admin'>
                  Admin
                </NavLink>
              }
              <NavLink href='/logout'>
                Logga ut
              </NavLink>
            </>
          ) : (
            <NavLink href='/login'>
              Logga in
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
