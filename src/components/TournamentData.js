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
  let [user, setUser] = useState({});

  const tourDataFromStore = useSelector((abc) => abc.tour.tourData);
  const allToursDataFromStore = useSelector((state) => state.tour.tourList);
  const allMatchesDataFromStore = useSelector((state) => state.tour.matchList);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('loggedInUser')));
    getAllToursService()
      .then((response) => {
        // console.log(response.data);
        dispatch(getAllTours(response.data));
      })
      .catch((error) => {
        alert(error);
        setAllTours([]);
      });
    // console.log(allToursDataFromStore);
  }, []);

  const handleChange = (evt) => {
    // console.log(evt.target.name);
    // console.log(evt.target.value);
    setTid(evt.target.value);
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
    style={{
        backgroundImage: `url("https://img.freepik.com/free-photo/yellow-watercolor-texture-background_1083-163.jpg?size=626&ext=jpg&ga=GA1.2.13133608.1651484415")`,
        'background-size': '100% 500px',
        'width': '100%',
    }}
    >
      <div className="container pt-1 pb-5">
        <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-8">
         
          <div className="form form-group">
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
                            {(user.role==="ADMIN") ? (
                              <>
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
      </div>
    </center>
  );
};

export default TournamentData;
