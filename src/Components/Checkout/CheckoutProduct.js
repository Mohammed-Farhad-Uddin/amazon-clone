import React from 'react';
import { useStateValue } from '../Context-Reducer/StateProvider';
import './CheckoutProduct.css';

 const CheckoutProduct = ({id,title,price,rating,image,hiddenButton}) => {
        //     const CheckoutProduct = (props) => {
        //     const {id,title,price,rating,image}=props.item; //alada props akare na patai item props tekhe destructure koreo newa jai

        const [{basket},dispatch]=useStateValue();

        const removeFromBasket=()=>{
            dispatch({
                type: 'REMOVE_FROM_BASKET',
                id: id,
            })
        }

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct_image" src={image} alt="" />
            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">{title}</p>
                <p className="checkoutProduct_price"> <small>$</small> <strong>{price}</strong> </p>
                <div className="checkoutProduct_rating">
                    {
                        // Array(rating).fill().map(() => <p>🌟</p> )
                        Array(rating).fill().map((_,i) => <p key={i}>🌟</p> )//map er value kicu na dileo rating jotobar takbe totobar loop hobe
                    }
                </div>
                {    // !hiddenButton means false otoba null takbe,,,, hiddenButton er biporit jodi hiddenButton && ... takto taile hoto hiddenButton jodi true ba null na hoi temni !hiddenButton jodi null ba false hoi
                    !hiddenButton && <button onClick={removeFromBasket} className="checkoutProduct_button">Remove from basket</button>
                }
            </div>
        </div>
    );
};

export default CheckoutProduct;