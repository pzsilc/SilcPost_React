import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header, Footer } from './components/Layout';
import { IndexContainer } from './components/Index';
import { ComplaintViewContainer } from './components/ComplaintView';
import { AdminLoginContainer } from './components/Admin/Login';
import { AdminComplaintsListContainer } from './components/Admin/ComplaintsList';
import { AdminOneComplaintContainer } from './components/Admin/OneComplaint';
import { LoggedRoute, GuestRoute } from './middlewares';

const App = () => {
    return(
        <div>
            <Header/>
            <main className="mt-3 py-24">
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={IndexContainer}/>
                        <Route path='/complaint/:key' component={ComplaintViewContainer}/>
                        <GuestRoute path='/admin/login' component={AdminLoginContainer}/>
                        <LoggedRoute path='/admin/complaints/:key' component={AdminOneComplaintContainer}/>
                        <LoggedRoute path='/admin' component={AdminComplaintsListContainer}/>
                    </Switch>
                </BrowserRouter>
            </main>
            <Footer/>
        </div>
    )
}

export default App;
