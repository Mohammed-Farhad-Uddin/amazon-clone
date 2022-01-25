import React, { useEffect, useState } from 'react';
import './Payment.css';
import { useStateValue } from '../Context-Reducer/StateProvider';
import CheckoutProduct from '../Checkout/CheckoutProduct';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../Context-Reducer/reducer';
import axios from '../Payment/Axios/axios'; //should not from local axios, I mean 'axios' hobe na
import { useHistory } from 'react-router-dom';


const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    //for CardElement
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState(true);
    useEffect(() => {//axios er ketre ei rkm promise hoi but fetch er ketre  .then .then oi ta fetch kora jai
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`//ei kane last e 100 multiple korar krn holo jodi total 10$ hoi taile ei ta ei kane count hobe 0.10$ ,total jodi 200$ hoi ei ta dore nibe 2$ jar karone 100 multiple kore exact price ta count hobe.1$ soman 0.1$ dore automic ei kane tai 0.1$*100= 1$.
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket]);//basket product add ba remove hole ei ta abr reload korbe.basket change hole ei ta abr call hobe.so product add ba remove hole price update hobe and client secret o update hobe proti product change e.
    console.log("the getClient secret is=>", clientSecret);



    const handleChange = (e) => {
        //listen for the change of Card Element
        setDisabled(e.empty) //e=event jodi empty takhe tahole e.empty=true ,,event e kicu likle e.empty=false hoye jabe
        console.log(e.empty, "ami emptry test");

        //display the error customer type on the card 
        setError(e.error ? e.error.message : '')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {//ei kane.then e response asbe oi ta k destructure kore paymentIntend k newa hocce abd paymentIntend=payment confirm. payment confirm hole ei line er code gula te asbe
            setProcessing(false);
            setSucceeded(true);
            setError(null);

            dispatch({
                type: 'EMPTY_BASKET',
            })

            history.replace('./orders');
        })

    }

    return (
        <div className="payment">
            <div className='payment_container'>
                <h1>
                    <Link to='/checkout'> <ArrowBackIcon /> </Link> Checkout ({basket?.length} items)
                </h1>

                {/* Payment -- Delivery address section */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user ? user.email : "Please Sign In"}</p>
                        <p>123, React Line</p>
                        <p>Chittagong Bangladesh</p>
                    </div>

                </div>

                {/* Payment -- Review items section */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className="payment_reviewItem">
                        {
                            basket.map((item, i) => (
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                    key={i}
                                />
                            ))
                        }
                    </div>
                </div>

                {/* Payment -- Payment method section */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment method</h3>
                    </div>
                    <div className="payment_details">
                        {/* stripe will strike here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value => (
                                        <>
                                            <h3> Order Total: <strong>{value}</strong> </h3>
                                        </>
                                    ))}
                                    //decimalScale={2} means . er por aro 2 gor dekabe. mane value ta 2 decimal porjonto jabe
                                    decimalScale={2} value={getBasketTotal(basket)} displayType={'text'} thousandSeparator={true} prefix={'$'}
                                />
                            </div>

                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Proccessing</p> : "Buy Now"}</span>
                            </button>
                            <div>
                                {/* //error showing */}
                                {
                                    error && error
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;