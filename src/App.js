import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { IndexContainer } from './components/Index';
import { ComplaintViewContainer } from './components/ComplaintView';
import { AdminLoginContainer } from './components/Admin/Login';
import { AdminLogoutContainer } from './components/Admin/Logout';
import { AdminComplaintsListContainer } from './components/Admin/ComplaintsList';
import { AdminOneComplaintContainer } from './components/Admin/OneComplaint';
import { LoggedRoute, GuestRoute } from './middlewares';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const App = () => {
    return(
        <BrowserRouter>
            <Header/>
            <NotificationContainer/>
            <main className="py-24">
                <Switch>
                    <Route exact path='/' component={IndexContainer}/>
                    <GuestRoute path='/complaint/:key' component={ComplaintViewContainer}/>
                    <GuestRoute path='/admin/login' component={AdminLoginContainer}/>
                    <LoggedRoute path='/admin/logout' component={AdminLogoutContainer}/>
                    <LoggedRoute path='/admin/complaints/:key' component={AdminOneComplaintContainer}/>
                    <LoggedRoute path='/admin' component={AdminComplaintsListContainer}/>
                </Switch>
            </main>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;