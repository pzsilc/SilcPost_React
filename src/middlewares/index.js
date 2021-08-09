import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserInfo } from '../api';


const GuestRoute = ({ component: Component, ...rest }) => {
    const [ logged, setLogged ] = useState(null);
    useEffect(() => {
        getUserInfo(window.localStorage.getItem('vy5kyuh3i55gk6b74il3ig8hughlnoid088078vf8od'))
        .then(res => setLogged(Boolean(res)))
        .catch(() => setLogged(false))
    }, [])
    if(logged === null)
        return null;
    return(
        <Route {...rest} render={props => logged ? (
                <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
              ) : (
                <Component {...props} />
              )
            }
        />
    )
}


const LoggedRoute = ({ component: Component, ...rest }) => {
    const [ logged, setLogged ] = useState(null);
    
    useEffect(() => {
        getUserInfo(window.localStorage.getItem('vy5kyuh3i55gk6b74il3ig8hughlnoid088078vf8od'))
        .then(res => setLogged(Boolean(res)))
        .catch(() => setLogged(false))
    }, [])

    if(logged === null)
        return null;
    return(
        <Route {...rest} render={props => logged ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
            }
        />
    )
}


export {
    GuestRoute,
    LoggedRoute
}