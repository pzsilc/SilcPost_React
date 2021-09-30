import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserInfo } from '../api';
import packageJson from '../../package.json';


const GuestRoute = ({ component: Component, ...rest }) => {
    const [ logged, setLogged ] = useState(null);
    useEffect(() => {
        getUserInfo(window.localStorage.getItem(packageJson.authKey))
        .then(res => setLogged(Boolean(res)))
        .catch(() => setLogged(false))
    }, [])
    if(logged === null)
        return null;
    return(
        <Route {...rest} render={props => logged ? (
                <Redirect to={{ pathname: '/silcpost/confirm', state: { from: props.location } }} />
            ) : (
                <Component {...props} />
            )
        }/>
    )
}


const LoggedRoute = ({ component: Component, ...rest }) => {
    const [ logged, setLogged ] = useState(null);

    useEffect(() => {
        getUserInfo(window.localStorage.getItem(packageJson.authKey))
        .then(res => {
          setLogged(Boolean(res.data))
        })
        .catch(() => setLogged(false))
    }, [])

    if(logged === null)
        return null;
    return(
        <Route {...rest} render={props => logged ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/silcpost/login', state: { from: props.location } }} />
            )
        }/>
    )
}



export {
    GuestRoute,
    LoggedRoute,
}
