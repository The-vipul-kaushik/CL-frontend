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
  getAllAudiencesService,
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
  const [matchN, setMatchN] = useState(new Match());
  const [allAudiencesByMatch, setAllAudiencesByMatch] = useState([]);
  const [matchToBeAdded, setMatchToBeAdded] = useState(new Match());
  const [matchToBeUpdated, setMatchToBeUpdated] = useState(new Match());
  const [tournamentUp, setTournamentUp] = useState(new Tournament());
  const [allMatches, setAllMatches] = useState([]);
  const [midD, setMidD] = useState(0);

  const matchDataFromStore = useSelector((abc) => abc.match.matchData);
  const allMatchesDataFromStore = useSelector((state) => state.match.matchList);
  // const allPlayersByTeamDataFromStore = useSelector((state) => state.team.playerByTeamList);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllMatchesService()
      .then((response) => {
        console.log(response.data);
        dispatch(getAllMatches(response.data));
      })
      .catch((error) => {
        alert(error);
        setAllMatches([]);
      });
  }, []);

  const handleGetMatchById = (evt) => {
    console.log(evt.target.name);
    console.log(evt.target.value);
    setMid(evt.target.value);
  };

  const submitGetMatchById = (evt) => {
    console.log(mid);
    evt.preventDefault();
    getMatchByIdService(mid)
      .then((response) => {
        dispatch(getMatchById(response.data));
        setMid(response.data.teamId);
      })
      .catch((error) => {
        alert(`Match with matchId ${mid} not found !`);
        setMatch(new Match());
      });
    setMid("");
  };

  const handleGetMatchByName = (evt) => {
    console.log(evt.target.name);
    console.log(evt.target.value);
    setMname(evt.target.value);
  };

  const submitGetMatchByName = (evt) => {
    console.log(mname);
    evt.preventDefault();
    getMatchByNameService(mname)
      .then((response) => {
        setMatchN(response.data);
      })
      .catch((error) => {
        alert(`Match with matchName ${mname} not found !`);
        setMatchN(new Match());
      });
    setMname("");
  };

  const handleGetAllAudiencesByMatch = (evt) => {
    console.log(evt.target.name);
    console.log(evt.target.value);
    setMidA(evt.target.value);
  };

  const submitGetAllAudiencesByMatch = (evt) => {
    evt.preventDefault();
    getAudiencesByMatchIdService(midA)
      .then((response) => {
        console.log(response.data);
        setAllAudiencesByMatch(response.data);
        // setTidP(response.data[0].team.teamId);
      })
      .catch((error) => {
        alert(`Audiences with matchId ${midA} not found !`);
        setAllAudiencesByMatch([]);
      });
    // setTidP('');
  };

  const handleGetTournamentByMatch = (evt) => {
    console.log(evt.target.name);
    console.log(evt.target.value);
    setMidT(evt.target.value);
  };

  const submitGetTournamentByMatch = (evt) => {
    evt.preventDefault();
    getTournamentByMatchIdService(midT)
      .then((response) => {
        console.log(response.data);
        setTournament(response.data);
        // setTidP(response.data[0].team.teamId);
      })
      .catch((error) => {
        alert(`Tournamnet with matchId ${midT} not found !`);
        setTournament({});
      });
    // setTidP('');
  };

  const submitGetAllMatches = (evt) => {
    evt.preventDefault();
    getAllMatchesService()
      .then((response) => {
        console.log(response.data);
        dispatch(getAllMatches(response.data));
      })
      .catch((error) => {
        alert(error);
        setAllMatches([]);
      });
  };

  const handleAddMatch = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setMatchToBeAdded({
      ...matchToBeAdded,
      [e.target.name]: e.target.value,
    });

    setTournament({
      ...tournament,
      [e.target.name]: e.target.value,
    });
  };

  const submitAddMatch = (evt) => {
    evt.preventDefault();
    console.log(matchToBeAdded);
    let MatchToAdd = { ...matchToBeAdded, tournament };
    console.log(MatchToAdd);
    addMatchService(MatchToAdd)
      .then((response) => {
        console.log(response.data);
        alert(
          `Match with Match id ${response.data.matchId} added successfully.`
        );
      })
      .catch(() => {
        setMatchToBeAdded(new Match());
        MatchToAdd = "";
        setTournament(new Tournament());
        alert("Match could not be added.");
      });
  };

  const handleUpdateMatch = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setMatchToBeUpdated({
      ...matchToBeUpdated,
      [e.target.name]: e.target.value,
    });

    setTournament({
      ...tournament,
      [e.target.name]: e.target.value,
    });
  };

  const submitUpdateMatch = (evt) => {
    evt.preventDefault();
    let MatchToUpdate = { ...matchToBeUpdated, tournament };
    updateMatchService(MatchToUpdate)
      .then((response) => {
        console.log(response.data);
        alert(
          `Match with matchId ${response.data.matchId} updated successfully.`
        );
      })
      .catch(() => {
        setMatchToBeUpdated(new Match());
        MatchToUpdate = "";
        setTournament(new Tournament());
        alert("Match could not be updated.");
      });
  };

  const handleDeleteMatchById = (evt) => {
    console.log(evt.target.name);
    console.log(evt.target.value);
    setMidD(evt.target.value);
  };

  const handleDelete = (idToDelete) => {
    if (
        window.confirm(`Are you sure to delete Match ${idToDelete}`) == true
      ) {
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
    <center>
      <div className="container">
        {/* <div className="bg-white shadow shadow-regular mb-3 mt-5 px-3 py-3 pb-3 pt-3 col-7 text-center">
                    <p>Add New Match</p>
                    <div className="form form-group" >
                        <input
                            type="text"
                            id="matchName"
                            name="matchName"
                            className="form-control mb-3 mt-3"
                            value={matchToBeAdded.matchName}
                            onChange={handleAddMatch}
                            placeholder="Enter Match Name" />
                        <input
                            type="text"
                            id="matchVenue"
                            name="matchVenue"
                            className="form-control mb-3 mt-3"
                            value={matchToBeAdded.matchVenue}
                            onChange={handleAddMatch}
                            placeholder="Enter Match Venue" />
                        <input
                            type="date"
                            id="matchDate"
                            name="matchDate"
                            className="form-control mb-3 mt-3"
                            value={matchToBeAdded.matchDate}
                            onChange={handleAddMatch}
                            placeholder="Enter Match Date" />
                        <input
                            type="number"
                            id="tournamentId"
                            name="tournamentId"
                            className="form-control mb-3 mt-3"
                            value={tournament.tournamentId}
                            onChange={handleAddMatch}
                            placeholder="Enter tournament id" />
                        <input
                            type="submit"
                            className="btn btn-primary form-control mb-3 mt-3"
                            value="Add Match"
                            onClick={submitAddMatch}
                        />
                    </div>
                </div>
                <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-7">
                    <p>Find a Match</p>
                    <div>
                        <form className="form form-group">
                            <input
                                type="number"
                                className="form-control mb-3 mt-3"
                                id="mid"
                                value={mid}
                                placeholder="Enter Match id"
                                onChange={handleGetMatchById}
                                autoFocus />
                            <input type="submit" className="form-control mb-3 mt-3 btn btn-primary" value="Get Match" onClick={submitGetMatchById} />
                        </form>
                    </div>
                    <div> {(matchDataFromStore.matchId) &&
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Match id</th>
                                    <td>{matchDataFromStore.matchId}</td>
                                </tr>
                                <tr>
                                    <th>Match Name</th>
                                    <td>{matchDataFromStore.matchName}</td>
                                </tr>
                                <tr>
                                    <th>Match Venue</th>
                                    <td>{matchDataFromStore.matchVenue}</td>
                                </tr>
                                <tr>
                                    <th>Match Date</th>
                                    <td>{matchDataFromStore.matchSchedule.toString().substring(0, 10)}</td>
                                </tr>
                            </thead>
                        </table>
                        // <div className="card">
                        //     <p className="font-weight-bold text-center card-header">Match data:</p>
                        //     <div className="card-body text-left">
                        //     <p> Match id: {matchDataFromStore.matchId} </p>
                        //     <p> Match Name: {matchDataFromStore.matchName} </p>
                        //     <p> Match Venue: {matchDataFromStore.matchVenue} </p>
                        //     <p> Match Date: {matchDataFromStore.matchSchedule.toString().substring(0, 10)}</p>
                        //     </div>
                        // </div>
                    }

                    </div>
                </div>

                <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-7">
                    <p>Find a Match by Match Name</p>
                    <div>
                        <form className="form form-group">
                            <input
                                type="text"
                                className="form-control mb-3 mt-3"
                                id="mname"
                                value={mname}
                                placeholder="Enter Match Name"
                                onChange={handleGetMatchByName} />
                            <input
                                type="submit"
                                className="form-control mb-3 mt-3 btn btn-primary"
                                value="Get Match"
                                onClick={submitGetMatchByName} />
                        </form>
                    </div>
                    <div> {(matchN.matchName) &&
                        <div>
                            <p className="font-weight-bold">Match data:</p>
                            <p> Match id: {matchN.matchId} </p>
                            <p> Match Name: {matchN.matchName} </p>
                            <p> Match Venue: {matchN.matchVenue} </p>
                            <p> Match Date: {matchN.matchSchedule.toString().substring(0, 10)}</p>
                        </div>
                    }</div>
                </div>

                <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-7">
                    <p>Find a Tournament By Match</p>
                    <div>
                        <form className="form form-group">
                            <input
                                type="number"
                                className="form-control mb-3 mt-3"
                                id="midT"
                                value={midT}
                                placeholder="Enter Match id"
                                onChange={handleGetTournamentByMatch} />
                            <input
                                type="submit"
                                className="form-control mb-3 mt-3 btn btn-primary"
                                value="Get Tournament"
                                onClick={submitGetTournamentByMatch} />
                        </form>
                    </div>
                    <div> {(tournament.tournamentId) &&
                        <div>
                            <p className="font-weight-bold">Tournament data:</p>
                            <p> Tournamnet id: {tournament.tournamentId} </p>
                            <p> Tournament Name: {tournament.tournamentName} </p>
                            <p> Organiser: {tournament.organiser.organiserName}</p>
                        </div>
                    }

                    </div>
                </div>

                <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-7">
                    <p>Update Match</p>
                    <div className="form form-group" >
                        <input
                            type="number"
                            className="form-control mb-3 mt-3"
                            id="matchId"
                            name="matchId"
                            value={matchToBeUpdated.matchId}
                            placeholder="Enter Match id"
                            onChange={handleUpdateMatch}
                        />
                        <input
                            type="text"
                            id="matchName"
                            name="matchName"
                            className="form-control mb-3 mt-3"
                            value={matchToBeUpdated.matchName}
                            onChange={handleUpdateMatch}
                            placeholder="Enter Match Name" />
                        <input
                            type="text"
                            id="matchVenue"
                            name="matchVenue"
                            className="form-control mb-3 mt-3"
                            value={matchToBeUpdated.matchVenue}
                            onChange={handleUpdateMatch}
                            placeholder="Enter Match Venue" />
                        <input
                            type="date"
                            id="matchDate"
                            name="matchDate"
                            className="form-control mb-3 mt-3"
                            value={matchToBeUpdated.matchDate}
                            onChange={handleUpdateMatch}
                            placeholder="Enter Match Date" />
                        <input
                            type="number"
                            id="tournamentId"
                            name="tournamentId"
                            className="form-control mb-3 mt-3"
                            value={tournament.tournamentId}
                            onChange={handleUpdateMatch}
                            placeholder="Enter Tournament Id" />
                        <input
                            type="submit"
                            className="btn btn-primary form-control mb-3 mt-3"
                            value="Update Match"
                            onClick={submitUpdateMatch}
                        />
                    </div>
                </div>

                <div className="bg-white shadow shadow-regular mb-3 mt-3 px-3 py-3 pb-3 pt-3 col-7">
                    <p>Delete a Match</p>
                    <div>
                        <form className="form form-group">
                            <input
                                type="number"
                                className="form-control mb-3 mt-3"
                                id="midD"
                                value={midD}
                                placeholder="Enter Match Id"
                                onChange={handleDeleteMatchById}
                            />
                            <input 
                                id="btn3" 
                                type="submit" 
                                className="form-control mb-3 mt-3 btn btn-danger" 
                                value="Delete Match" 
                                onClick={submitDeleteMatchById} />
                        </form>
                    </div>
                </div> */}

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

        {/* <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-7">
                    <p>Get All Audiences By Match</p>
                    <div className="form form-group" >
                        <input
                            type="number"
                            className="form-control mb-3 mt-3"
                            id="midA"
                            value={midA}
                            placeholder="Enter Match Id"
                            onChange={handleGetAllAudiencesByMatch} />
                        <input
                            type="button"
                            className="btn btn-primary form-control mb-3 mt-3"
                            value="Get All Audiences By Match"
                            onClick={submitGetAllAudiencesByMatch}
                        />
                    </div>
                    <div>
                        <div> {(allAudiencesByMatch) &&
                            <div>
                                <p className="text-primary text-center font-weight-bold lead">List of All Audiences By Match</p>
                                {
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Match Id</th>
                                                <th>Audience Id</th>
                                                <th>Audience Name</th>
                                                <th>Ticket ID</th>
                                                <th>Ticket Name</th>
                                                <th>No. of Seats</th>
                                            </tr>
                                        </thead>
                                        {allAudiencesByMatch.map((e =>
                                            <tbody>
                                                <tr>
                                                    <td>{e.matches.matchId}</td>
                                                    <td>{e.audienceId}</td>
                                                    <td>{e.audienceName}</td>
                                                    <td>{e.tickets.ticketId}</td>
                                                    <td>{e.tickets.ticketName}</td>
                                                    <td>{e.tickets.noOfSeats}</td>


                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                }
                            </div>
                        }
                        </div>
                    </div>
                </div> */}
      </div>
    </center>
  );
};

export default MatchData;
