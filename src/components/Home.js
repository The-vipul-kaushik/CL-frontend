import { Link } from "react-router-dom";
import background1 from "../images/cricLeagueimg.jpg";
import background2 from "../images/home1.jpg";
import cric from "../images/cric.gif";
import { useEffect, useState } from "react";

const Home = () => {
  let [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("loggedInUser")));
    // console.log(JSON.parse(localStorage.getItem("loggedInUser")));
  }, []);

  if (user == null) {
    return (
      <div
        style={{
          backgroundImage: `url(${background1})`,
          "background-repeat": "no-repeat",
          "background-size": "cover",
          "background-position": "center",
          opacity: "0.98 ",
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="container mt-5 align-items-center bg-warning">
          <h1 className="display-5 text-dark text-center">
            Welcome to Cricket League Application
          </h1>
        </div>
        <div className="text-center pb-3 mb-3 mt-6 pt-6">
          <img
            src={cric}
            alt="Cricket Animation"
            style={{ width: "10%", height: "10%" }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <center
        style={{
          backgroundImage: `url(${background2})`,
          "background-repeat": "no-repeat",
          "background-size": "cover",
          "background-position": "center",
          opacity: "0.8",
          width: "100%",
          height: "100vh",
          padding: "10vh",
        }}
      >
        <div
          className="flex-container"
          style={{ width: "50%", justifyContent: "center" }}
        >
          <Link to="/organiser" className="btn btn-light mt-5 btn-block">ORGANISERS</Link>
          <Link to="/tournament" className="btn btn-success mt-3 btn-block">TOURNAMENTS</Link>
          <Link to="/team" className="btn btn-primary mt-3 btn-block">TEAMS</Link>
          <Link to="/match" className="btn btn-warning mt-3 btn-block">MATCHES</Link>
        </div>
      </center>
    );
  }
};

export default Home;
