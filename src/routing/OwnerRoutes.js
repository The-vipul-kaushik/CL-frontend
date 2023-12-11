
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from '../components/Home';
import TeamData from '../components/TeamData';
import Page404 from '../components/Page404';
import Logout from '../components/Logout';

const OwnerRoutes = () => {

    return (
        <div >
            <Router>
                <div>
                    <Header />
                    <div style={{ minHeight: "79vh" }}>
                        <Switch>
                            <Route exact path="/" > <Home /> </Route>
                            <Route path="/home" > <Home /> </Route>
                            <Route path="/team"> <TeamData /> </Route> 
                            <Route path="/logout"> <Logout /> </Route>
                            <Route path="/*"> <Page404 /> </Route>
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>
        </div >
    );
}


export default OwnerRoutes;