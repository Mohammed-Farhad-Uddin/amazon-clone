import moment from 'moment';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from '../Checkout/CheckoutProduct';
import './Order.css'

// const Order = (props) => {
//     const order=props.order;
const Order = ({ order }) => {

    return (
        <div className="order">
            <h2>Order</h2>
            {/* npm i moment. google search */}
            <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p className="order_id">
                <small>{order.id}</small>
            </p>
            {
                order.data.basket?.map((item, i) => {
                   return <CheckoutProduct
                        // item={item}

                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        hiddenButton={true } 
                        // hiddenButton
                        key={i}
                    />
                })
            }

            <CurrencyFormat
                renderText={(value => (
                    <h3 className="order_total"> Order Total:{value} </h3>
                ))}
                //decimalScale={2} means . er por aro 2 gor dekabe. mane value ta 2 decimal porjonto jabe
                // devide 100 subunit kora multiple 100 k remove korar jnno
                decimalScale={2} value={order.data.amount / 100} displayType={'text'} thousandSeparator={true} prefix={'$'}
            />
        </div>
    );
};

export default Order;