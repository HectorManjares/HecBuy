import React, { useEffect } from 'react';
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFavoritesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const purchases = useSelector((state) => state.purchases);

    useEffect(() => {
        dispatch(getFavoritesThunk());
    }, []);
    console.log(purchases)

  return (
    <div>
      <h1>Favorites</h1>
      <ListGroup>
        {purchases.map((purchase) => (
          <ListGroup.Item>
            {purchase.cart.products.map((product) => (
                <div onClick={() => navigate(`/productDetail/${product.id}`)}>{product.title}</div>
            ))}
            <br />
            <b>Rate: </b>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};


export default Purchases;