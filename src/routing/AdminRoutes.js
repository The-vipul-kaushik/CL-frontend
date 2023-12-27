
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from '../components/Home';
import OrganiserData from '../components/OrganiserData';
import TournamentData from '../components/TournamentData';
import Page404 from '../components/Page404';
import Logout from '../components/Logout';
import { Redirect } from 'react-router-dom';
import TeamData from '../components/TeamData';
import MatchData from '../components/MatchData';
import AddOrganiser from '../components/AddOrganiser';
import UpdateOrganiser from '../components/UpdateOrganiser';
import AddTournament from '../components/AddTournament';
import UpdateTournament from '../components/UpdateTournament';

const AdminRoutes = () => {

    return (
        <div >
            <Router>
                <div>
                    <Header />
                    <div style={{ minHeight: "79vh" }}>
                        <Switch>
                            <Route exact path="/" > <Home /> </Route>
                            <Route path="/home" > <Home /> </Route>
                            <Route path="/organiser"> <OrganiserData /> </Route>
                            <Route path="/add-organiser"> <AddOrganiser /> </Route>
                            <Route path="/add-tournament"> <AddTournament /> </Route>
                            <Route path="/update-organiser/:id"> <UpdateOrganiser /> </Route>
                            <Route path="/update-tournament/:id"> <UpdateTournament /> </Route>
                            <Route path="/tournament"> <TournamentData /> </Route>
                            <Route path="/team"> <TeamData /> </Route>
                            <Route path="/match"> <MatchData /> </Route>
                            {/*<Route path="/ticket"> <Ticket /> </Route>
                            <Route path="/audience"> <Audience /> </Route> */}
                            <Route path="/register"> <Redirect> <Home /> </Redirect> </Route>
                            <Route path="/login"> <Redirect> <Home /> </Redirect> </Route>
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


export default AdminRoutes;