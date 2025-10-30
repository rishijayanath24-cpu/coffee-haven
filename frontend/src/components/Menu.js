import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

function Menu({ addToCart }) {
  const [menuItems] = useState([
    {
      id: 1,
      name: 'Espresso',
      price: 149,
      description: 'Rich and bold Italian espresso',
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop',
      category: 'Coffee'
    },
    {
      id: 2,
      name: 'Cappuccino',
      price: 199,
      description: 'Classic cappuccino with velvety foam',
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
      category: 'Coffee'
    },
    {
      id: 3,
      name: 'Caramel Latte',
      price: 229,
      description: 'Smooth latte with sweet caramel drizzle',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
      category: 'Coffee'
    },
    {
      id: 4,
      name: 'Mocha',
      price: 249,
      description: 'Coffee with rich chocolate and whipped cream',
      image: 'https://images.unsplash.com/photo-1607260550778-aa9d29444ce1?w=400&h=300&fit=crop',
      category: 'Coffee'
    },
    {
      id: 5,
      name: 'Croissant',
      price: 129,
      description: 'Buttery, flaky French pastry',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
      category: 'Pastries'
    },
    {
      id: 6,
      name: 'Blueberry Muffin',
      price: 149,
      description: 'Fresh baked muffin with blueberries',
      image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=300&fit=crop',
      category: 'Pastries'
    },
    {
      id: 7,
      name: 'Chocolate Cake',
      price: 279,
      description: 'Decadent chocolate layer cake',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      category: 'Desserts'
    },
    {
      id: 8,
      name: 'Cheesecake',
      price: 299,
      description: 'Creamy New York style cheesecake',
      image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&h=300&fit=crop',
      category: 'Desserts'
    },
    {
      id: 9,
      name: 'Iced Coffee',
      price: 179,
      description: 'Refreshing cold brew coffee',
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop',
      category: 'Cold Drinks'
    },
    {
      id: 10,
      name: 'Fruit Smoothie',
      price: 249,
      description: 'Fresh fruit smoothie blend',
      image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
      category: 'Cold Drinks'
    },
    {
      id: 11,
      name: 'Bagel & Cream Cheese',
      price: 179,
      description: 'Toasted bagel with cream cheese',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
      category: 'Breakfast'
    },
    {
      id: 12,
      name: 'Avocado Toast',
      price: 329,
      description: 'Artisan bread with fresh avocado',
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
      category: 'Breakfast'
    }
  ]);

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <Container className="py-5">
      <h1 className="section-title">Our Menu</h1>

      <div className="text-center mb-5">
        {categories.map(category => (
          <Button
            key={category}
            className={selectedCategory === category ? 'btn-cafe mx-2 mb-2' : 'btn-outline-cafe mx-2 mb-2'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <Row className="g-4">
        {filteredItems.map(item => (
          <Col key={item.id} md={6} lg={4}>
            <Card className="menu-card h-100">
              <Card.Img variant="top" src={item.image} alt={item.name} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="card-title">{item.name}</Card.Title>
                <Card.Text className="card-text">{item.description}</Card.Text>
                <div className="mt-auto">
                  <div className="price">₹{item.price}</div>
                  <Button
                    className="btn-cafe w-100"
                    onClick={() => addToCart(item)}
                  >
                    <FaPlus className="me-2" />
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Menu;
