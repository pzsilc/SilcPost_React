import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import { LoggedRoute, GuestRoute, AdminRoute } from './middlewares';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Header, Footer } from './components/Layout';
import Home from './components/Home';
import { LoginContainer, LogoutContainer } from './components/Auth';
import { DashboardListContainer, DashboardSingleContainer, DashboardHomeContainer } from './components/Dashboard';

const App = () => {
    return(
        <BrowserRouter>
            <Header/>
            <NotificationContainer/>
            <main className="pt-24">
                <Switch>
                    <GuestRoute exact path="/grafiki/" component={Home} />
                    <GuestRoute path="/grafiki/login" component={LoginContainer} />
                    <LoggedRoute path="/grafiki/logout" component={LogoutContainer} />
                    <LoggedRoute exact path="/grafiki/dashboard" component={DashboardHomeContainer} />
                    <AdminRoute exact path="/grafiki/dashboard/list" component={DashboardListContainer} />
                    <LoggedRoute path="/grafiki/dashboard/drugstores/:id" component={DashboardSingleContainer} />
                </Switch>
            </main>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;
