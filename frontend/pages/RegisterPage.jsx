import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import { register } from '../services/api'; 
import '../src/styles/FormStyles.css';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // --- CONSOLE.LOGS TEMPORALES PARA DEPURACIÓN ---
    console.log("Datos a enviar para registro:");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {

      const registrationData = await register(username, email, password); 
      console.log('Registro exitoso:', registrationData);

      setSuccess(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername(''); 
      setTimeout(() => {
        navigate('/login');
      }, 2000); 

    } catch (err) {
      console.error('Error durante el registro:', err);
      setError(err.message || 'Ocurrió un error inesperado durante el registro.');
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
              <Card.Title className="text-center">🦇Registrarse</Card.Title>

              <Form onSubmit={handleSubmit}>
                {/* Campo de Nombre de Usuario */}
                <Form.Group className="mb-3" controlId="formBasicUsernameRegister">
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

                {/* Campo de Email */}
                <Form.Group className="mb-3" controlId="formBasicEmailRegister">
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

                {/* Campo de Contraseña */}
                <Form.Group className="mb-3" controlId="formBasicPasswordRegister">
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

                {/* Campo de Confirmar Contraseña */}
                <Form.Group className="mb-3" controlId="formBasicConfirmPasswordRegister">
                  <Form.Label>💀 Confirmar Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Repite tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    bg="secondary"
                    text="light"
                  />
                </Form.Group>

                {error && <p className="text-danger">{error}</p>}

                {success && <p className="text-success">¡Registro exitoso! Redirigiendo para iniciar sesión...</p>}


                    <Button type="submit" disabled={loading} className="btn-custom-purple">
                      {loading ? 'Registrando...' : 'Registrarse'}
                    </Button>

                <div className="mt-3 text-center">
                  ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </div>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;