import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import { LoggedRoute, GuestRoute, ConfirmatorRoute, AdderRoute } from './middlewares';
import { Header, Footer } from './components/Layout';
import { LoginContainer, LogoutContainer } from './components/Auth';
import { Home, AddPackage, ConfirmPackages } from './components/Pages';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';



const App = () => {
    return(
        <BrowserRouter>
            <Header/>
            <NotificationContainer/>
            <main 
                className="pt-24 bg-gray-600"
                style={{
                    minHeight: '1000px'
                }}
            >
                <Switch>
                    <GuestRoute path='/silcpost/login' component={LoginContainer} />
                    <LoggedRoute path='/silcpost/logout' component={LogoutContainer} />
                    <ConfirmatorRoute path='/silcpost/confirm' component={ConfirmPackages} />
                    <AdderRoute path='/silcpost/add-packages' component={AddPackage} />
                </Switch>
            </main>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;
