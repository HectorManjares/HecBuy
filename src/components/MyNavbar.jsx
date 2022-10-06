import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CardsSidebar from './CartsSidebar';

const MyNavbar = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }

    const [ show, setShow ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand to="/" as={Link}>HecBuy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/login' className='Rute'><i class="fa-solid fa-right-to-bracket"></i></Nav.Link>
                        <Nav.Link as={Link} to='/productDetail' className='Rute'><i class="fa-solid fa-clipboard-check"></i></Nav.Link>
                        <Nav.Link as={Link} to='/purchases' className='Rute'><i class="fa-solid fa-cash-register"></i></Nav.Link>
                        <Nav.Link onClick={handleShow} className='Rute'><i class="fa-solid fa-cart-shopping"></i></Nav.Link>
                        <Nav.Link onClick={logout} className='Rute'><i class="fa-solid fa-right-from-bracket"></i></Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        <CardsSidebar show={show} handleClose={handleClose}/>
        </div>
    );
};

export default MyNavbar;