import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from '../components/Home';
import Login from "../components/Login";
import Page404 from '../components/Page404';
import Register from "../components/Register";
import { useEffect, useState } from 'react';
import AdminRoutes from "./AdminRoutes";
import OwnerRoutes from "./OwnerRoutes";
import AudienceRoutes from "./AudienceRoutes";
import AppUser from '../models/AppUser';

const Routes = () => {

    // localStorage.removeItem('loggedInUser');
    // localStorage.setItem('loggedInUser');

    let [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('loggedInUser')));
        console.log(JSON.parse(localStorage.getItem('loggedInUser')));
    }, []);


    if(user==null) {
        console.log(localStorage.getItem('loggedInUser'));
        return (
            <div >
                <Router>
                    <div>
                        <Header />
                        <div style={{ minHeight: "79vh" }}>
                            <Switch>
                                <Route exact path="/" > <Home /> </Route>
                                <Route path="/home" > <Home /> </Route>
                                <Route path="/register"> <Register /> </Route>
                                <Route path="/login"> <Login /> </Route>
                                <Route path="/*"> <Page404 /> </Route>
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </div >
        );
    }
    else if (user.role==="ADMIN") {
        return (
            <div>
                <AdminRoutes />
            </div>
        );
    }
    else if(user.role=="OWNER") {
        return (
            <div>
                <OwnerRoutes />
            </div>
        );

    }
    else if(user.role=="AUDIENCE") {
        return (
            <div>
                <AudienceRoutes />
            </div>
        );
    }
    else
    {

    }

}


export default Routes;