import React from 'react';
import { useStateValue } from '../Context-Reducer/StateProvider';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';

const Checkout = () => {
    // const [state,dispatch]=useStateValue();
    const [{ basket, user }, dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout_left">
                <img className="checkout_ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" />
                <div>
                    {/* <h3>Hello, {user && user.email}</h3> */}
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="checkout_title">Your Shopping Basket </h2>

                    {
                        basket.map((item, i) => <CheckoutProduct
                            // item={item}

                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            key={i}
                        />)
                    }

                </div>
            </div>
            <div className="checkout_right">
                <Subtotal />
            </div>
        </div>
    );
};

export default Checkout;