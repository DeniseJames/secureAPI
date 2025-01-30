import React, { useState } from 'react';
import { Navbar, Nav, Button, Form, FormControl, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

const NavbarComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // Fixed template literal formatting
    setSearchQuery(''); // Clear the search field after submission
  };

  const handleAuthAction = async () => {
    if (user) {
      await signOut();
      navigate('/'); // Navigate to the home page after signing out
    } else {
      navigate('/login');
    }
  };

  return (
    <Navbar expand="lg" bg="primary" variant="dark" fixed="top" className="py-2">
      <Container fluid> {/* Ensure full-width container */}
        <Navbar.Brand className="text-gold fs-4" style={{ fontFamily: 'Georgia' }}>
          Quantum Computer Learning
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto text-center">
            <Nav.Link className="text-white mx-2 fs-6" onClick={() => navigate('/')}>
              Home
            </Nav.Link>
            <Nav.Link className="text-white mx-2 fs-6" onClick={() => navigate('/machine-learning')}>
              Machine Learning
            </Nav.Link>
            <Nav.Link className="text-white mx-2 fs-6" onClick={() => navigate('/web-design')}>
              Web Design
            </Nav.Link>
            <Nav.Link className="text-white mx-2 fs-6" onClick={() => navigate('/training')}>
              Training
            </Nav.Link>
            <Nav.Link className="text-white mx-2 fs-6" onClick={() => navigate('/contact')}>
              Contact Us
            </Nav.Link>
          </Nav>

          {/* Search Form */}
          <Form className="d-flex mx-auto my-2 my-lg-0" onSubmit={handleSearchSubmit}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2 fs-6"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button variant="outline-light" type="submit" className="fs-6">
              Search
            </Button>
          </Form>

          {/* Auth Button */}
          <Button variant="outline-light" className="ms-2" onClick={handleAuthAction}>
            {user ? 'Log Out' : 'Login'}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
