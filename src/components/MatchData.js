import { useState, useEffect } from "react";
import Match from "../models/Match";
import Tournament from "../models/Tournament";
import { useDispatch, useSelector } from "react-redux";
import { getMatchById, getAllMatches } from "../redux/MatchSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  getMatchByIdService,
  getMatchByNameService,
  getAllMatchesService,
  addMatchService,
  updateMatchService,
  getTournamentByMatchIdService,
  getAudiencesByMatchIdService,
  deleteMatchByIdService,
} from "../services/MatchServices";

const MatchData = () => {
  const [mid, setMid] = useState(0);
  const [match, setMatch] = useState(new Match());
  const [midA, setMidA] = useState(0);
  const [midT, setMidT] = useState(0);
  const [tournament, setTournament] = useState(new Tournament());
  const [mname, setMname] = useState(``);
  const [matchToBeAdded, setMatchToBeAdded] = useState(new Match());
  const [matchToBeUpdated, setMatchToBeUpdated] = useState(new Match());
  const [allMatches, setAllMatches] = useState([]);
  const [midD, setMidD] = useState(0);
  let [user, setUser] = useState({});

  const matchDataFromStore = useSelector((abc) => abc.match.matchData);
  const allMatchesDataFromStore = useSelector((state) => state.match.matchList);
  // const allPlayersByTeamDataFromStore = useSelector((state) => state.team.playerByTeamList);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("loggedInUser")));
    getAllMatchesService()
      .then((response) => {
        // console.log(response.data);
        dispatch(getAllMatches(response.data));
      })
      .catch((error) => {
        alert(error);
        setAllMatches([]);
      });
  }, []);

  const handleGetMatchById = (evt) => {
    // console.log(evt.target.name);
    // console.log(evt.target.value);
    setMid(evt.target.value);
  };

  const handleDelete = (idToDelete) => {
    if (window.confirm(`Are you sure to delete Match ${idToDelete}`) == true) {
      deleteMatchByIdService(idToDelete)
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
      <div className="container pt-5 pb-5">
        <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-7">
          <div>
            <div>
              {allMatchesDataFromStore.length > 0 ? (
                <div>
                  <p className="font-weight-bold">AVAILABLE MATCHES</p>
                  {
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Match Id</th>
                          <th>Match Name</th>
                          <th>Match Venue</th>
                          <th>Match Date</th>
                        </tr>
                      </thead>
                      {allMatchesDataFromStore.map((e) => (
                        <tbody>
                          {e.matchName !== null && (
                            <tr>
                              <td>{e.matchId}</td>
                              <td>{e.matchName}</td>
                              <td>{e.matchVenue}</td>
                              <td>{e.matchDate.toString().substring(0, 10)}</td>
                              {user.role === "ADMIN" ? (
                                <>
                                  <td>
                                    <Link to={`/update-match/${e.matchId}`}>
                                      <FontAwesomeIcon icon={faPenToSquare} />
                                    </Link>
                                  </td>
                                  <td>
                                    <Link
                                      onClick={() => handleDelete(e.matchId)}
                                      to={"/match"}
                                    >
                                      <FontAwesomeIcon icon={faTrashCan} />
                                    </Link>
                                  </td>
                                </>
                              ) : (
                                <></>
                              )}
                            </tr>
                          )}
                        </tbody>
                      ))}
                    </table>
                  }
                </div>
              ) : (
                <>
                  <p>Ah!</p>
                  <p>There are no Matches...</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="button-container">
          <Link to="/add-match">
            <button className="btn btn-outline-success m">Add New Match</button>
          </Link>
          <Link to="/">
            <button className="btn btn-outline-secondary ml-5">Back</button>
          </Link>
        </div>
      </div>
    </center>
  );
};

export default MatchData;
