import React from 'react';
import { Container } from 'react-bootstrap';
import { FaCoffee, FaMugHot, FaCookie, FaBirthdayCake } from 'react-icons/fa';

function MenuCard() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2C1810 0%, #1A0F0A 100%)',
      padding: '6rem 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background coffee beans pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4B896' fill-opacity='0.05'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.3
      }}></div>

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          background: 'linear-gradient(135deg, #1A0F0A 0%, #0D0705 100%)',
          borderRadius: '30px',
          padding: '4rem',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
          border: '3px solid #D4B896',
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Decorative coffee beans */}
          <FaCoffee style={{ position: 'absolute', top: '30px', left: '30px', color: '#D4B896', opacity: 0.3, fontSize: '2rem' }} />
          <FaCoffee style={{ position: 'absolute', top: '50px', right: '40px', color: '#D4B896', opacity: 0.3, fontSize: '1.5rem' }} />
          <FaCoffee style={{ position: 'absolute', bottom: '40px', left: '50px', color: '#D4B896', opacity: 0.3, fontSize: '1.8rem' }} />
          <FaCoffee style={{ position: 'absolute', bottom: '30px', right: '30px', color: '#D4B896', opacity: 0.3, fontSize: '2rem' }} />
          <FaMugHot style={{ position: 'absolute', top: '100px', right: '30px', color: '#D4B896', opacity: 0.2, fontSize: '1.5rem' }} />

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '2px dotted #D4B896', paddingBottom: '2rem' }}>
            <div style={{ fontSize: '1rem', color: '#D4B896', letterSpacing: '3px', marginBottom: '1rem' }}>☕ COFFEE SHOP ☕</div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '4rem',
              color: '#F5E6D3',
              marginBottom: '0.5rem',
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
              letterSpacing: '8px',
              border: '3px solid #D4B896',
              padding: '1rem 2rem',
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(212, 184, 150, 0.1) 0%, transparent 100%)'
            }}>
              MENU
            </h1>
          </div>

          {/* Menu Sections */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
            {/* Hot Coffee */}
            <div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.8rem',
                color: '#D4B896',
                marginBottom: '1.5rem',
                borderBottom: '2px solid #D4B896',
                paddingBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaCoffee /> HOT COFFEE
              </h3>
              <MenuItems items={[
                { name: 'Espresso', price: '₹149' },
                { name: 'Cappuccino', price: '₹199' },
                { name: 'Caramel Latte', price: '₹229' },
                { name: 'Mocha', price: '₹249' }
              ]} />
            </div>

            {/* Cold Coffee */}
            <div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.8rem',
                color: '#D4B896',
                marginBottom: '1.5rem',
                borderBottom: '2px solid #D4B896',
                paddingBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaMugHot /> ICE COFFEE
              </h3>
              <MenuItems items={[
                { name: 'Iced Coffee', price: '₹179' },
                { name: 'Fruit Smoothie', price: '₹249' },
                { name: 'Cold Brew', price: '₹199' },
                { name: 'Iced Latte', price: '₹219' }
              ]} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            {/* Pastries */}
            <div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.8rem',
                color: '#D4B896',
                marginBottom: '1.5rem',
                borderBottom: '2px solid #D4B896',
                paddingBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaCookie /> PASTRIES
              </h3>
              <MenuItems items={[
                { name: 'Croissant', price: '₹129' },
                { name: 'Blueberry Muffin', price: '₹149' },
                { name: 'Bagel & Cream Cheese', price: '₹179' },
                { name: 'Avocado Toast', price: '₹329' }
              ]} />
            </div>

            {/* Desserts */}
            <div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.8rem',
                color: '#D4B896',
                marginBottom: '1.5rem',
                borderBottom: '2px solid #D4B896',
                paddingBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaBirthdayCake /> DESSERTS
              </h3>
              <MenuItems items={[
                { name: 'Chocolate Cake', price: '₹279' },
                { name: 'Cheesecake', price: '₹299' },
                { name: 'Tiramisu', price: '₹329' },
                { name: 'Brownie', price: '₹199' }
              ]} />
            </div>
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '2px dotted #D4B896'
          }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.8rem',
              color: '#F5E6D3',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '0',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              ☕ COFFEE MAKES LIFE BETTER ☕
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

function MenuItems({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px dotted rgba(212, 184, 150, 0.3)'
          }}
        >
          <span style={{
            color: '#F5E6D3',
            fontSize: '1.1rem',
            fontFamily: "'Poppins', sans-serif"
          }}>
            {item.name}
          </span>
          <span style={{
            color: '#D4B896',
            fontSize: '1.2rem',
            fontWeight: '600',
            fontFamily: "'Playfair Display', serif"
          }}>
            {item.price}
          </span>
        </div>
      ))}
    </div>
  );
}

export default MenuCard;
