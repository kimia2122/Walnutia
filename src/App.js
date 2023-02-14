import React, { useState, useLayoutEffect } from 'react';
import { Route, Router, Routes } from "react-router-dom";

import customHistory from './History/history';
import Login from './pages/Login/Login';
import GetCode from './pages/Getcode/getcode';
import Signupemployer from './pages/SignupE/Signupemployer';
import MapSignup from './pages/SignupE/leafletMap';
import Signupworker from './pages/SignupW/Signupworker';
import Home from './pages/Home/Home';
import ProfileWorker from './pages/ProfileW/ProfileWorker';
import ProfileEmployer from './pages/ProfileE/ProfileEmployer';
import AddAddress from './pages/ProfileE/AddAddress';
import Order from './pages/Order/Order';
import Aboutus from './pages/About/About';

const CustomRouter = ({ history, ...props }) => {
    const [state, setState] = useState({
      action: history.action,
      location: history.location,
    });
  
    useLayoutEffect(() => history.listen(setState), [history]);
  
    return (
      <Router
        {...props}
        location={state.location}
        navigationType={state.action}
        navigator={history}
      />
    );
  };



const App = () => {
    return (
        <div>
            <CustomRouter history={customHistory}>
                <Routes>
                   <Route path="/Login" exact element={<Login/>} />
                   <Route path="/Getcode" exact element={<GetCode/>} />
                   <Route path="/Signup-employer" exact element={<Signupemployer/>} />
                   <Route path="/MapSignup" exact element={<MapSignup/>}/>
                   <Route path="/Signup-worker" exact element={ <Signupworker/> } />
                   <Route path="/" exact element={<Home/>} />
                   <Route path="/Profile-Worker" exact element={<ProfileWorker/>} />
                   <Route path="/Profile-Employer" exact element={<ProfileEmployer/>} />
                   <Route path="/AddAddress" exact element={<AddAddress/>}/>
                   <Route path="/Order" exact element={<Order/>} />
                   <Route path="/About-us" exact element={<Aboutus/>} />
                </Routes>
             </CustomRouter>
        </div>
    );
}

export default App;