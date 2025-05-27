// frontend/src/components/HomePage.jsx

import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../src/styles/HomePage.css'; // La ruta es ../styles/HomePage.css (corregí un pequeño error en tu import)
import alterClothesLogo from '../public/logo_01.svg'; // ¡IMPORTA TU LOGO AQUÍ!

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState(null);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const productsData = await getProducts();
        setFeaturedProducts(productsData.slice(0, 3));
        setIsLoadingFeatured(false);
      } catch (err) {
        setErrorFeatured(err);
        setIsLoadingFeatured(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  return (
    <>
      <div className="homepage-hero">
        <Container className="text-center text-light">
          <h1>ALTER CLOTHES</h1>
          <p className="lead mb-4">
            Donde la Sombra Encuentra el Estilo
          </p>
          <Button variant="outline-light" size="lg" as={Link} to="/products">
            Explorar productos!
          </Button>
        </Container>
      </div>

      <section className="py-5 text-dark about-us-section"> {/* Añadí la clase 'about-us-section' aquí */}
        <Container>
          {/* Usamos Row y Col de Bootstrap para el layout */}
          <Row className="justify-content-center align-items-center"> {/* align-items-center para centrar verticalmente */}
            <Col md={12}> {/* Columna para el título, ocupa todo el ancho en md y arriba */}
              <h2 className="text-center mb-4">🦇Sobre Nosotros</h2>
            </Col>
            <Col md={4} className="text-center mb-4 mb-md-0"> {/* Columna para la imagen, ocupa 4 de 12 en md y arriba */}
              {/* Asegúrate de que la ruta de tu logo sea correcta */}
              <img src={alterClothesLogo} alt="Logo de Alter Clothes" className="img-fluid about-us-logo" />
            </Col>
            <Col md={8}> {/* Columna para el texto, ocupa 8 de 12 en md y arriba */}
              <div className="about-us-text-content text-md-start text-center"> {/* Alinea el texto a la izquierda en md, centrado en móviles */}
                <p>
                  ¡Bienvenido a **ALTER CLOTHES**! Somos una empresa apasionada por la moda oscura y alternativa.
                  Nuestra misión es ofrecerte prendas únicas y con estilo que capturen la esencia de tu individualidad
                  y te hagan sentir increíble. Trabajamos con los mejores materiales y diseños vanguardistas
                  para que siempre encuentres algo especial que resuene con tu lado más auténtico.
                  Explora nuestra colección y déjanos ayudarte a expresar tu estilo sin límites.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-white text-dark">
        <Container>
           <h2 className="text-center mb-4">🦇 Los más buscados</h2>

           {isLoadingFeatured && <p className="text-center text-dark">Cargando productos destacados...</p>}
           {errorFeatured && <p className="text-center text-danger">Error al cargar destacados: {errorFeatured.message}</p>}
           {!isLoadingFeatured && !errorFeatured && featuredProducts.length === 0 && (
             <p className="text-center text-dark">No se encontraron productos destacados.</p>
           )}

           <Row xs={1} md={2} lg={3} className="g-4">
             {featuredProducts.map(product => (
               <Col key={product.id} className="mb-4">
                 <Card bg="dark" text="light" className="h-100">
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

                     <Button variant="outline-light" as={Link} to={`/products/${product.id}`}>
                       Ver Producto
                     </Button>
                   </Card.Body>
                 </Card>
               </Col>
             ))}
           </Row>
         </Container>
       </section>
     </>
   );
}

export default HomePage;