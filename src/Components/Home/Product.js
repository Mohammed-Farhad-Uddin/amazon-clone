import React from 'react';
import { useStateValue } from '../Context-Reducer/StateProvider';
import './Product.css';

const Product = ({ id, title, price, rating, image }) => {
    // const [state,dispatch]=useStateValue();
    const [{ basket }, dispatch] = useStateValue();
    
    // console.log(state);
    console.log(basket);

    // dispatch the item into the dataLayer
    const addToBusket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                price: price,
                rating: rating,
                image: image,
            }
        })
    }

    return (
        <div className="product">
            <div className="product_info">
                <p>{title}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_rating">
                    {
                        Array(rating).fill().map((_, i) => {
                            return <p key={i}>🌟</p>
                        })
                    }
                </div>
            </div>
            <img src={image} alt="" />
            <button onClick={addToBusket}>Add to Basket</button>
        </div>
    );
};

export default Product;