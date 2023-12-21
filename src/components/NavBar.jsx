// Import necessary modules
import { NavLink, Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

library.add(faUser);

// Define the NavBar component
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
      let user = users.find((user) => user.id === userId);
      setUser(user);
    }
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand='sm'
      className='border-bottom px-2'
      style={{ backgroundColor: '#e5e5e5' }}
    >
      <Navbar.Brand href='/' className='m-0'>
        <Container className='text-center'>
          <img alt='icon' src='/assets/learningIcon.png' width='30' height='30' />
        </Container>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='navbarScroll' />
      <Navbar.Collapse id='navbarScroll'>
        <Nav className='custom-navbar' activeKey={location.pathname}>
          {login ? (
            <>
              <NavLink href='/' className='text-center mr-auto'>
                Hämta elev
              </NavLink>
              <NavLink href='/assessment' className='text-center mr-auto'>
                Bedömning
              </NavLink>
              <NavDropdown title={<FontAwesomeIcon icon={faUser} size="lg" />} id="collapsible-nav-dropdown" className='text-center ml-auto'>
                <NavDropdown.Item href="/profile" className='text-center'>
                  Profil
                </NavDropdown.Item>
                {user && user.role === 'admin' && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='/admin' className='text-center'>
                      Admin
                    </NavDropdown.Item>
                  </>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout" className='text-center'>
                  Logga ut
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <NavLink href='/login' className='text-center'>
              Logga in
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
