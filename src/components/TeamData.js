import { useState, useEffect } from "react";
import Team from "../models/Team";
import { useDispatch, useSelector } from "react-redux";
import { getTeamById } from "../redux/TeamSlice";
import { getAllTeams } from "../redux/TeamSlice";
import {
    getTeamByIdService, getTeamByNameService, getAllTeamsService, addTeamService,
    updateTeamService, getPlayersByTeamIdService, deleteTeamByIdService
} from "../services/TeamServices";


const TeamData = () => {

    const [tid, setTid] = useState(0);
    const [tidP, setTidP] = useState(0);
    const [tname, setTname] = useState(``);
    const [teamN, setTeamN] = useState(new Team());
    const [team, setTeam] = useState(new Team());
    const [teamToBeAdded, setTeamToBeAdded] = useState(new Team());
    const [teamToBeUpdated, setTeamToBeUpdated] = useState(new Team());
    const [allTeams, setAllTeams] = useState([]);
    const [allPlayersByTeam, setAllPlayersByTeam] = useState([]);
    const [tidD, setTidD] = useState(0);

    const teamDataFromStore = useSelector((abc) => abc.team.teamData);
    const allTeamsDataFromStore = useSelector((state) => state.team.teamList);
    // const allPlayersByTeamDataFromStore = useSelector((state) => state.team.playerByTeamList);
    const dispatch = useDispatch();

    useEffect(() => {

    }, []);

    const handleGetTeamById = (evt) => {
        console.log(evt.target.name);
        console.log(evt.target.value);
        setTid(evt.target.value);
    }

    const submitGetTeamById = (evt) => {
        console.log(tid);
        evt.preventDefault();
        getTeamByIdService(tid)
            .then((response) => {
                dispatch(getTeamById(response.data));
                setTid(response.data.teamId);
            })
            .catch((error) => {
                alert(`Team with teamId ${tid} not found !`);
                setTeam(new Team());
            })
        setTid(0);
    }

    const handleGetTeamByName = (evt) => {
        console.log(evt.target.name);
        console.log(evt.target.value);
        setTname(evt.target.value);
    }

    const submitGetTeamByName = (evt) => {
        console.log(tname);
        evt.preventDefault();
        getTeamByNameService(tname)
            .then((response) => {
                setTeamN(response.data);
            })
            .catch((error) => {
                alert(`Team with teamName ${tname} not found !`);
                setTeamN(new Team());
            })
        setTname('');;
    }

    const handleGetAllPlayersByTeam = (evt) => {
        console.log(evt.target.name);
        console.log(evt.target.value);
        setTidP(evt.target.value);
    }

    const submitGetAllPlayersByTeam = (evt) => {
        evt.preventDefault();
        getPlayersByTeamIdService(tidP)
            .then((response) => {
                console.log(response.data);
                setAllPlayersByTeam(response.data);
                // setTidP(response.data[0].team.teamId);
            })
            .catch((error) => {
                alert(`Players with teamId ${tid} not found !`);
                setAllPlayersByTeam([]);
            });
        // setTidP('');
    }

    const submitGetAllTeams = (evt) => {
        evt.preventDefault();
        getAllTeamsService()
            .then((response) => {
                console.log(response.data);
                dispatch(getAllTeams(response.data));
            })
            .catch((error) => {
                alert(error);
                setAllTeams([]);
            });
    }

    const handleAddTeam = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setTeamToBeAdded({
            ...teamToBeAdded,
            [e.target.name]: e.target.value
        });
    }

    const submitAddTeam = (evt) => {
        evt.preventDefault();
        console.log(teamToBeAdded);
        let TeamToAdd = { ...teamToBeAdded };
        addTeamService(TeamToAdd)
            .then((response) => {
                console.log(response.data);
                alert(`Team with Team id ${response.data.teamId} added successfully.`);
            })
            .catch(() => {
                setTeamToBeAdded(new Team());
                TeamToAdd = '';
                alert("Team could not be added.");
            });
    }

    const handleUpdateTeam = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setTeamToBeUpdated({
            ...teamToBeUpdated,
            [e.target.name]: e.target.value
        });
    }

    const submitUpdateTeam = (evt) => {
        evt.preventDefault();
        let TeamToUpdate = { ...teamToBeUpdated };
        updateTeamService(TeamToUpdate)
            .then((response) => {
                console.log(response.data);
                alert(`Team with TeamId ${response.data.teamId} updated successfully.`);
            })
            .catch(() => {
                setTeamToBeUpdated(new Team());
                TeamToUpdate = '';
                alert("Team could not be updated.");
            });
    }

    // const handleDeleteTeamById = (evt) => {
    //     console.log(evt.target.name);
    //     console.log(evt.target.value);
    //     setTidD(evt.target.value);
    // }

    // const submitDeleteTeamById = (evt) => {
    //     console.log(tidD);
    //     evt.preventDefault();
    //     deleteTeamByIdService(tidD)
    //         .then((response) => {
    //             alert(`Team with teamID ${tidD} deleted successfully`);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             alert(`Team with ${tidD} not found.`);
    //         });
    //     setTidD('');
    // }

    return (
        <center>
            <div className="container">
                <div className="bg-white shadow shadow-regular mb-3 mt-5 px-3 py-3 pb-3 pt-3 col-7 text-center">
                    <p>Add New Team</p>
                    <div className="form form-group" >
                        <input
                            type="text"
                            id="teamName1"
                            name="teamName"
                            className="form-control mb-3 mt-3"
                            value={teamToBeAdded.teamName}
                            onChange={handleAddTeam}
                            placeholder="Enter Team Name" />
                        <input
                            type="text"
                            id="ownerName"
                            name="ownerName"
                            className="form-control mb-3 mt-3"
                            value={teamToBeAdded.ownerName}
                            onChange={handleAddTeam}
                            placeholder="Enter Owner Name" />

                        <input
                            type="text"
                            id="captainName"
                            name="captainName"
                            className="form-control mb-3 mt-3"
                            value={teamToBeAdded.captainName}
                            onChange={handleAddTeam}
                            placeholder="Enter Captain Name" />

                        <input
                            type="submit"
                            className="btn btn-primary form-control mb-3 mt-3"
                            value="Add Team"
                            onClick={submitAddTeam}
                        />
                    </div>
                </div>
                <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-7">
                    <p>Find a Team</p>
                    <div>
                        <form className="form form-group">
                            <input
                                type="number"
                                className="form-control mb-3 mt-3"
                                id="tid"
                                value={tid}
                                placeholder="Enter Team id"
                                onChange={handleGetTeamById}
                                autoFocus />
                            <input type="submit" className="form-control mb-3 mt-3 btn btn-primary" value="Get Team" onClick={submitGetTeamById} />
                        </form>
                    </div>
                    <div> {(teamDataFromStore.teamId) &&
                        <div>
                            <p className="font-weight-bold">Team data:</p>
                            <p> Team id: {teamDataFromStore.teamId} </p>
                            <p> Team Name: {teamDataFromStore.teamName} </p>
                            <p> Owner: {teamDataFromStore.ownerName} </p>
                            <p> Captain: {teamDataFromStore.captainName} </p>
                        </div>
                    }

                    </div>
                </div>

                <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-7">
                    <p>Find a Team by Team Name</p>
                    <div>
                        <form className="form form-group">
                            <input
                                type="text"
                                className="form-control mb-3 mt-3"
                                id="tname"
                                value={tname}
                                placeholder="Enter Team Name"
                                onChange={handleGetTeamByName} />
                            <input
                                type="submit"
                                className="form-control mb-3 mt-3 btn btn-primary"
                                value="Get Team"
                                onClick={submitGetTeamByName} />
                        </form>
                    </div>
                    <div> {(teamN.teamName) &&
                        <div>
                            <p className="font-weight-bold">Team data:</p>
                            <p> Team id: {teamN.teamId} </p>
                            <p> Team Name: {teamN.teamName} </p>
                            <p> Owner: {teamN.ownerName} </p>
                            <p> Captain: {teamN.captainName} </p>
                        </div>
                    }</div>
                </div>


                <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-7">
                    <p>Update Team</p>
                    <div className="form form-group" >
                        <input
                            type="number"
                            className="form-control mb-3 mt-3"
                            id="teamId"
                            name="teamId"
                            value={teamToBeUpdated.teamId}
                            placeholder="Enter Team id"
                            onChange={handleUpdateTeam}
                        />
                        <input
                            type="text"
                            id="teamName"
                            name="teamName"
                            className="form-control mb-3 mt-3"
                            value={teamToBeUpdated.teamName}
                            onChange={handleUpdateTeam}
                            placeholder="Enter Team Name" />
                        <input
                            type="text"
                            id="ownerName"
                            name="ownerName"
                            className="form-control mb-3 mt-3"
                            value={teamToBeUpdated.ownerName}
                            onChange={handleUpdateTeam}
                            placeholder="Enter Owner Name" />
                        <input
                            type="text"
                            id="captainName"
                            name="captainName"
                            className="form-control mb-3 mt-3"
                            value={teamToBeUpdated.captainName}
                            onChange={handleUpdateTeam}
                            placeholder="Enter Captain Name" />
                        <input
                            type="submit"
                            className="btn btn-primary form-control mb-3 mt-3"
                            value="Update Team"
                            onClick={submitUpdateTeam}
                        />
                    </div>
                </div>

                {/* <div className="bg-white shadow shadow-regular mb-3 mt-3 px-3 py-3 pb-3 pt-3 col-7">
                    <p>Delete a Team</p>
                    <div>
                        <form className="form form-group">
                            <input
                                type="number"
                                className="form-control mb-3 mt-3"
                                id="tidD"
                                value={tidD}
                                placeholder="Enter Team Id"
                                onChange={handleDeleteTeamById}
                            />
                            <input 
                                id="btn3" 
                                type="submit" 
                                className="form-control mb-3 mt-3 btn btn-danger" 
                                value="Delete Team" 
                                onClick={submitDeleteTeamById} />
                        </form>
                    </div>
                </div> */}

                <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-7">
                    <p>Get All Teams</p>
                    <div className="form form-group" >
                        <input
                            type="button"
                            className="btn btn-primary form-control mb-3 mt-3"
                            value="Get All Teamss"
                            onClick={submitGetAllTeams}
                        />
                    </div>
                    <div>
                        <div> {(allTeamsDataFromStore) &&
                            <div>
                                <p className="text-primary text-center font-weight-bold lead">List of All Teams</p>
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
                                        {allTeamsDataFromStore.map((e =>
                                            <tbody>
                                                <tr>
                                                    <td>{e.teamId}</td>
                                                    <td>{e.teamName}</td>
                                                    <td>{e.ownerName}</td>
                                                    <td>{e.captainName}</td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                }
                            </div>
                        }
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-7">
                    <p>Get All Players By Team</p>
                    <div className="form form-group" >
                        <input
                            type="number"
                            className="form-control mb-3 mt-3"
                            id="tidP"
                            value={tidP}
                            placeholder="Enter Team id"
                            onChange={handleGetAllPlayersByTeam} />
                        <input
                            type="button"
                            className="btn btn-primary form-control mb-3 mt-3"
                            value="Get All Players By Team"
                            onClick={submitGetAllPlayersByTeam}
                        />
                    </div>
                    <div>
                        <div> {(allPlayersByTeam) &&
                            <div>
                                <p className="text-primary text-center font-weight-bold lead">List of All Players By Team</p>
                                {
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Team Id</th>
                                                <th>Player Id</th>
                                                <th>Player Name</th>
                                                <th>salary</th>
                                                <th>skill</th>
                                            </tr>
                                        </thead>
                                        {allPlayersByTeam.map((e =>
                                            <tbody>
                                                <tr>
                                                    <td>{e.team.teamId}</td>
                                                    <td>{e.playerId}</td>
                                                    <td>{e.playerName}</td>
                                                    <td>{e.salary}</td>
                                                    <td>{e.skill}</td>


                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                }
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </div >
        </center >
    );
}

export default TeamData;