import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserInfo } from '../api';
import packageJson from '../../package.json';


const GuestRoute = ({ component: Component, ...rest }) => {
    const [ logged, setLogged ] = useState(null);
    const [ isConfirmator, setIsConfirmator ] = useState(null);
    useEffect(() => {
        getUserInfo(window.localStorage.getItem(packageJson.authKey))
        .then(res => {
            setLogged(Boolean(res));
            setIsConfirmator(res.data.data && res.data.data.is_confirmation);
        })
        .catch(() => setLogged(false))
    }, [])
    if(logged === null)
        return null;
    return(
        <Route {...rest} render={props => logged ? (
                <Redirect to={{ pathname: `/silcpost/${logged.is_confirmation ? 'confirm' : 'add-packages'}`, state: { from: props.location } }} />
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



const ConfirmatorRoute = ({ component: Component, ...rest }) => {
    const [ isConfirmator, setIsConfirmator ] = useState(null);

    useEffect(() => {
        getUserInfo(window.localStorage.getItem(packageJson.authKey))
        .then(res => {
            setIsConfirmator(Boolean(res.data && res.data.data.is_confirmator))
        })
        .catch(() => setIsConfirmator(false))
    }, [])

    if(isConfirmator === null)
        return null;

    return(
        <Route {...rest} render={props => isConfirmator ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/silcpost/login', state: { from: props.location } }} />
            )
        }/>
    )
}



const AdderRoute = ({ component: Component, ...rest }) => {
    const [ isNotConfirmator, setIsNotConfirmator ] = useState(null);

    useEffect(() => {
        getUserInfo(window.localStorage.getItem(packageJson.authKey))
        .then(res => {
            setIsNotConfirmator(Boolean(res.data.data && !res.data.data.is_confirmator))

        })
        .catch(() => setIsNotConfirmator(false))
    }, [])

    if(isNotConfirmator === null)
        return null;
    return(
        <Route {...rest} render={props => isNotConfirmator ? (
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
    ConfirmatorRoute,
    AdderRoute
}
