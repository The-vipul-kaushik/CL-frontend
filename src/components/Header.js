import { getRoles } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {

    let [user, setUser] = useState({});
    const currentURL = useLocation();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('loggedInUser')));
        // console.log(JSON.parse(localStorage.getItem('loggedInUser')));
    }, []);


    if(user==null) {
        return (
            <header class="header sticky-top">
                <nav class="navbar navbar-fixed-top navbar-expand-lg navbar-dark bg-dark">
                    <div class="container">
                        <Link className="navbar-brand" to="/">
                            <img src={logo} style={{"border-radius": "100%"}} height="50px" width="60px" alt="CricketLeague Logo" />
                            <span className="text-warning font-weight-bold font-italic"> Cricket League</span>
                        </Link>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                            <ul class="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/register" >REGISTER</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/login" >LOGIN</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
    else if(user.role==="ADMIN") {
        return (
            <header class="header sticky-top">
                <nav class="navbar navbar-fixed-top navbar-expand-lg navbar-dark bg-dark">
                    <div class="container">
                        <Link className="navbar-brand" to="/">
                        <img src={logo} style={{"border-radius": "100%"}} height="50px" width="60px" alt="CricketLeague Logo" />
                            <span className="text-warning font-weight-bold font-italic"> Cricket League</span>
                        </Link>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                            <ul class="navbar-nav ml-auto">
                                { (currentURL.pathname!="/home" && currentURL.pathname!="/") ? (
                                    <>
                                    <li className="nav-item">
                                    <Link className="nav-link text-white font-weight-bold font-italic" to="/organiser" >Organisers</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white font-weight-bold font-italic" to="/tournament" >Tournaments</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white font-weight-bold font-italic" to="/team" >Teams</Link>     
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white font-weight-bold font-italic" to="/match" >Matches</Link>
                                    </li>
                                    </>
                                    ) : (<>
                                    </>)
                                }
                                <li className="nav-item">
                                    <Link className="nav-link text-warning" to="/logout" > <FontAwesomeIcon icon={faUser} className="mr-2"/>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
    else if(user.role=="AUDIENCE") {
        // define different navlinks here according to getRoles...
        return (
            <header class="header sticky-top">
                <nav class="navbar navbar-fixed-top navbar-expand-lg navbar-dark bg-dark">
                    <div class="container">
                        <Link className="navbar-brand" to="/">
                        <img src={logo} style={{"border-radius": "100%"}} height="50px" width="60px" alt="CricketLeague Logo" />
                            <span className="text-warning font-weight-bold font-italic"> Cricket League</span>
                        </Link>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                            <ul class="navbar-nav ml-auto">
                                { (currentURL.pathname!="/home" && currentURL.pathname!="/") ? (
                                    <>
                                    <li className="nav-item">
                                    <Link className="nav-link text-white font-weight-bold font-italic" to="/organiser" >Organisers</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white font-weight-bold font-italic" to="/tournament" >Tournaments</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white font-weight-bold font-italic" to="/team" >Teams</Link>     
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white font-weight-bold font-italic" to="/match" >Matches</Link>
                                    </li>
                                    </>
                                    ) : (<>
                                    </>)
                                }
                                <li className="nav-item">
                                    <Link className="nav-link text-warning" to="/logout" > <FontAwesomeIcon icon={faUser} className="mr-2"/>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
    else {
        // define different navlinks here according to getRoles...
    }
}

export default Header;

