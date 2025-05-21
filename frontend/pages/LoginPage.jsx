import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../src/styles/FormStyles.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    console.log('Intentando iniciar sesión con:', { email, password });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === 'test@test.com' && password === 'password') {
        console.log('Login exitoso (simulado)');
      } else {
        setError('Usuario o contraseña incorrectos (simulado)');
      }
    } catch (err) {
      setError('Ocurrió un error durante el login (simulado)');
      console.error('Error de login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card bg="dark" text="light">
            <Card.Body>
              <Card.Title className="text-center">🦇Iniciar Sesión</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>💀 Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    bg="secondary"
                    text="light"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>💀 Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    bg="secondary"
                    text="light"
                  />
                </Form.Group>

                {error && <p className="text-danger">{error}</p>}

                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Iniciando...' : 'Login'}
                </Button>

                <div className="mt-3 text-center">
                  ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
