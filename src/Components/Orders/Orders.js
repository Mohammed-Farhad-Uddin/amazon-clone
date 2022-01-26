import React, { useEffect, useState } from 'react';
import { query, collection, onSnapshot, orderBy, refEqual } from 'firebase/firestore'
import { useStateValue } from '../Context-Reducer/StateProvider';
// import { db } from '../Login/Login';
import './Orders.css'
import Order from './Order';
import { db } from '../Login/Login';

const Orders = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    // useEffect(() => { //firebase version-8
    //     db
    //         .collection('users')//users collection access korbe
    //         .doc(user?.uid)//users uid ta find korbe
    //         .collection('orders')//then orders access korbe
    //         .orderBy('created', 'desc')//created means date ta, mane created payment js e created means oi ta jei date e create hoice,,,,desc means descending ,,last jei date e order created hoice oi ta first a show korbe
    //         .onSnapshot(snapshot => {//ei ta sigle row ta te map korbe.mane uid ta dore orders e dukhe oi id er sob order mapping korbe
    //             setOrders(snapshot.docs.map(doc => ({
    //                 id: doc.id,
    //                 data: doc.data()
    //             })))
    //         })
    // }, []);


    useEffect(() => {

        if (user) {
            const ref = collection(db, 'users', user?.uid, 'orders');
            const orderedOrders = query(ref, orderBy("created", "desc"));//ei ta querry korbe created er descending order e mane created jei last date e order create hoice oi ta k aghe query kore anbe and ei vabe first order ta sobar last e asbe
            onSnapshot(orderedOrders, snapshot => {
                console.log(orderedOrders);
                console.log(snapshot);
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
            })
        } else {
            setOrders([]);
        }
    }, [user]);//user chnage hole oi user er order show korbe

    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders_order">
                {
                    orders?.map((order,i) => {
                       return <Order order={order} key={i} />;
                    })
                }
            </div>
        </div>
    );
};

export default Orders;