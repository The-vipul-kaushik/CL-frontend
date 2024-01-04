import { useState, useEffect } from "react";
import Team from "../models/Team";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeams } from "../redux/TeamSlice";
import {
  getAllTeamsService,
  deleteTeamByIdService,
} from "../services/TeamServices";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const TeamData = () => {
  const [allTeams, setAllTeams] = useState([]);
  let [user, setUser] = useState({});

  const teamDataFromStore = useSelector((abc) => abc.team.teamData);
  const allTeamsDataFromStore = useSelector((state) => state.team.teamList);
  // const allPlayersByTeamDataFromStore = useSelector((state) => state.team.playerByTeamList);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('loggedInUser')));
    getAllTeamsService()
      .then((response) => {
        // console.log(response.data);
        dispatch(getAllTeams(response.data));
      })
      .catch((error) => {
        alert(error);
        setAllTeams([]);
      });
  }, []);

  const handleDelete = (idToDelete) => {
    if (window.confirm(`Are you sure to delete Team ${idToDelete}`) == true) {
      deleteTeamByIdService(idToDelete)
        .then((data) => {
          window.location.reload();
          alert("Deleted successfully!");
          // history.push("/organiser");
        })
        .catch((error) => console.error(error));
    } else {
    }
  };

  return (
    <center
      style={{
        backgroundImage: `url("https://img.freepik.com/free-photo/yellow-watercolor-texture-background_1083-163.jpg?size=626&ext=jpg&ga=GA1.2.13133608.1651484415")`,
        "background-size": "100% 500px",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="container pt-3 pb-5">
        <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-7">
          <div>
            {allTeamsDataFromStore.length > 0 ? (
              <div>
                <p className="font-weight-bold">AVAILABLE TEAMS</p>
                {/* <p className="text-primary text-center font-weight-bold lead">List of All Teams</p> */}
                {
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Team Id</th>
                        <th>Team Name</th>
                        <th>Owner</th>
                        <th>Captain</th>
                      </tr>
                    </thead>
                    {allTeamsDataFromStore.map((e) => (
                      <tbody>
                        <tr>
                          <td>{e.teamId}</td>
                          <td>{e.teamName}</td>
                          <td>{e.ownerName}</td>
                          <td>{e.captainName}</td>
                          {(user.role==="ADMIN") ? (
                            <>
                                <td>
                                  <Link to={`/update-team/${e.teamId} `}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                  </Link>
                                </td>
                                <td>
                                  <Link
                                    onClick={() => handleDelete(e.teamId)}
                                    to={"/team"}
                                  >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                  </Link>
                                </td>
                            </>
                          ) : (
                              <></>
                          )}
                         
                        </tr>
                      </tbody>
                    ))}
                  </table>
                }
              </div>
            ) : (
              <>
                <p>Ah!</p>
                <p>There are no Teams...</p>
              </>
            )}
          </div>
        </div>
        <div className="button-container">
          <Link to="/add-team">
            <button className="btn btn-outline-success m">Add New Team</button>
          </Link>
          <Link to="/">
            <button className="btn btn-outline-secondary ml-5">Back</button>
          </Link>
        </div>
      </div>
    </center>
  );
};

export default TeamData;
