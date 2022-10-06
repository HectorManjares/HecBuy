import React, { useEffect } from 'react';
import { Offcanvas, ListGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartThunk, purchaseCartThunk } from '../store/slices/cart.slice';
import productsSlice from '../store/slices/products.slice';


const CartsSidebar = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getCartThunk());
    },[])

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><i class="fa-solid fa-list-check"></i></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                    <ListGroup>
                    {cart.map(product =>(
                        <ListGroup.Item key={product.id}>
                            <Link to={`/productDetail/${product.id}`}>
                                {product.title}
                                <br />
                                {product.price}
                                <br />
                                {product.status}
                            </Link>
                        </ListGroup.Item>
                    ))}
                    </ListGroup>
            <Button onClick={() =>dispatch(purchaseCartThunk())}>Checkout</Button>
                   
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartsSidebar;