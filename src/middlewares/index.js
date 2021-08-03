import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthHandler } from '../api';


const GuestRoute = ({ component: Component, ...rest }) => {
    const [ logged, setLogged ] = useState(null);
    useEffect(() => {
        AuthHandler.getUserInfo(window.localStorage.getItem('complaintsAccessToken'))
        .then(res => setLogged(Boolean(res)))
        .catch(() => setLogged(false))
    }, [])
    if(logged === null)
        return null;
    return(
        <Route {...rest} render={props => logged ? (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
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
        AuthHandler.getUserInfo(window.localStorage.getItem('complaintsAccessToken'))
        .then(res => setLogged(Boolean(res)))
        .catch(() => setLogged(false))
    }, [])

    if(logged === null)
        return null;
    return(
        <Route {...rest} render={props => logged ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />
            )
            }
        />
    )
}


export {
    GuestRoute,
    LoggedRoute
}