import React, { useEffect } from 'react';
import loginActions from '../../../redux/login/actions';
import tokenActions from '../../../redux/token/actions';
import { connect } from 'react-redux';
import { AuthHandler } from '../../../api';
import { Notifications } from '../../../functions';

const AdminLogin = props => {

    const onSubmit = e => {
        e.preventDefault();
        AuthHandler.login(props.username, props.password)
        .then(res => {
            props.setToken(res.data.key);
            props.history.push('/admin');
            window.location.reload();
            Notifications.create('success', 'Zalogowano się pomyślnie');
        })
        .catch(err => {
            Notifications.create('error', 'Nie udało się zalogować');
            props.setError();
            document.querySelector('input[name="password"]').value = "";
        })
    }

    const onChange = e => {
        const { name, value } = e.target;
        props.updateInput(name, value);
    }

    return(
        <div className="bg-green-400 py-1" style={{ marginTop: '-25px', marginBottom: '-140px' }}>
            <form 
                onSubmit={onSubmit}
                className="mx-auto mt-48 mb-64 border shadow-xl rounded-xl w-11/12 md:w-2/3 lg:w-1/2 xl:w-4/12 p-20 text-center bg-white"
            >
                <b className="text-center mt-5 text-2xl">ZALOGUJ SIĘ</b>
                <div className="w-full md:w-1/2 mx-auto text-left mt-20">
                    <label>
                        <p className="text-gray-500">Nazwa użytkownika:</p>
                        <div className={`border-b border-${props.error ? 'red' : 'gray'}-300`}>
                            <span className={`fa fa-lock text-${props.error ? 'red' : 'gray'}-300`}></span>
                            <input 
                                type="username"
                                name="username"
                                onChange={onChange}
                                className="ml-3 w-10/12"
                            />
                        </div>
                    </label>
                    <br/>
                    <label>
                        <p className="text-gray-500">Hasło:</p>
                        <div className={`border-b border-${props.error ? 'red' : 'gray'}-300`}>
                            <span className={`fa fa-lock text-${props.error ? 'red' : 'gray'}-300`}></span>
                            <input 
                                type="password"
                                name="password"
                                onChange={onChange}
                                className="ml-3 w-10/12"
                            />
                        </div>
                    </label>
                    <div className="text-center mb-5">
                        <input 
                            type="submit"
                            className="p-3 bg-green-400 rounded-3xl w-full my-5 cursor-pointer text-white"
                            value="LOGUJ"
                        />
                    </div>
                </div>
                <small
                    className="text-gray-400"
                >* Powyższy formularz logowania dotyczy tylko administratorów serwisu</small>
            </form>
        </div>
    )
}





const mapStateToProps = state => ({
    username: state.login.username,
    password: state.login.password,
    error: state.login.error
})

const mapDispatchToProps = dispatch => ({
    updateInput: (name, value) => dispatch(loginActions.updateInput(name, value)),
    setToken: token => dispatch(tokenActions.setToken(token)),
    setError: () => dispatch(loginActions.setError()),
})

export const AdminLoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminLogin)