import React, { useState } from 'react';
import { login } from '../../../api';
import { createNotification } from '../../../functions';
import { connect } from 'react-redux';
import authActions from '../../../redux/auth/actions';
import { Link } from "react-router-dom";


const Login = props => {

    const emailInput = React.createRef();
    const tokenInput = React.createRef();

    const [data, setData] = useState({
        email: "",
        token: ""
    })

    const onChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const onSubmit = e => {
        e.preventDefault();
        login(data.email, data.token)
        .then(res => {
            props.setToken(res.data);
            props.history.push('/silcpost/confirm')
        })
        .catch(err => {
            createNotification('error', 'Email lub token są błędne');
            emailInput.current.classList.add('border-red-500');
            tokenInput.current.classList.add('border-red-500');
        })
    }

    return(
        <form
            onSubmit={onSubmit}
            className="p-10 mx-auto bg-gray-500 shadow-3xl rounded-3xl shadow-xl w-11/12 md:2/3 lg:w-1/2 mx-auto mt-20 mb-64 flex"
        >
            <div className="w-full text-center text-2xl">
                <Link
                    to="/silcpost/"
                    className="text-5xl hover:no-underline hover:text-gray-300 float-left"
                >
                    &#x2039;
                </Link>
                <b className="text-center mb-10 block text-5xl text-gray-400">Logowanie</b>
                <label className="text-left w-1/2">
                    <i className="fa fa-user mr-2"></i>
                    <b>Email</b>
                    <br/>
                    <input
                        ref={emailInput}
                        type="email"
                        name="email"
                        className="w-full p-2 mt-3 shadow rounded-xl bg-gray-400"
                        onChange={onChange}
                        value={data.email}
                    />
                </label>
                <br/>
                <br/>
                <label className="text-left w-1/2">
                    <i className="fa fa-lock mr-2"></i>
                    <b>Token</b>
                    <br/>
                    <input
                        ref={tokenInput}
                        type="password"
                        name="token"
                        className="w-full p-2 mt-3 shadow rounded-xl bg-gray-400"
                        onChange={onChange}
                        value={data.token}
                    />
                </label>
                <br/>
                <input
                    type="submit"
                    className="w-1/2 bg-purple-500 py-3 rounded-3xl shadow text-3xl text-purple-300 mt-14 cursor-pointer"
                    value="Zaloguj się"
                />
            </div>
        </form>
    )
}

const mapDispatchToProps = dispatch => ({
    setToken: token => dispatch(authActions.setToken(token))
})

export const LoginContainer = connect(null, mapDispatchToProps)(Login);
