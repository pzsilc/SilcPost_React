import React from 'react';
import loginActions from '../../../redux/login/actions';
import tokenActions from '../../../redux/token/actions';
import { connect } from 'react-redux';
import { AuthHandler } from '../../../api';

const AdminLogin = props => {

    const onSubmit = e => {
        e.preventDefault();
        AuthHandler.login(props.username, props.password)
        .then(res => {
            props.setToken(res.data.key);
            //props.history.push('/admin');
        })
        .catch(err => {
            console.log(err)
        })
    }

    const onChange = e => {
        const { name, value } = e.target;
        props.updateInput(name, value);
    }

    return(
        <form onSubmit={onSubmit}>
            <label>
                Nazwa użytkownika
                <input 
                    type="text"
                    name="username"
                    onChange={onChange}
                    className=""
                />
            </label>
            <label>
                Nazwa użytkownika
                <input 
                    type="password"
                    name="password"
                    onChange={onChange}
                    className=""
                />
            </label>
            <div>
                <input 
                    type="submit"
                    className=""
                />
            </div>
        </form>
    )
}





const mapStateToProps = state => ({
    username: state.login.username,
    password: state.login.password
})

const mapDispatchToProps = dispatch => ({
    updateInput: (name, value) => dispatch(loginActions.updateInput(name, value)),
    setToken: token => dispatch(tokenActions.setToken(token))
})

export const AdminLoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminLogin)