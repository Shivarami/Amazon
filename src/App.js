import './App.css';
import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './Firebase';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useStateValue } from './StateProvider';
function App() {
  const [{},dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("The user is--->",authUser);

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
