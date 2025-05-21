import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../src/styles/FormStyles.css';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    console.log('Intentando registrar usuario con:', { email, password });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Registro exitoso (simulado)');
      setSuccess(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');

    } catch (err) {
      setError('Ocurrió un error durante el registro (simulado)');
      console.error('Error de registro:', err);
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

                {success && <p className="text-success">¡Registro exitoso! Ahora puedes <Link to="/login">iniciar sesión</Link>.</p>}

                <Button variant="primary" type="submit" disabled={loading}>
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
