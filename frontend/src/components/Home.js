import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCoffee, FaHeart, FaStar, FaClock, FaShoppingCart } from 'react-icons/fa';

function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ cursor: 'none' }}>
      {/* Custom Coffee Bean Cursor */}
      <div style={{
        position: 'fixed',
        left: cursorPosition.x,
        top: cursorPosition.y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'transform 0.05s ease-out'
      }}>
        <div style={{
          width: '32px',
          height: '44px',
          background: 'linear-gradient(145deg, #8B6F47 0%, #6B4E31 25%, #3D2817 50%, #2A1810 75%, #1A0F0A 100%)',
          borderRadius: '48% 52% 48% 52% / 62% 58% 42% 38%',
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.4),
            0 4px 8px rgba(0, 0, 0, 0.3),
            0 6px 12px rgba(0, 0, 0, 0.2),
            inset -3px -3px 6px rgba(0, 0, 0, 0.5),
            inset 2px 2px 4px rgba(139, 111, 71, 0.3)
          `,
          position: 'relative',
          animation: 'rotateCursor 4s infinite linear',
          filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.4))'
        }}>
          {/* Center crease */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '4px',
            height: '26px',
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1))',
            borderRadius: '2px',
            boxShadow: 'inset 0 0 2px rgba(0, 0, 0, 0.8), inset 1px 0 1px rgba(0, 0, 0, 0.5)'
          }}></div>
          {/* Highlight on top */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '25%',
            width: '10px',
            height: '8px',
            background: 'radial-gradient(circle, rgba(180, 140, 90, 0.4), transparent)',
            borderRadius: '50%',
            filter: 'blur(1px)'
          }}></div>
          {/* Secondary highlight */}
          <div style={{
            position: 'absolute',
            top: '60%',
            right: '25%',
            width: '6px',
            height: '6px',
            background: 'radial-gradient(circle, rgba(139, 111, 71, 0.3), transparent)',
            borderRadius: '50%',
            filter: 'blur(1px)'
          }}></div>
        </div>
      </div>

      <section className="hero-section" style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #2C1810 0%, #1A0F0A 50%, #0D0705 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Dark overlay with opacity */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1
        }}></div>

        <Container style={{ position: 'relative', zIndex: 3 }}>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '4.5rem',
                fontWeight: '700',
                color: '#F5E6D3',
                marginBottom: '1.5rem',
                lineHeight: '1.2',
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
                animation: 'fadeInDown 1s ease'
              }}>
                Discover The Art Of Perfect Coffee
              </h1>
              <p style={{
                fontSize: '1.3rem',
                color: '#D4B896',
                marginBottom: '2rem',
                lineHeight: '1.8',
                animation: 'fadeInUp 1s ease 0.3s backwards'
              }}>
                Experience the rich and bold flavors of our exquisite coffee blends, crafted by masters. Your perfect cup is waiting for you.
              </p>
              <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                animation: 'fadeInUp 1s ease 0.5s backwards'
              }}>
                <Link to="/order">
                  <Button style={{
                    background: 'linear-gradient(135deg, #D4B896 0%, #A0826D 100%)',
                    border: 'none',
                    color: '#1A0F0A',
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    boxShadow: '0 5px 20px rgba(212, 184, 150, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 8px 30px rgba(212, 184, 150, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 5px 20px rgba(212, 184, 150, 0.4)';
                  }}
                  >
                    Order Now
                  </Button>
                </Link>
                <Link to="/menu">
                  <Button style={{
                    background: 'transparent',
                    border: '2px solid #D4B896',
                    color: '#D4B896',
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(212, 184, 150, 0.1)';
                    e.target.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
                  >
                    Explore Menu
                  </Button>
                </Link>
              </div>

              {/* Statistics with icons */}
              <Row className="mt-5 g-4">
                <Col xs={4}>
                  <div style={{
                    textAlign: 'center',
                    animation: 'fadeInUp 1s ease 0.7s backwards'
                  }}>
                    <div style={{
                      fontSize: '2.5rem',
                      fontWeight: '700',
                      color: '#D4B896',
                      fontFamily: "'Playfair Display', serif"
                    }}>500+</div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#A0826D',
                      marginTop: '0.5rem'
                    }}>Premium Blends</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div style={{
                    textAlign: 'center',
                    animation: 'fadeInUp 1s ease 0.9s backwards'
                  }}>
                    <div style={{
                      fontSize: '2.5rem',
                      fontWeight: '700',
                      color: '#D4B896',
                      fontFamily: "'Playfair Display', serif"
                    }}>20+</div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#A0826D',
                      marginTop: '0.5rem'
                    }}>Years Experience</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div style={{
                    textAlign: 'center',
                    animation: 'fadeInUp 1s ease 1.1s backwards'
                  }}>
                    <div style={{
                      fontSize: '2.5rem',
                      fontWeight: '700',
                      color: '#D4B896',
                      fontFamily: "'Playfair Display', serif"
                    }}>25K+</div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#A0826D',
                      marginTop: '0.5rem'
                    }}>Happy Customers</div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={6} className="text-center">
              <div style={{
                position: 'relative',
                animation: 'fadeInRight 1s ease 0.5s backwards'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop"
                  alt="Coffee Haven"
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    borderRadius: '30px',
                    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)',
                    border: '8px solid rgba(212, 184, 150, 0.2)'
                  }}
                />
              </div>
            </Col>
          </Row>

          {/* Order Now Section in Banner */}
          <Row className="mt-5 pt-5">
            <Col xs={12}>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2.5rem',
                  color: '#F5E6D3',
                  marginBottom: '0.5rem',
                  fontWeight: '700'
                }}>
                  <FaShoppingCart style={{ marginRight: '1rem' }} />
                  Order Now
                </h2>
                <p style={{ fontSize: '1.1rem', color: '#D4B896' }}>
                  Choose your favorite items and get them delivered to your doorstep
                </p>
              </div>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4}>
              <Card style={{
                background: 'linear-gradient(135deg, rgba(212, 184, 150, 0.15) 0%, rgba(160, 130, 109, 0.15) 100%)',
                border: '2px solid #D4B896',
                borderRadius: '20px',
                padding: '2rem',
                transition: 'all 0.3s ease',
                cursor: 'none',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 184, 150, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ textAlign: 'center' }}>
                  <FaCoffee size={50} color="#D4B896" style={{ marginBottom: '1.2rem' }} />
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#F5E6D3',
                    fontSize: '1.6rem',
                    marginBottom: '0.8rem'
                  }}>
                    Hot Beverages
                  </h3>
                  <p style={{ color: '#D4B896', fontSize: '1rem', marginBottom: '1.2rem' }}>
                    Espresso, Cappuccino, Latte & more
                  </p>
                  <Link to="/order">
                    <Button style={{
                      background: 'linear-gradient(135deg, #D4B896 0%, #A0826D 100%)',
                      border: 'none',
                      color: '#1A0F0A',
                      padding: '0.7rem 1.8rem',
                      borderRadius: '50px',
                      fontWeight: '600',
                      width: '100%'
                    }}>
                      Order Hot Coffee
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>

            <Col md={4}>
              <Card style={{
                background: 'linear-gradient(135deg, rgba(212, 184, 150, 0.15) 0%, rgba(160, 130, 109, 0.15) 100%)',
                border: '2px solid #D4B896',
                borderRadius: '20px',
                padding: '2rem',
                transition: 'all 0.3s ease',
                cursor: 'none',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 184, 150, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1.2rem' }}>🥐</div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#F5E6D3',
                    fontSize: '1.6rem',
                    marginBottom: '0.8rem'
                  }}>
                    Fresh Pastries
                  </h3>
                  <p style={{ color: '#D4B896', fontSize: '1rem', marginBottom: '1.2rem' }}>
                    Croissants, Muffins, Bagels & more
                  </p>
                  <Link to="/order">
                    <Button style={{
                      background: 'linear-gradient(135deg, #D4B896 0%, #A0826D 100%)',
                      border: 'none',
                      color: '#1A0F0A',
                      padding: '0.7rem 1.8rem',
                      borderRadius: '50px',
                      fontWeight: '600',
                      width: '100%'
                    }}>
                      Order Pastries
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>

            <Col md={4}>
              <Card style={{
                background: 'linear-gradient(135deg, rgba(212, 184, 150, 0.15) 0%, rgba(160, 130, 109, 0.15) 100%)',
                border: '2px solid #D4B896',
                borderRadius: '20px',
                padding: '2rem',
                transition: 'all 0.3s ease',
                cursor: 'none',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 184, 150, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1.2rem' }}>🍰</div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#F5E6D3',
                    fontSize: '1.6rem',
                    marginBottom: '0.8rem'
                  }}>
                    Desserts
                  </h3>
                  <p style={{ color: '#D4B896', fontSize: '1rem', marginBottom: '1.2rem' }}>
                    Cakes, Tiramisu, Brownies & more
                  </p>
                  <Link to="/order">
                    <Button style={{
                      background: 'linear-gradient(135deg, #D4B896 0%, #A0826D 100%)',
                      border: 'none',
                      color: '#1A0F0A',
                      padding: '0.7rem 1.8rem',
                      borderRadius: '50px',
                      fontWeight: '600',
                      width: '100%'
                    }}>
                      Order Desserts
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        <h2 className="section-title">Why Choose Us?</h2>
        <Row className="g-4">
          <Col md={4}>
            <div className="menu-card text-center p-3" style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '15px', marginBottom: '1rem' }}>
                <img
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop"
                  alt="Premium Coffee"
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.1) rotate(2deg)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
                />
              </div>
              <h3 className="card-title">Premium Coffee</h3>
              <p className="card-text">
                Hand-selected beans from the finest plantations, roasted to perfection
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="menu-card text-center p-3" style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '15px', marginBottom: '1rem' }}>
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop"
                  alt="Fresh Pastries"
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.1) rotate(-2deg)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
                />
              </div>
              <h3 className="card-title">Fresh Pastries</h3>
              <p className="card-text">
                Baked daily with love and the finest ingredients for your delight
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="menu-card text-center p-3" style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '15px', marginBottom: '1rem' }}>
                <img
                  src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
                  alt="Sweet Treats"
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.1) rotate(2deg)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
                />
              </div>
              <h3 className="card-title">Sweet Treats</h3>
              <p className="card-text">
                Indulge in our signature desserts and specialty beverages
              </p>
            </div>
          </Col>
        </Row>

        <div className="text-center mt-5 pt-5">
          <h2 className="section-title">Ready to Order?</h2>
          <p style={{ fontSize: '1.2rem', color: '#6F4E37', marginBottom: '2rem' }}>
            Browse our delicious menu and place your order online
          </p>
          <Link to="/menu">
            <Button className="btn-cafe" size="lg">
              View Full Menu
            </Button>
          </Link>
        </div>
      </Container>

      {/* Statistics Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(111, 78, 55, 0.1) 100%)',
        padding: '4rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.4
        }}></div>
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Row className="text-center g-4">
            <Col md={3} sm={6}>
              <div style={{
                padding: '2rem',
                animation: 'fadeInUp 0.8s ease',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1.5rem',
                  background: 'linear-gradient(135deg, #8B4513 0%, #6F4E37 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(139, 69, 19, 0.3)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}>
                  <FaCoffee size={35} color="white" />
                </div>
                <h3 style={{ color: '#654321', fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                  500+
                </h3>
                <p style={{ color: '#6F4E37', fontSize: '1.1rem', margin: 0 }}>Cups Served Daily</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div style={{
                padding: '2rem',
                animation: 'fadeInUp 0.8s ease 0.2s backwards',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1.5rem',
                  background: 'linear-gradient(135deg, #A0826D 0%, #8B4513 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(160, 130, 109, 0.3)',
                  animation: 'pulse 2s ease-in-out infinite 0.5s'
                }}>
                  <FaHeart size={35} color="white" />
                </div>
                <h3 style={{ color: '#654321', fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                  2000+
                </h3>
                <p style={{ color: '#6F4E37', fontSize: '1.1rem', margin: 0 }}>Happy Customers</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div style={{
                padding: '2rem',
                animation: 'fadeInUp 0.8s ease 0.4s backwards',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1.5rem',
                  background: 'linear-gradient(135deg, #6F4E37 0%, #654321 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(111, 78, 55, 0.3)',
                  animation: 'pulse 2s ease-in-out infinite 1s'
                }}>
                  <FaStar size={35} color="#FFD700" />
                </div>
                <h3 style={{ color: '#654321', fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                  4.9/5
                </h3>
                <p style={{ color: '#6F4E37', fontSize: '1.1rem', margin: 0 }}>Average Rating</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div style={{
                padding: '2rem',
                animation: 'fadeInUp 0.8s ease 0.6s backwards',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1.5rem',
                  background: 'linear-gradient(135deg, #C9A87E 0%, #A0826D 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(201, 168, 126, 0.3)',
                  animation: 'pulse 2s ease-in-out infinite 1.5s'
                }}>
                  <FaClock size={35} color="white" />
                </div>
                <h3 style={{ color: '#654321', fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                  24/7
                </h3>
                <p style={{ color: '#6F4E37', fontSize: '1.1rem', margin: 0 }}>Online Ordering</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Items Section */}
      <section style={{ background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.05) 0%, rgba(111, 78, 55, 0.05) 100%)', padding: '5rem 0' }}>
        <Container>
          <h2 className="section-title">Our Specialties</h2>
          <Row className="g-4 align-items-center">
            <Col md={4}>
              <div className="menu-card text-center p-3">
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop"
                  alt="Artisan Coffee"
                  style={{ width: '100%', borderRadius: '15px', marginBottom: '1rem' }}
                />
                <h4 style={{ color: '#654321', fontFamily: "'Playfair Display', serif" }}>Artisan Coffee</h4>
                <p style={{ color: '#6F4E37' }}>Handcrafted perfection in every cup</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="menu-card text-center p-3">
                <img
                  src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=300&fit=crop"
                  alt="Fresh Pastries"
                  style={{ width: '100%', borderRadius: '15px', marginBottom: '1rem' }}
                />
                <h4 style={{ color: '#654321', fontFamily: "'Playfair Display', serif" }}>Fresh Pastries</h4>
                <p style={{ color: '#6F4E37' }}>Baked with love every morning</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="menu-card text-center p-3">
                <img
                  src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop"
                  alt="Desserts"
                  style={{ width: '100%', borderRadius: '15px', marginBottom: '1rem' }}
                />
                <h4 style={{ color: '#654321', fontFamily: "'Playfair Display', serif" }}>Decadent Desserts</h4>
                <p style={{ color: '#6F4E37' }}>Sweet endings to perfect moments</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Ambiance Section */}
      <Container className="py-5">
        <Row className="align-items-center g-5">
          <Col md={6}>
            <img
              src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&h=400&fit=crop"
              alt="Cozy Cafe Interior"
              style={{
                width: '100%',
                borderRadius: '30px',
                boxShadow: '0 20px 60px rgba(139, 69, 19, 0.3)'
              }}
            />
          </Col>
          <Col md={6}>
            <h2 className="section-title" style={{ textAlign: 'left' }}>A Place to Relax</h2>
            <p style={{ fontSize: '1.2rem', color: '#6F4E37', lineHeight: '1.8' }}>
              Step into Coffee Haven and experience the perfect blend of comfort and flavor.
              Our cozy atmosphere, combined with the aroma of freshly brewed coffee,
              creates an inviting space where you can unwind, work, or catch up with friends.
            </p>
            <p style={{ fontSize: '1.2rem', color: '#6F4E37', lineHeight: '1.8' }}>
              Every corner is designed with you in mind, from our comfortable seating
              to our warm lighting that makes every visit feel like coming home.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Owner Section */}
      <section style={{ background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.05) 0%, rgba(111, 78, 55, 0.05) 100%)', padding: '5rem 0' }}>
        <Container>
          <h2 className="section-title">Meet Our Owner</h2>
          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6}>
              <div className="menu-card p-4 text-center">
                <img
                  src="/Rishi.jpg"
                  alt="Rishi Jayanath - Owner"
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto 2rem',
                    boxShadow: '0 10px 30px rgba(139, 69, 19, 0.3)',
                    border: '5px solid #D4B896'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop';
                  }}
                />
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#654321', fontSize: '2rem', marginBottom: '1rem' }}>
                  Rishi Jayanath A
                </h3>
                <p style={{ fontSize: '1.2rem', color: '#8B4513', marginBottom: '1.5rem', fontWeight: '500' }}>
                  Founder & Owner
                </p>
                <p style={{ fontSize: '1.1rem', color: '#6F4E37', lineHeight: '1.8' }}>
                  Welcome to Coffee Haven! I'm passionate about creating a warm, inviting space
                  where every cup tells a story and every visit feels like home. Our commitment
                  to quality and community drives everything we do.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section - Get in Touch with Us */}
      <section style={{
        background: 'linear-gradient(135deg, #2C1810 0%, #1A0F0A 100%)',
        padding: '5rem 0',
        position: 'relative'
      }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            {/* Scroll Icon */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '30px',
                height: '50px',
                border: '3px solid #D4B896',
                borderRadius: '25px',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '10px',
                position: 'relative'
              }}>
                <div style={{
                  width: '6px',
                  height: '10px',
                  borderRadius: '3px',
                  background: '#D4B896',
                  animation: 'scrollDown 2s infinite'
                }}></div>
              </div>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '3.5rem',
              color: '#F5E6D3',
              marginBottom: '1rem',
              fontWeight: '700'
            }}>
              Get in Touch with Us
            </h2>
            <p style={{ fontSize: '1.3rem', color: '#D4B896', maxWidth: '700px', margin: '0 auto' }}>
              Have questions or special requests? We'd love to hear from you!
            </p>
          </div>

          <Row className="justify-content-center g-4">
            <Col md={5}>
              <div style={{
                padding: '3rem 2rem',
                background: 'linear-gradient(135deg, rgba(212, 184, 150, 0.1) 0%, rgba(160, 130, 109, 0.1) 100%)',
                border: '2px solid #D4B896',
                borderRadius: '20px',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 184, 150, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>📞</div>
                <h4 style={{
                  color: '#F5E6D3',
                  fontFamily: "'Playfair Display', serif",
                  marginBottom: '1.5rem',
                  fontSize: '1.8rem'
                }}>
                  Call Us
                </h4>
                <a
                  href="tel:+918590380395"
                  style={{
                    fontSize: '1.4rem',
                    color: '#D4B896',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#F5E6D3'}
                  onMouseLeave={(e) => e.target.style.color = '#D4B896'}
                >
                  +91 8281780799
                </a>
              </div>
            </Col>
            <Col md={5}>
              <div style={{
                padding: '3rem 2rem',
                background: 'linear-gradient(135deg, rgba(212, 184, 150, 0.1) 0%, rgba(160, 130, 109, 0.1) 100%)',
                border: '2px solid #D4B896',
                borderRadius: '20px',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 184, 150, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>✉️</div>
                <h4 style={{
                  color: '#F5E6D3',
                  fontFamily: "'Playfair Display', serif",
                  marginBottom: '1.5rem',
                  fontSize: '1.8rem'
                }}>
                  Email Us
                </h4>
                <a
                  href="mailto:oliviajoyson@karunya.edu.in"
                  style={{
                    fontSize: '1.2rem',
                    color: '#D4B896',
                    textDecoration: 'none',
                    fontWeight: '600',
                    wordBreak: 'break-word',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#F5E6D3'}
                  onMouseLeave={(e) => e.target.style.color = '#D4B896'}
                >
                  rishijayanath@karunya.edu.in
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <style>{`
        @keyframes rotateCursor {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Home;
