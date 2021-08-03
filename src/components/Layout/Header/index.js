import React from 'react';
import { connect } from 'react-redux';
import loginActions from '../../../redux/login/actions';
import { AuthHandler } from '../../../api';
import { Link, withRouter } from "react-router-dom";
import './style.css';


class Header extends React.Component {

    state = {
        loc: ''
    }

    constructor(props){
        super(props);
        this.props.history.listen(loc => this.setState({
            loc: loc.pathname
        }));
    }

    componentDidMount = () => {
        this.setState({ loc: this.props.history.location.pathname });
        AuthHandler.getUserInfo(this.props.token)
        .then(res => res.data)
        .then(res => this.props.fetchAdmin(res))
        .catch(console.log)
    }

    render = () => {
        return(
            <header className="bg-white">
                <nav className="flex justify-between bg-white w-full p-6 pb-0 md:pb-2">
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
                        {!this.props.admin &&
                            <React.Fragment>
                                <Link 
                                    to="/" 
                                    className="pb-2 md:pb-0 mt-3 md:mt-2 mr-4 text-gray-400 text-xs md:text-lg pt-3 md:pt-0"
                                >
                                    <b className={this.state.loc === '/' ? 'text-green-600' : ''}>ZŁÓŻ REKLAMACJĘ</b>
                                    {this.state.loc === '/' &&
                                        <div className="underline bg-green-600"></div>
                                    }
                                </Link>
                                <Link 
                                    to="/admin/login" 
                                    className="pb-2 md:pb-0 mt-3 md:mt-2 mr-4 text-gray-400 text-xs md:text-lg pt-3 md:pt-0"
                                >
                                    <b className={this.state.loc === '/admin/login' ? 'text-green-600' : ''}>ZALOGUJ SIĘ</b>
                                    {this.state.loc === '/admin/login' &&
                                        <div className="underline bg-green-600"></div>
                                    }
                                </Link>
                            </React.Fragment>
                        }
                        {this.props.admin &&
                            <div className="mb-4 md:mb-2">
                                <div className="dropdown inline-block relative">
                                    <button className="bg-green-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                                        <span className="mr-1">{this.props.admin.email}</span>
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                                    </button>
                                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-full">
                                        <li className="">
                                            <Link 
                                                className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" 
                                                to="/admin"
                                            >Panel admnistratora</Link>
                                        </li>
                                        <li className="">
                                            <Link 
                                                className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" 
                                                to="/admin/logout"
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
    token: state.token.token,
    admin: state.login.admin,
})

const mapDispatchToProps = dispatch => ({
    fetchAdmin: admin => dispatch(loginActions.fetchAdmin(admin))
})

const HeaderContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Header)

export default withRouter(HeaderContainer);
