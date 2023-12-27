import { useState, useEffect } from "react";
import Tournament from "../models/Tournament";
import { useDispatch, useSelector } from "react-redux";
import { getTourById } from "../redux/TourSlice";
import { getAllTours } from "../redux/TourSlice";
import { getAllMatches } from "../redux/TourSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  getTourByIdService,
  getAllToursService,
  addTourService,
  updateTourService,
  getMatchesByTourIdService,
} from "../services/TournamentService";
import Organiser from "../models/Organiser";
import { Link } from "react-router-dom";

const TournamentData = () => {
  const [tid, setTid] = useState(0);
  const [Tour, setTour] = useState(new Tournament());
  const [tourToBeAdded, setTourToBeAdded] = useState(new Tournament());
  const [organiser, setOrganiser] = useState(new Organiser());
  const [tourToBeUpdated, setTourToBeUpdated] = useState(new Tournament());
  const [allTours, setAllTours] = useState([]);
  const [allMatches, setAllMatches] = useState([]);

  const tourDataFromStore = useSelector((abc) => abc.tour.tourData);
  const allToursDataFromStore = useSelector((state) => state.tour.tourList);
  const allMatchesDataFromStore = useSelector((state) => state.tour.matchList);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllToursService()
      .then((response) => {
        console.log(response.data);
        dispatch(getAllTours(response.data));
      })
      .catch((error) => {
        alert(error);
        setAllTours([]);
      });
    console.log(allToursDataFromStore);
  }, []);

  const handleChange = (evt) => {
    console.log(evt.target.name);
    console.log(evt.target.value);
    setTid(evt.target.value);
  };

  const handleAddTour = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setTourToBeAdded({
      ...tourToBeAdded,
      [e.target.name]: e.target.value,
    });

    setOrganiser({
      ...organiser,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateTour = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setTourToBeUpdated({
      ...tourToBeUpdated,
      [e.target.name]: e.target.value,
    });

    setOrganiser({
      ...organiser,
      [e.target.name]: e.target.value,
    });
  };

  const submitGetTourById = (evt) => {
    console.log(tid);
    evt.preventDefault();
    getTourByIdService(tid)
      .then((response) => {
        console.log(response.data);
        dispatch(getTourById(response.data));
        setTid(response.data.tournamentId);
      })
      .catch((error) => {
        alert(`Tournament with Tournament id ${tid} not found !`);
        setTour(new Tournament());
      });
    setTid("");
  };

  const submitGetAllTours = (evt) => {
    evt.preventDefault();
    getAllToursService()
      .then((response) => {
        console.log(response.data);
        dispatch(getAllTours(response.data));
      })
      .catch((error) => {
        alert(error);
        setAllTours([]);
      });
  };

  const submitGetMatchByTourId = (evt) => {
    evt.preventDefault();
    getMatchesByTourIdService(tid)
      .then((response) => {
        console.log(response.data);
        dispatch(getAllMatches(response.data));
      })
      .catch((error) => {
        alert(error);
        setAllMatches([]);
      });
  };

  const submitAddTour = (evt) => {
    evt.preventDefault();
    console.log(tourToBeAdded);
    let TourToAdd = { ...tourToBeAdded, organiser };
    addTourService(TourToAdd)
      .then((response) => {
        console.log(response.data);
        alert(
          `Tournament with Tournament id ${response.data.tournamentId} added successfully.`
        );
      })
      .catch(() => {
        setTourToBeAdded(new Tournament());
        TourToAdd = "";
        alert("Tournament could not be added.");
      });
  };

  const submitUpdateTour = (evt) => {
    evt.preventDefault();
    console.log(tourToBeUpdated);
    let TourToUpdate = { ...tourToBeUpdated, organiser };
    updateTourService(TourToUpdate)
      .then((response) => {
        console.log(response.data);
        alert(
          `Tournament with Tournament id ${response.data.tournamentId} updated successfully.`
        );
      })
      .catch(() => {
        setTourToBeUpdated(new Tournament());
        TourToUpdate = "";
        alert("Tournament could not be updated.");
      });
  };

  const handleDelete = (idToDelete) => {
    if (
      window.confirm(`Are you sure to delete Organiser ${idToDelete}`) == true
    ) {
      //   deleteOrganiserByIdService(idToDelete)
      //     .then((data) => {
      //       window.location.reload();
      //       alert("Deleted successfully!");
      //       // history.push("/organiser");
      //     })
      //     .catch((error) => console.error(error));
    } else {
    }
  };

  return (
    <center
    // style={{
    //     backgroundImage: `url("https://img.freepik.com/free-photo/yellow-watercolor-texture-background_1083-163.jpg?size=626&ext=jpg&ga=GA1.2.13133608.1651484415")`,
    //     'background-size': '100% 500px',
    //     'width': '100%',
    // }}
    >
      <div className="container pt-1 pb-5">
        {/* <div className="bg-white shadow shadow-regular mb-3 mt-5 px-3 py-3 pb-3 pt-3 col-8 text-center">
                <p className="font-weight-bold">ADD NEW TOURNAMENT</p>
                <div className="form form-group" >
                    <input
                        type="text"
                        id="tournamentName"
                        name="tournamentName"
                        className="form-control mb-3 mt-3"
                        value={tourToBeAdded.tournamentName}
                        onChange={handleAddTour}
                        placeholder="Enter Tournament Name" 
                        autoFocus/>
                    <input
                        type="number"
                        id="organiserId"
                        name="organiserId"
                        className="form-control mb-3 mt-3"
                        value={organiser.organiserId}
                        onChange={handleAddTour}
                        placeholder="Enter Organiser Id" />
                    <input
                        type="submit"
                        className="btn btn-success form-control mb-3 mt-3"
                        value="Add Tournament"
                        onClick={submitAddTour}
                    />
                </div>
            </div> */}
        {/* <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-8">
                <p className="font-weight-bold">SEARCH AN EXISTING TOURNAMENT</p>
                <div>
                    <form className="form form-group">
                        <input
                            type="number"
                            className="form-control mb-3 mt-3"
                            id="tid"
                            value={tid}
                            placeholder="Enter Tournament id"
                            onChange={handleChange}
                             />
                        <input type="submit" className="form-control mb-3 mt-3 btn btn-primary" value="Get Tournament" onClick={submitGetTourById} />
                    </form>
                </div>
                <div> {(tourDataFromStore.tournamentId) &&
                    <div>
                        <p className="font-weight-bold">Tournament data:</p>
                        <p> Tournament id: {tourDataFromStore.tournamentId} </p>
                        <p> Touranier Name: {tourDataFromStore.tournamentName} </p>
                        <p> Organiser id: {tourDataFromStore.organiser.organiserId} </p>
                        <p> Organiser Name: {tourDataFromStore.organiser.organiserName} </p>
                    </div>
                }
                </div>
            </div>
             */}
        <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-8">
         
          <div className="form form-group">
            {/* <input
                        type="button"
                        className="btn btn-primary form-control mb-3 mt-3"
                        value="Get All Tournaments"
                        onClick={submitGetAllTours}
                    /> */}
          </div>
          <div>
            <div>
              {allToursDataFromStore.length>0 ? (
                <div>
                     <p className="font-weight-bold">AVAILABLE TOURNAMENTS</p>
                  {
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Tournament</th>
                          <th>Organiser</th>
                        </tr>
                      </thead>
                      {allToursDataFromStore.map((e) => (
                        <tbody>
                          <tr>
                            <td>{e.tournamentId}</td>
                            <td>{e.tournamentName}</td>
                            <td>{e.organiser.organiserName}</td>
                            <td>
                              <Link to={`/update-tournament/${e.tournamentId}`}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </Link>
                            </td>
                            <td>
                              <Link 
                                onClick={() => handleDelete(e.tournamentId)}
                                to={"/tournament"}
                              >
                                <FontAwesomeIcon icon={faTrashCan} />
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  }
                </div>
              ) : (
                <>
                  <p>Ah!</p>
                  <p>There are no Tournaments...</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="button-container">
          <Link to="/add-tournament">
            <button className="btn btn-outline-success m">
              Add New Tournament
            </button>
          </Link>
          <Link to="/">
            <button className="btn btn-outline-secondary ml-5">Back</button>
          </Link>
        </div>

        {/* <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-8">
                <p className="font-weight-bold">UPDATE AN EXISTING TOURNAMENT</p>
                <div className="form form-group" >
                    <input
                        type="number"
                        className="form-control mb-3 mt-3"
                        id="tournamentId"
                        name="tournamentId"
                        value={tourToBeUpdated.tournamentId}
                        placeholder="Enter Tournament id"
                        onChange={handleUpdateTour}
                        />
                    <input
                        type="text"
                        id="tournamentName"
                        name="tournamentName"
                        className="form-control mb-3 mt-3"
                        value={tourToBeUpdated.tournamentName}
                        onChange={handleUpdateTour}
                        placeholder="Enter Tournament Name" />
                    <input
                        type="number"
                        id="organiserId"
                        name="organiserId"
                        className="form-control mb-3 mt-3"
                        value={organiser.organiserId}
                        onChange={handleUpdateTour}
                        placeholder="Enter Organiser Id" />
                    <input
                        type="submit"
                        className="btn btn-warning form-control mb-3 mt-3"
                        value="Update Tournament"
                        onClick={submitUpdateTour}
                    />
                </div>
            </div> */}

        {/* <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-8">
                <p className="font-weight-bold">FIND ALL MATCHES OF A TOURNAMENT</p>
                <div>
                    <form className="form form-group">
                        <input
                            type="number"
                            className="form-control mb-3 mt-3"
                            id="tid"
                            name="TournamentId"
                            value={tid}
                            placeholder="Enter Tournament id"
                            onChange={handleChange}
                             />
                        <input type="submit" className="form-control mb-3 mt-3 btn btn-primary" value="Get Matches" onClick={submitGetMatchByTourId} />
                    </form>
                </div>
                <div>
                    <div> {(allMatchesDataFromStore) &&
                        <div>
                            <p className="text-primary text-center font-weight-bold lead">List of All Matches with Tournament id {tid}</p>
                            {
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Match Id</th>
                                            <th>Match Name</th>
                                            <th>Match Venue</th>
                                            <th>Match Date</th>
                                            <th>Tournament Id</th>
                                        </tr>
                                    </thead>
                                    {allMatchesDataFromStore.map((e =>
                                        <tbody>
                                            <tr>
                                                <td>{e.matchId}</td>
                                                <td>{e.matchName}</td>
                                                <td>{e.matchVenue}</td>
                                                <td>{e.matchDate}</td>
                                                <td>{e.tournament.tournamentId}</td>
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

export default TournamentData;
