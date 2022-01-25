import React from 'react';
import {useHistory} from "react-router-dom";
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../Context-Reducer/StateProvider';
import { getBasketTotal } from '../Context-Reducer/reducer';



const Subtotal = () => {
    const history = useHistory();
    // const [state,dispatch]=useStateValue();
    const [{basket},dispatch]=useStateValue();
    console.log(basket,"int thr subtotal");
    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={(value=>(
                    <>
                    <p> Subtotal({basket.length} items): <strong>{value}</strong> </p>
                    <small className="subtotal_gift">
                        <input type="checkbox" required/>This orders contains a gift
                    </small>
                    </>
                ))}
                    //decimalScale={2} means . er por aro 2 gor dekabe. mane value ta 2 decimal porjonto jabe
               decimalScale={2} value={getBasketTotal(basket)}  displayType={'text'} thousandSeparator={true} prefix={'$'} 
            />
           
             <button onClick={(e)=>history.push("./payment")}>Procced to checkout</button>
        </div>
    );
};

export default Subtotal;