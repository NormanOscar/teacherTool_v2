// Components/NavBar.js
import { NavLink, Nav, Navbar } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand='sm' className="border-bottom px-2" fixed='top' style={{backgroundColor: '#e5e5e5'}}>
      <Navbar.Toggle aria-controls='navbarScroll' />
      <Navbar.Collapse id='navbarScroll'>
        <Nav className="navbar-nav px-3" activeKey={location.pathname}>
            <NavLink href="/">
              Hämta elev
            </NavLink>
            <NavLink href='/assessment'>
              Bedömning
            </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
