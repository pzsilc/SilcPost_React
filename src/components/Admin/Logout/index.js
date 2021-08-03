import { memo } from 'react';
import { AuthHandler } from '../../../api';
import { connect } from 'react-redux';
import tokenActions from '../../../redux/token/actions';
import { Notifications } from '../../../functions';

const AdminLogout = memo(props => {
    AuthHandler.logout(props.token)
    .then(res => {
        props.deleteToken();
        window.location.reload('/');
    })
    .catch(err => {
        console.log(err);
        props.history.push('/');
        Notifications.create('error', 'Nie udało się wylogować. Spróbuj ponownie');
    })
    return null;
})

const mapStateToProps = state => ({
    token: state.token.token
})

const mapDispatchToProps = dispatch => ({
    deleteToken: () => dispatch(tokenActions.remToken())
})

export const AdminLogoutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminLogout)