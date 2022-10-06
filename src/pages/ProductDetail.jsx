import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addCartThunk } from "../store/slices/cart.slice"


const ProductDetail = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const productsList = useSelector(state => state.products)
    const [rate, setRate] = useState(5)

    const productsDetail = productsList.find(products => products.id === Number(id))
    const relatedProducts = productsList.filter(
        products => products.category.id === productsDetail.category.id
    )

    useEffect(() =>{
        setRate(5)
    }, [])

    // products: id
    // rate:

    const addFavorite = () =>{
        alert("rate: " + rate)
        const cart = {
            id:id,
            quantity: rate
        }
        dispatch(addCartThunk(cart));
    }

    return (
        <Row>
            <Col>
        <div>
            <h3>Product</h3>
                    <div className="rate">
                <Button className="me-3" onClick={() => setRate(rate - 1)}>
                    -
                </Button>
                {rate}
                <Button className="ms-3" onClick={() => setRate(rate + 1)}>
                    +
                </Button>
                <br />
                <Button onClick={addFavorite}>Add to Favorites</Button>
                <ul>
                {
                    
                
                relatedProducts.map((products) => (
                    <li>
                        <Link to={`/productDetail/${products.id}`}>{products.title}</Link>
                    </li>
                ))

                }
                </ul>
                <h2>{productsDetail?.title}</h2>
                <p>{productsDetail?.description}</p>
                <img src={productsDetail?.productImgs?.[0]} alt={productsDetail?.title} />
                <img src={productsDetail?.productImgs?.[1]} alt={productsDetail?.title} />
                <img src={productsDetail?.productImgs?.[2]} alt={productsDetail?.title} />
            </div>
        </div>
            </Col>
        </Row>
    );
};

export default ProductDetail;