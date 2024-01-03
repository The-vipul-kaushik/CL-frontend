import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Team from "../models/Team";
import { getTeamByIdService } from "../services/TeamServices";
import { getTeamById } from "../redux/TeamSlice";
import { updateTeamService } from "../services/TeamServices";

const UpdateTeam = () => {
  const [tid, setTid] = useState(0);
  const [team, setTeam] = useState(new Team());
  const [teamToBeUpdated, setTeamToBeUpdated] = useState(new Team());

  const location = useLocation();
  // const params = new URLSearchParams(location.search);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getTeamByIdService(id)
      .then((response) => {
        dispatch(getTeamById(response.data));
        console.log(response.data);
        setTeamToBeUpdated(response.data);
      })
      .catch((error) => {
        alert(`Team with Team id ${tid} not found !`);
      });
  }, []);

  const handleChange = (evt) => {
    console.log(evt.target.name);
    console.log(evt.target.value);
    setTid(evt.target.value);
  };

  const handleUpdateTeam = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setTeamToBeUpdated({
      ...teamToBeUpdated,
      [e.target.name]: e.target.value,
    });
  };

  const submitUpdateTeam = (evt) => {
    evt.preventDefault();
    console.log(teamToBeUpdated);
    let TeamToUpdate = { ...teamToBeUpdated };
    updateTeamService(TeamToUpdate)
      .then((response) => {
        console.log(response.data);
        alert(
          `Team with Team id ${response.data.teamId} Updated successfully.`
        );
        history.push("/team");
      })
      .catch(() => {
        setTeamToBeUpdated(new Team());
        TeamToUpdate = "";
        alert("Team could not be Updated.");
      });
    setTeamToBeUpdated(new Team());
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
          <p className="font-weight-bold">UPDATE TEAM</p>
          <div className="form form-group">
          <input
              type="text"
              id="teamName"
              name="teamName"
              className="form-control mb-3 mt-3"
              value={teamToBeUpdated.teamName}
              onChange={handleUpdateTeam}
              placeholder="Enter Team Name"
              autoFocus
            />
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              className="form-control mb-3 mt-3"
              value={teamToBeUpdated.ownerName}
              onChange={handleUpdateTeam}
              placeholder="Enter Team Owner"
              autoFocus
            />
            <input
              type="text"
              id="captainName"
              name="captainName"
              className="form-control mb-3 mt-3"
              value={teamToBeUpdated.captainName}
              onChange={handleUpdateTeam}
              placeholder="Enter Team Captain"
              autoFocus
            />
          </div>
          <input
            type="submit"
            className="btn btn-outline-success mb-3 mt-3"
            value="Update Team"
            onClick={submitUpdateTeam}
          />
          <Link to="/team">
            <button className="btn btn-outline-secondary ml-5">Back</button>
          </Link>
        </div>
      </div>
    </center>
  );
};

export default UpdateTeam;
