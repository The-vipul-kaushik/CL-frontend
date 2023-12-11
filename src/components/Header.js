import { getRoles } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Header = () => {

    let [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('loggedInUser')));
        console.log(JSON.parse(localStorage.getItem('loggedInUser')));
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
                                <li className="nav-item">
                                    <Link className="nav-link text-white font-weight-bold font-italic" to="/organiser" >Organiser</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white font-weight-bold font-italic" to="/tournament" >Tournament</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white font-weight-bold font-italic" to="/team" >Team</Link>     
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white font-weight-bold font-italic" to="/match" >Match</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link text-white font-weight-bold font-italic" to="/dept" >Ticket</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white font-weight-bold font-italic" to="/dept" >Audience</Link>
                                </li> */}
                                <li className="nav-item">
                                    <Link className="nav-link text-warning" to="/logout" >Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
    else if(user.role=="OWNER") {
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
                                    <Link className="nav-link text-white font-weight-bold font-italic" to="/team" >Team</Link>  
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-warning" to="/logout" >Logout</Link>
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
                                <li className="nav-item">
                                    <Link className="nav-link text-white font-weight-bold font-italic" to="/ticket" >Ticket</Link>  
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-warning" to="/logout" >Logout</Link>
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

    
    // }
    // else {

    // }


    // return (
    //     <header class="header sticky-top">
    //         <nav class="navbar navbar-fixed-top navbar-expand-lg navbar-dark bg-dark">
    //             <div class="container">
    //                 <Link className="navbar-brand" to="/">
    //                     <img src="https://www.capgemini.com/wp-content/themes/capgemini-komposite/assets/images/logo.svg"
    //                         height="24px" alt="Capgemini" />
    //                 </Link>
    //                 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
    //                     <span class="navbar-toggler-icon"></span>
    //                 </button>
    //                 <div class="collapse navbar-collapse" id="navbarResponsive">
    //                     <ul class="navbar-nav ml-auto">
    //                         <li className="nav-item">
    //                             <Link className="nav-link" to="/register" >Register</Link>
    //                         </li>
    //                         <li className="nav-item">
    //                             <Link className="nav-link" to="/login" >Login</Link>
    //                         </li>
    //                     </ul>
    //                 </div>
    //             </div>
    //         </nav>
    //     </header>
    // );

}

export default Header;

