import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { getProductById } from '../services/api'; 
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';

function ProductDetailPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }

    if (id) { 
      fetchProduct();
    } else {
      setError(new Error("ID de producto no proporcionado en la URL."));
      setIsLoading(false);
    }
  }, [id]); 

  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="light" />
        <p className="text-light mt-2">Cargando detalles del producto...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 text-center">
        <p className="text-danger">Error: {error.message}</p>
        <Button variant="outline-light" onClick={() => window.history.back()}>Volver</Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="mt-5 text-center">
        <p className="text-light">Producto no encontrado.</p>
        <Button variant="outline-light" onClick={() => window.history.back()}>Volver</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card bg="dark" text="light" className="gothic-card">
            {product.b64Image && (
              <Card.Img
                variant="top"
                src={product.b64Image}
                alt={product.name}
                style={{ maxHeight: '400px', objectFit: 'contain', padding: '15px' }} 
              />
            )}
            <Card.Body>
              <Card.Title className="text-center mb-3">
                <h2>{product.name}</h2>
              </Card.Title>
              <Card.Text>
                <strong>Descripción:</strong> {product.description}
              </Card.Text>
              <Card.Text>
                <strong>Modelo:</strong> {product.model}
              </Card.Text>
              <Card.Text>
                <strong>Color:</strong> {product.color}
                {product.hexColor && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      backgroundColor: product.hexColor,
                      marginLeft: '10px',
                      border: '1px solid #555'
                    }}
                  ></span>
                )}
              </Card.Text>
              <Card.Text>
                <strong>Propiedades:</strong> {product.properties || 'N/A'}
              </Card.Text>
              <Card.Text className="h4 text-end">
                <strong>Precio:</strong> ${product.price ? product.price.toFixed(2) : 'N/A'}
              </Card.Text>
              <div className="d-grid gap-2 mt-4">
                <Button variant="outline-light" size="lg" onClick={() => console.log('Añadir a carrito:', product.id)}>
                  Añadir al Carrito
                </Button>
                <Button variant="secondary" onClick={() => window.history.back()}>
                  Volver al Catálogo
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailPage;
