import './App.css';
import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Order from './Order.js'
import { auth } from './Firebase';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51O4eT9SDpaR5Yq5PhZUORo76KuXoUFJVEbKswQeYCDul4fmtVICTgRbUXAhB2E1DMMDFkR7pvmwQl4uBU3Jf6QWn00WBJKjafT");


function App() {
  const [{},dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      // console.log("The user is--->",authUser);

      if(authUser) {
        dispatch({
          type:'SET_USER',
          user:authUser
        })

      }else{
        dispatch({
          type:'SET_USER',
          user:null
        })

      }
    })
  },[])
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header /> */}
        <Routes>
          <Route path='/login' element={[<Login />]}>
          </Route>
          <Route path='/checkout' element={[<Header />,<Checkout />]}>
          </Route>
          <Route path='/'
            element={[<Header />,<Home />]}>
          </Route>
          <Route path="/payment" element={[<Header />,<Elements stripe={promise}><Payment /></Elements>]} />
          <Route path="/order" element={[<Order />]}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
