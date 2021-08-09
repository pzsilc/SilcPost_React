import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import { LoggedRoute, GuestRoute } from './middlewares';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Header, Footer } from './components/Layout';
import Home from './components/Home';
import { LoginContainer, LogoutContainer } from './components/Auth';
import { DashboardListContainer, DashboardSingleContainer } from './components/Dashboard';

const App = () => {
    return(
        <BrowserRouter>
            <Header/>
            <NotificationContainer/>
            <main className="pt-24">
                <Switch>
                    <GuestRoute exact path="/" component={Home} />
                    <GuestRoute path="/login" component={LoginContainer} />
                    <LoggedRoute path="/logout" component={LogoutContainer} />
                    <LoggedRoute exact path="/dashboard" component={DashboardListContainer} />
                    <LoggedRoute path="/dashboard/drugstores/:pk" component={DashboardSingleContainer} />
                </Switch>
            </main>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;