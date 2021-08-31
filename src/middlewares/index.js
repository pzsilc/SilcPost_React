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
                <Redirect to={{ pathname: '/grafiki/ashboard', state: { from: props.location } }} />
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
                <Redirect to={{ pathname: '/grafiki/login', state: { from: props.location } }} />
            )
            }
        />
    )
}


const AdminRoute = ({ component: Component, ...rest }) => {
    const [ logged, setLogged ] = useState(null);

    useEffect(() => {
        getUserInfo(window.localStorage.getItem('vy5kyuh3i55gk6b74il3ig8hughlnoid088078vf8od'))
        .then(res => {
          setLogged(Boolean(res.data && parseInt(res.data.is_superuser)))
        })
        .catch(() => setLogged(false))
    }, [])

    if(logged === null)
        return null;
    return(
        <Route {...rest} render={props => logged ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/grafiki/', state: { from: props.location } }} />
            )
            }
        />
    )
}


export {
    GuestRoute,
    LoggedRoute,
    AdminRoute
}
