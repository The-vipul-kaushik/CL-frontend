import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../stylesheets/Org.css";
import { Link } from "react-router-dom";
import Team from "../models/Team";
import { addTeamService } from "../services/TeamServices";

const AddTeam = () => {
  const [tid, setTid] = useState(0);
  const [team, setTeam] = useState(new Team());
  const [teamToBeAdded, setTeamToBeAdded] = useState(new Team());

  const dispatch = useDispatch();

  useEffect(() => {
    setTeamToBeAdded(new Team());
  }, []);

  const handleChange = (evt) => {
    console.log(evt.target.name);
    console.log(evt.target.value);
    setTid(evt.target.value);
  };

  const handleAddTeam = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setTeamToBeAdded({
      ...teamToBeAdded,
      [e.target.name]: e.target.value,
    });
  };

  const submitAddTeam = (evt) => {
    evt.preventDefault();
    console.log(teamToBeAdded);
    let TeamToAdd = { ...teamToBeAdded };
    addTeamService(TeamToAdd)
      .then((response) => {
        console.log(response.data);
        alert(
          `Team with Team id ${response.data.teamId} added successfully.`
        );
        window.location.reload();
      })
      .catch(() => {
        setTeamToBeAdded(new Team());
        TeamToAdd = "";
        alert("Team could not be added.");
      });
      setTeamToBeAdded(new Team());
  };

  return (
    <center
    // style={{
    //     backgroundImage: `url("https://img.freepik.com/free-photo/yellow-watercolor-texture-background_1083-163.jpg?size=626&ext=jpg&ga=GA1.2.13133608.1651484415")`,
    //     'background-size': '100% 500px',
    //     'width': '100%',
    // }}
    >
      <div className="container pt-5 pb-5">
        <div className="bg-white shadow shadow-regular mb-5 mt-0 px-3 py-3 pb-3 pt-3 col-8 text-center">
          <p className="font-weight-bold">ADD NEW TEAM</p>
          <div className="form form-group">
            <input
              type="text"
              id="teamName"
              name="teamName"
              className="form-control mb-3 mt-3"
              value={teamToBeAdded.teamName}
              onChange={handleAddTeam}
              placeholder="Enter Team Name"
              autoFocus
            />
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              className="form-control mb-3 mt-3"
              value={teamToBeAdded.ownerName}
              onChange={handleAddTeam}
              placeholder="Enter Team Owner"
              autoFocus
            />
            <input
              type="text"
              id="captainName"
              name="captainName"
              className="form-control mb-3 mt-3"
              value={teamToBeAdded.captainName}
              onChange={handleAddTeam}
              placeholder="Enter Team Captain"
              autoFocus
            />
          </div>
          <input
              type="submit"
              className="btn btn-outline-success mb-3 mt-3"
              value="Add Team"
              onClick={submitAddTeam}
            />
          <Link to="/team">
            <button className="btn btn-outline-secondary ml-5">
                Back
            </button>
          </Link>
        </div>
      </div>
    </center>
  );
};

export default AddTeam;
