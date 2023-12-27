import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../stylesheets/Org.css";
import { Link, useParams } from "react-router-dom";
import Organiser from "../models/Organiser";
import { getTourByIdService } from "../services/TournamentService";
import { updateTourService } from "../services/TournamentService";
import { useLocation } from "react-router-dom";
import { getTourById } from "../redux/TourSlice";
import { useHistory } from "react-router-dom";
import Tournament from "../models/Tournament";

const UpdateTournament = () => {
  const [tid, setTid] = useState(0);
  const [tour, setTour] = useState(new Tournament());
  const [tourToBeUpdated, setTourToBeUpdated] = useState(new Tournament());
  const [organiser, setOrganiser] = useState(new Organiser());

  const location = useLocation();
  // const params = new URLSearchParams(location.search);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getTourByIdService(id)
      .then((response) => {
        dispatch(getTourById(response.data));
        console.log(response.data);
        setTourToBeUpdated(response.data);
        setOrganiser(response.data.Organiser);
      })
      .catch((error) => {
        alert(`Tournament with Tournament id ${tid} not found !`);
      });
  }, []);

  const handleChange = (evt) => {
    console.log(evt.target.name);
    console.log(evt.target.value);
    setTid(evt.target.value);
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
        history.push("/tournament");
      })
      .catch(() => {
        setTourToBeUpdated(new Tournament());
        TourToUpdate = "";
        alert("Tournament could not be updated.");
      });
    setTourToBeUpdated(new Tournament());
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
          <p className="font-weight-bold">UPDATE ORGANISER</p>
          <div className="form form-group">
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
              placeholder="Enter Tournament Name"
            />
            <input
              type="number"
              id="organiserId"
              name="organiserId"
              className="form-control mb-3 mt-3"
              value={organiser.organiserId}
              onChange={handleUpdateTour}
              placeholder="Enter Organiser Id"
            />
        </div>
        <input
            type="submit"
            className="btn btn-outline-success mb-3 mt-3"
            value="Update Tournament"
            onClick={submitUpdateTour}
          />
          <Link to="/tournament">
            <button className="btn btn-outline-secondary ml-5">Back</button>
          </Link>
        </div>
      </div>
    </center>
  );
};

export default UpdateTournament;
