import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../stylesheets/Org.css";
import { Link } from "react-router-dom";
import Match from "../models/Match";
import { addMatchService } from "../services/MatchServices";
import Tournament from "../models/Tournament";

const AddMatch = () => {
  const [mid, setMid] = useState(0);
  const [match, setMatch] = useState(new Match());
  const [matchToBeAdded, setMatchToBeAdded] = useState(new Match());
  const [tournament, setTournament] = useState(new Tournament);

  const dispatch = useDispatch();

  useEffect(() => {
    setMatchToBeAdded(new Match());
  }, []);

  const handleChange = (evt) => {
    console.log(evt.target.name);
    console.log(evt.target.value);
    setMid(evt.target.value);
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
    })
  };

  const submitAddMatch = (evt) => {
    evt.preventDefault();
    console.log(matchToBeAdded);
    let MatchToAdd = { ...matchToBeAdded, tournament };
    addMatchService(MatchToAdd)
      .then((response) => {
        console.log(response.data);
        alert(
          `Match with Match id ${response.data.matchId} added successfully.`
        );
        window.location.reload();
      })
      .catch(() => {
        setMatchToBeAdded(new Match());
        MatchToAdd = "";
        alert("Match could not be added.");
      });
    setMatchToBeAdded(new Match());
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
          <p className="font-weight-bold">ADD NEW MATCH</p>
          <div className="form form-group">
            <input
              type="text"
              id="matchName"
              name="matchName"
              className="form-control mb-3 mt-3"
              value={matchToBeAdded.matchName}
              onChange={handleAddMatch}
              placeholder="Enter Match Name"
            />
            <input
              type="text"
              id="matchVenue"
              name="matchVenue"
              className="form-control mb-3 mt-3"
              value={matchToBeAdded.matchVenue}
              onChange={handleAddMatch}
              placeholder="Enter Match Venue"
            />
            <input
              type="date"
              id="matchDate"
              name="matchDate"
              className="form-control mb-3 mt-3"
              value={matchToBeAdded.matchDate}
              onChange={handleAddMatch}
              placeholder="Enter Match Date"
            />
            <input
              type="number"
              id="tournamentId"
              name="tournamentId"
              className="form-control mb-3 mt-3"
              value={tournament.tournamentId}
              onChange={handleAddMatch}
              placeholder="Enter tournament id"
            />
          </div>
          <input
            type="submit"
            className="btn btn-outline-success mb-3 mt-3"
            value="Add Match"
            onClick={submitAddMatch}
          />
          <Link to="/match">
            <button className="btn btn-outline-secondary ml-5">Back</button>
          </Link>
        </div>
      </div>
    </center>
  );
};

export default AddMatch;
