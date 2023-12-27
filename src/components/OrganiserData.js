import { useState, useEffect } from "react";
import Organiser from "../models/Organiser";
import { useDispatch, useSelector } from "react-redux";
import { getOrgById } from "../redux/OrgSlice";
import { getAllOrgs } from "../redux/OrgSlice";
import { getAllToursByOrgId } from "../redux/OrgSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../stylesheets/Org.css";
import {
  getOrgByIdService,
  getAllOrgsService,
  addOrgService,
  updateOrgService,
  getToursByOrgIdService,
  deleteOrganiserByIdService,
} from "../services/OrganiserService";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const OrganiserData = () => {
  const [oid, setOid] = useState(0);
  const [org, setOrg] = useState(new Organiser());
  const [orgToBeAdded, setOrgToBeAdded] = useState(new Organiser());
  const [orgToBeUpdated, setOrgToBeUpdated] = useState({});
  const [allOrgs, setAllOrgs] = useState([]);
  const [allTours, setAllTours] = useState([]);
  const [refresh, setRefresh] = useState([false]);

  const orgDataFromStore = useSelector((abc) => abc.org.orgData);
  const allOrgsDataFromStore = useSelector((state) => state.org.orgList);
  const allToursDataFromStore = useSelector((state) => state.org.tourList);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllOrgsService()
      .then((response) => {
        console.log(response.data);
        dispatch(getAllOrgs(response.data));
      })
      .catch((error) => {
        alert(error);
        setAllOrgs([]);
      });
    console.log(allOrgsDataFromStore);
  }, []);

  const handleChange = (evt) => {
    console.log(evt.target.name);
    console.log(evt.target.value);
    setOid(evt.target.value);
  };

  const handleAddOrg = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setOrgToBeAdded({
      ...orgToBeAdded,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateOrg = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setOrgToBeUpdated({
      ...orgToBeUpdated,
      [e.target.name]: e.target.value,
    });
  };

  const submitGetOrgById = (evt) => {
    console.log(oid);
    evt.preventDefault();
    getOrgByIdService(oid)
      .then((response) => {
        dispatch(getOrgById(response.data));
        setOid(response.data.organiserId);
      })
      .catch((error) => {
        alert(`Organiser with Organiser id ${oid} not found !`);
        setOrg(new Organiser());
      });
    setOid("");
  };

  const submitGetAllOrgs = (evt) => {
    evt.preventDefault();
    getAllOrgsService()
      .then((response) => {
        console.log(response.data);
        dispatch(getAllOrgs(response.data));
      })
      .catch((error) => {
        alert(error);
        setAllOrgs([]);
      });
  };

  const submitGetAllToursById = (evt) => {
    evt.preventDefault();
    getToursByOrgIdService(oid)
      .then((response) => {
        console.log(response.data);
        dispatch(getAllToursByOrgId(response.data));
      })
      .catch((error) => {
        alert(
          `Currently, there are no tournaments organised by organiser id ${oid}`
        );
        setAllTours([]);
      });
  };

  const submitAddOrg = (evt) => {
    evt.preventDefault();
    console.log(orgToBeAdded);
    let OrgToAdd = { ...orgToBeAdded };
    addOrgService(OrgToAdd)
      .then((response) => {
        console.log(response.data);
        alert(
          `Organiser with Organiser id ${response.data.organiserId} added successfully.`
        );
      })
      .catch(() => {
        setOrgToBeAdded(new Organiser());
        OrgToAdd = "";
        alert("Organiser could not be added.");
      });
  };

  const submitUpdateOrg = (evt) => {
    evt.preventDefault();
    let OrgToUpdate = { ...orgToBeUpdated };
    updateOrgService(OrgToUpdate)
      .then((response) => {
        console.log(response.data);
        alert(
          `Organiser with Organiser id ${response.data.organiserId} updated successfully.`
        );
      })
      .catch(() => {
        setOrgToBeUpdated(new Organiser());
        OrgToUpdate = "";
        alert(`There is no organiser with id ${orgToBeUpdated.organiserId}`);
      });
  };

  const handleDelete = (idToDelete) => {
    if (
      window.confirm(`Are you sure to delete Organiser ${idToDelete}`) == true
    ) {
      deleteOrganiserByIdService(idToDelete)
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
    // style={{
    //     backgroundImage: `url("https://img.freepik.com/free-photo/yellow-watercolor-texture-background_1083-163.jpg?size=626&ext=jpg&ga=GA1.2.13133608.1651484415")`,
    //     'background-size': '100% 500px',
    //     'width': '100%',
    // }}
    >
      <div className="container pt-1 pb-5">
        <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-8">
          
          <div className="form form-group">
            {/* <input
                        type="button"
                        className="btn btn-primary form-control mb-3 mt-3"
                        value="Get All Organisers"
                        onClick={submitGetAllOrgs}
                    /> */}
          </div>
          <div>
            <div>
              {allOrgsDataFromStore.length > 0 ? (
                <div>
                  <p className="font-weight-bold">AVAILABLE ORGANISERS</p>
                  {/* <p className="text-primary text-center font-weight-bold lead">List of All Organisers</p> */}
                  {
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Mail</th>
                          <th>Phone</th>
                          <th>Payment</th>
                          <th>Budget</th>
                        </tr>
                      </thead>
                      {allOrgsDataFromStore.map((e) => (
                        <tbody>
                          <tr>
                            <td>{e.organiserId}</td>
                            <td>{e.organiserName}</td>
                            <td>{e.email}</td>
                            <td>{e.phone}</td>
                            <td>{e.payment}</td>
                            <td>{e.budget}</td>
                            <td>
                              <Link to={`/update-organiser/${e.organiserId}`}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </Link>
                            </td>
                            <td>
                              <Link
                                onClick={() => handleDelete(e.organiserId)}
                                to={"/organiser"}
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
                  <p>There are no Organisers...</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="button-container">
          <Link to="/add-organiser">
            <button className="btn btn-outline-success m">
              Add New Organiser
            </button>
          </Link>
          <Link to="/">
            <button className="btn btn-outline-secondary ml-5">Back</button>
          </Link>
        </div>
        
        {/* <div className="bg-white shadow shadow-regular mb-5 px-3 py-3 pb-3 pt-3 col-8">
                <p className="font-weight-bold">GET ALL TOURNAMENTS OF AN ORGANISER</p>
                    <div className="form form-group" >
                        <input
                        type="number"
                        className="form-control mb-3 mt-3"
                        id="oid"
                        value={oid}
                        placeholder="Enter Organiser id"
                        onChange={handleChange}
                        />
                    <input type="submit" className="form-control mb-3 mt-3 btn btn-primary" value="Get tournaments" onClick={submitGetAllToursById} />
                </div>
                <div>
                    <div> {(allToursDataFromStore) &&
                        <div>
                            <p className="text-primary text-center font-weight-bold lead">List of All Tournaments with organiser Id {oid}</p>
                            {
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Tournament Id</th>
                                            <th>Tournament Name</th>
                                            <th>Organiser Name</th>
                                        </tr>
                                    </thead>
                                    {allToursDataFromStore.map((e =>
                                        <tbody>
                                            <tr>
                                                <td>{e.tournamentId}</td>
                                                <td>{e.tournamentName}</td>
                                                <td>{e.organiser.organiserName}</td>
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

export default OrganiserData;
