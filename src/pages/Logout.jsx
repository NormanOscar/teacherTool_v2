import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

export default function Logout() {
  useEffect(() => {
    localStorage.removeItem('login');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }, []);

  return (
    <Container fluid>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <h1>Loggar ut...</h1>
      </div>
    </Container>
  );
}