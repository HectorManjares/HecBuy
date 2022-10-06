import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, ListGroup, ListGroupItem, Row  } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const productsList = useSelector(state => state.products)
    const navigate = useNavigate()
    const [categoryProds, setCategoryProd] = useState([])
    const [productsFiltered, setProductsFiltered] = useState([])
    const [searchValue, setSearchValue] = useState('')
    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategoryProd(res.data.data.categories))
    }, [])

    useEffect(() => {
        setProductsFiltered(productsList)
    }, [productsList])

    const filterCategoryProds = (categoryProdsid) => {
        const productsFiltered = productsList.filter((products) => products.category.id === categoryProdsid)
        setProductsFiltered(productsFiltered)
    }

    const searchProduct = () => {
        const filtered = productsList.filter(
            products => products.title.toLowerCase().includes(searchValue.toLowerCase())
        ); setProductsFiltered(filtered)
    }

    return (
        <Row>
                <Container className="mb-3">
            <Col lg={3}>
                <h3>Home</h3>
                <ListGroup>
                    {categoryProds.map(categoryProd => (
                        <ListGroup.Item
                            key={categoryProd.id} 
                            onClick={() => filterCategoryProds(categoryProd.id)}
                            style={{ cursor: "pointer" }}
                            >
                            {categoryProd.name}                        
                        </ListGroup.Item>                         
                         ))}                       
                </ListGroup>
            </Col>
            <Col>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search Product"
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                />
                <Button variant="outline-secondary" onClick={searchProduct}>
                    Button
                </Button>
            </InputGroup>
            <Row xs={1} md={2} xl={3} className="g-5">
            {productsFiltered.map(products => (
            <Col key={products.id}>
              <Card
                onClick={() => navigate(`/productDetail/${products.id}`)}
                style={{ height: "50%" }}
              >
                <Card.Img variant="top" src={products.productImgs?.[0]} />
                <Card.Body>
                  <Card.Title>{products.title}</Card.Title>
                  <Card.Text>{products.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
            </Col>
        </Container>
        </Row>
    );
};

export default Home;