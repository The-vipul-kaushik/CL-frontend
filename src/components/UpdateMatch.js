import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../stylesheets/Org.css";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Tournament from "../models/Tournament";
import Match from "../models/Match";
import { getMatchByIdService } from "../services/MatchServices";
import { updateMatchService } from "../services/MatchServices";
import { getMatchById } from "../redux/MatchSlice";

const UpdateMatch = () => {
  const [mid, setMid] = useState(0);
  const [match, setMatch] = useState(new Match());
  const [matchToBeUpdated, setMatchToBeUpdated] = useState(new Match());
  const [tournament, setTournament] = useState(new Tournament());

  const location = useLocation();
  // const params = new URLSearchParams(location.search);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getMatchByIdService(id)
      .then((response) => {
        dispatch(getMatchById(response.data));
        console.log(response.data);
        setMatchToBeUpdated(response.data);
        setTournament(response.data.tournament);
      })
      .catch((error) => {
        alert(`Match with Match id ${mid} not found !`);
      });
  }, []);

  const handleChange = (evt) => {
    console.log(evt.target.name);
    console.log(evt.target.value);
    setMid(evt.target.value);
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
    console.log(matchToBeUpdated);
    let MatchToUpdate = { ...matchToBeUpdated, tournament };
    updateMatchService(MatchToUpdate)
      .then((response) => {
        console.log(response.data);
        alert(
          `Match with Match id ${response.data.matchId} updated successfully.`
        );
        history.push("/match");
      })
      .catch(() => {
        setMatchToBeUpdated(new Match());
        MatchToUpdate = "";
        alert("Match could not be updated.");
      });
    setMatchToBeUpdated(new Match());
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
          <p className="font-weight-bold">UPDATE MATCH</p>
          <div className="form form-group">
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
              placeholder="Enter Match Name"
            />
            <input
              type="text"
              id="matchVenue"
              name="matchVenue"
              className="form-control mb-3 mt-3"
              value={matchToBeUpdated.matchVenue}
              onChange={handleUpdateMatch}
              placeholder="Enter Match Venue"
            />
            <input
              type="date"
              id="matchDate"
              name="matchDate"
              className="form-control mb-3 mt-3"
              value={matchToBeUpdated.matchDate}
              onChange={handleUpdateMatch}
              placeholder="Enter Match Date"
            />
            <input
              type="number"
              id="tournamentId"
              name="tournamentId"
              className="form-control mb-3 mt-3"
              value={tournament.tournamentId}
              onChange={handleUpdateMatch}
              placeholder="Enter Tournament Id"
            />
          </div>
          <input
            type="submit"
            className="btn btn-outline-success mb-3 mt-3"
            value="Update Match"
            onClick={submitUpdateMatch}
          />
          <Link to="/match">
            <button className="btn btn-outline-secondary ml-5">Back</button>
          </Link>
        </div>
      </div>
    </center>
  );
};

export default UpdateMatch;
