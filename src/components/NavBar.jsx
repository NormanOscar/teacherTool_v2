// Components/NavBar.js
import { Nav, Navbar } from 'react-bootstrap';

export default function NavBar () {

  return (
    <Navbar collapseOnSelect expand='sm' className="border-bottom px-2" style={{backgroundColor: '#e5e5e5'}}>
      <Navbar.Toggle aria-controls='navbarScroll'></Navbar.Toggle>
      <Navbar.Collapse id='navbarScroll'>
        <Nav className="navbar-nav p-3" activeKey={location.pathname}>
          <Nav.Link href="/">Hämta elev</Nav.Link>
          <Nav.Link href="/assessment">Bedömning</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};