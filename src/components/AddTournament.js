import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../stylesheets/Org.css";
import { addTourService } from "../services/TournamentService";
import { Link } from "react-router-dom";
import Organiser from "../models/Organiser";
import Tournament from "../models/Tournament";

const AddTournament = () => {
  const [tid, setTid] = useState(0);
  const [Tour, setTour] = useState(new Tournament());
  const [org, setOrg] = useState(new Organiser());
  const [tourToBeAdded, setTourToBeAdded] = useState(new Tournament());
  const [organiser, setOrganiser] = useState(new Organiser());

  const dispatch = useDispatch();

  useEffect(() => {
    setTourToBeAdded(new Tournament());
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
          <p className="font-weight-bold">ADD NEW TOURNAMENT</p>
          <div className="form form-group">
            <input
              type="text"
              id="tournamentName"
              name="tournamentName"
              className="form-control mb-3 mt-3"
              value={tourToBeAdded.tournamentName}
              onChange={handleAddTour}
              placeholder="Enter tournament Name"
              autoFocus
            />
            <input
              type="number"
              id="organiserId"
              name="organiserId"
              className="form-control mb-3 mt-3"
              value={organiser.organiserId}
              onChange={handleAddTour}
              placeholder="Enter Organiser Id"
            />
          </div>
          <input
            type="submit"
            className="btn btn-outline-success mb-3 mt-3"
            value="Add Tournament"
            onClick={submitAddTour}
          />
          <Link to="/tournament">
            <button className="btn btn-outline-secondary ml-5">Back</button>
          </Link>
        </div>
      </div>
    </center>
  );
};

export default AddTournament;
