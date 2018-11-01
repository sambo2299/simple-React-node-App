import React from 'react';
import {  Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loggedUserInfo, ...rest }) => (
    <Route {...rest} render={(props) => (
        loggedUserInfo && loggedUserInfo.userRole === 'admin' ?
        <Component {...props}/>
        :
        <Redirect to="/" />
    )} />
);
 
export default PrivateRoute;
