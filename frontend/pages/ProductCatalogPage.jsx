import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function ProductCatalogPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (isLoading) {
    return <Container className="mt-4"><p>Cargando productos...</p></Container>;
  }

  if (error) {
    return <Container className="mt-4"><p>Error al cargar los productos: {error.message}</p></Container>;
  }

  if (products.length === 0) {
    return <Container className="mt-4"><h1>Catálogo de Productos</h1><p>No se encontraron productos.</p></Container>;
  }

  return (
    <Container className="mt-4">
      <h1>🦇 Catálogo de Productos </h1>

      <Row xs={12} sm={6} md={4} className="g-4">
        {products.map(product => (
          <Col key={product.id} className="mb-4">
            <Card bg="dark" text="light" className="gothic-card h-100">
              {product.b64Image && (
                 <Card.Img
                    variant="top"
                    src={product.b64Image}
                    alt={product.name}
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                 />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {product.description}
                </Card.Text>
                <Card.Text>
                  Precio: ${product.price ? product.price.toFixed(2) : 'N/A'}
                </Card.Text>
                <Button variant="outline-light" onClick={() => console.log('Agregar', product.id)}>
                  Agregar al Carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductCatalogPage;
