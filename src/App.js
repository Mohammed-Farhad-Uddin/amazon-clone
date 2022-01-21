import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Checkout from './Components/Checkout/Checkout';
import Login, { auth } from './Components/Login/Login';
import { useStateValue } from './Components/Context-Reducer/StateProvider';

function App() {
  const [{},dispatch]=useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser=>{
      console.log("The User is >>>",authUser)
      if(authUser){
        //user just logged in or user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])
  return (
    //BEM
    <Router>
      <div className="app">
        <Switch>
        <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route exact path="/checkout">
            <Header />
            <Checkout/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
