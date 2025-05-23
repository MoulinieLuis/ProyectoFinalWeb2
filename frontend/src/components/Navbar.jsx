import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src="../public/logo_01.svg" width="100" height="100" className="d-inline-block align-top me-2" alt="Alter Clothes Logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Catálogo
            </Nav.Link>
          </Nav>

          <Nav>
            <Button
              variant="outline-light"
              as={Link}
              to="/login"
              className="me-2"
            >
              Iniciar Sesión
            </Button>
            <Button
              variant="primary"
              as={Link}
              to="/register"
            >
              Registrarse
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
