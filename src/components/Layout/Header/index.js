import React from 'react';
import { connect } from 'react-redux';
import authActions from '../../../redux/auth/actions';
import { getUserInfo } from '../../../api';
import { Link, withRouter } from "react-router-dom";
import './style.css';


class Header extends React.Component {

    componentDidMount = () => {
        getUserInfo(this.props.token)
        .then(res => res.data)
        .then(res => {
            this.props.fetchUser(res)
        })
        .catch(err => console.log(err))
    }

    render = () => {
        return(
            <header>
                <nav className="flex justify-between w-full p-3 pb-0 md:pb-2">
                    <Link 
                        to="/" 
                        className="inline-block"
                    >
                        <div className="flex items-center flex-no-shrink text-white mr-6 lg:ml-24">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                style={{
                                    width: '180px'
                                }}
                            />
                        </div>
                    </Link>
                    <div className="flex justify-content-between text-gray-800">
                        {!this.props.user &&
                            <React.Fragment>
                                <Link 
                                    to="/login" 
                                    className="pb-2 md:pb-0 mt-3 md:mt-2 mr-4 text-gray-400 text-xs md:text-lg pt-1"
                                >
                                    <b>ZALOGUJ SIĘ</b>
                                </Link>
                            </React.Fragment>
                        }
                        {this.props.user &&
                            <div className="mb-4 md:mb-2">
                                <div className="dropdown inline-block relative">
                                    <button className="bg-transparent text-gray-500 font-semibold py-2 px-4 rounded inline-flex items-center">
                                        <span className="mr-1">{this.props.user.email}</span>
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                                    </button>
                                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-full">
                                        {this.props.user.is_superuser &&
                                            <li className="/">
                                                <Link 
                                                    className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" 
                                                    to="/dashboard"
                                                >Panel admnistratora</Link>
                                            </li>
                                        }
                                        <li className="">
                                            <Link 
                                                className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" 
                                                to="/logout"
                                            >Wyloguj się</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        }
                    </div>
                </nav>
            </header>
        )
    }
}


const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
})

const mapDispatchToProps = dispatch => ({
    fetchUser: user => dispatch(authActions.fetchUser(user))
})

const HeaderContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Header)

export default withRouter(HeaderContainer);
