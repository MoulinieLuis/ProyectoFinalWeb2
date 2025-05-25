
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api'; 
import '../src/styles/FormStyles.css';

function LoginPage() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // --- CONSOLE.LOGS TEMPORALES PARA DEPURACIÓN ---
    console.log("Datos a enviar para login:");
    console.log("Username:", username);
    console.log("Password:", password);


    setLoading(true);
    setError(null);
    setSuccess(false);

    try {

      const loginData = await login(username, password); 
      console.log('Inicio de sesión exitoso:', loginData);

      setSuccess(true);
      setUsername(''); 
      setPassword(''); 


      setTimeout(() => {
        navigate('/products'); 
      }, 1500);

    } catch (err) {
      console.error('Error durante el login:', err);
      setError(err.message || 'Ocurrió un error inesperado durante el inicio de sesión.');
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
              <Card.Title className="text-center">¡Bienvenido de nuevo! 🦇</Card.Title>

              <Form onSubmit={handleSubmit}>
                {/* Campo de Nombre de Usuario */}
                <Form.Group className="mb-3" controlId="formBasicUsernameLogin">
                  <Form.Label>💀 Nombre de Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    bg="secondary"
                    text="light"
                  />
                </Form.Group>

                {/* Campo de Contraseña */}
                <Form.Group className="mb-3" controlId="formBasicPasswordLogin">
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


                {success && <p className="text-success">¡Inicio de sesión exitoso! Redirigiendo...</p>}


                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
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