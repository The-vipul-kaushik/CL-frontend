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
  getAllOrgsService,
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

  let [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('loggedInUser')));
    getAllOrgsService()
      .then((response) => {
        // console.log(response.data);
        dispatch(getAllOrgs(response.data));
      })
      .catch((error) => {
        alert(error);
        setAllOrgs([]);
      });
  }, []);

  const handleChange = (evt) => {
    // console.log(evt.target.name);
    // console.log(evt.target.value);
    setOid(evt.target.value);
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
    style={{
        backgroundImage: `url("https://img.freepik.com/free-photo/yellow-watercolor-texture-background_1083-163.jpg?size=626&ext=jpg&ga=GA1.2.13133608.1651484415")`,
        'background-size': '100% 500px',
        'width': '100%',
    }}
    >
      <div className="container pt-1 pb-5">
        <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-12">
          
          <div className="form form-group">
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
                            {(user.role==="ADMIN") ? (
                              <>
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
      </div>
    </center>
  );
};

export default OrganiserData;
