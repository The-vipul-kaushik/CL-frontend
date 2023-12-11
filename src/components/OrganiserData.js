import { useState, useEffect } from "react";
import Organiser from "../models/Organiser";
import { useDispatch, useSelector } from "react-redux";
import { getOrgById } from "../redux/OrgSlice";
import { getAllOrgs } from "../redux/OrgSlice";
import { getAllToursByOrgId } from "../redux/OrgSlice";
import '../stylesheets/Org.css';
import { getOrgByIdService, getAllOrgsService, addOrgService, updateOrgService, getToursByOrgIdService} from "../services/OrganiserService";

const OrganiserData = () => {

    const [oid, setOid] = useState(0);
    const [org, setOrg] = useState(new Organiser());
    const [orgToBeAdded, setOrgToBeAdded] = useState(new Organiser());
    const [orgToBeUpdated, setOrgToBeUpdated] = useState({});
    const [allOrgs, setAllOrgs] = useState([]);    
    const [allTours, setAllTours] = useState([]);    


    const orgDataFromStore = useSelector((abc) => abc.org.orgData);
    const allOrgsDataFromStore = useSelector((state) => state.org.orgList);
    const allToursDataFromStore = useSelector((state) => state.org.tourList);
    const dispatch = useDispatch();

    useEffect(() => {

    }, []);

    const handleChange = (evt) => {
        console.log(evt.target.name);
        console.log(evt.target.value);
        setOid(evt.target.value);
    }

    const handleAddOrg = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setOrgToBeAdded({
            ...orgToBeAdded,
            [e.target.name]: e.target.value
        });

    }

    const handleUpdateOrg = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setOrgToBeUpdated({
            ...orgToBeUpdated,
            [e.target.name]: e.target.value
        });

    }

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
            })
        setOid('');
    }

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
    }

    const submitGetAllToursById = (evt) => {
        evt.preventDefault();
        getToursByOrgIdService(oid)
            .then((response) => {
                console.log(response.data);
                dispatch(getAllToursByOrgId(response.data));
            })
            .catch((error) => {
                alert(`Currently, there are no tournaments organised by organiser id ${oid}`);
                setAllTours([]);
            });
    }

    

    const submitAddOrg = (evt) => {
        evt.preventDefault();
        console.log(orgToBeAdded);
        let OrgToAdd = { ...orgToBeAdded};
        addOrgService(OrgToAdd)
            .then((response) => {
                console.log(response.data);
                alert(`Organiser with Organiser id ${response.data.organiserId} added successfully.`);
            })
            .catch(() => {
                setOrgToBeAdded(new Organiser());
                OrgToAdd = '';
                alert("Organiser could not be added.");
            });
    }

    const submitUpdateOrg = (evt) => {
        evt.preventDefault();
        let OrgToUpdate = { ...orgToBeUpdated};
        updateOrgService(OrgToUpdate)
            .then((response) => {
                console.log(response.data);
                alert(`Organiser with Organiser id ${response.data.organiserId} updated successfully.`);
            })
            .catch(() => {
                setOrgToBeUpdated(new Organiser());
                OrgToUpdate = '';
                alert(`There is no organiser with id ${orgToBeUpdated.organiserId}`);
            });
    }

    

    return (
        <center
                style={{
                    backgroundImage: `url("https://img.freepik.com/free-photo/yellow-watercolor-texture-background_1083-163.jpg?size=626&ext=jpg&ga=GA1.2.13133608.1651484415")`,
                    'background-size': '100% 500px',
                    'width': '100%',
                }}
              
        >
        <div className="container pt-5 pb-5">
            <div className="bg-white shadow shadow-regular mb-5 mt-0 px-3 py-3 pb-3 pt-3 col-8 text-center">
                <p className="font-weight-bold">ADD NEW ORGANISER</p>
                <div className="form form-group" >
                    <input
                        type="text"
                        id="organiserName"
                        name="organiserName"
                        className="form-control mb-3 mt-3"
                        value={orgToBeAdded.organiserName}
                        onChange={handleAddOrg}
                        placeholder="Enter Organiser Name" 
                        autoFocus/>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control mb-3 mt-3"
                        value={orgToBeAdded.email}
                        onChange={handleAddOrg}
                        placeholder="Enter email" />
                    <input
                        type="number"
                        id="phone"
                        name="phone"
                        className="form-control mb-3 mt-3"
                        value={orgToBeAdded.phone}
                        onChange={handleAddOrg}
                        placeholder="Enter phone number" />
                    <input
                        type="number"
                        id="payment"
                        name="payment"
                        className="form-control mb-3 mt-3"
                        value={orgToBeAdded.payment}
                        onChange={handleAddOrg}
                        placeholder="Enter payment" />
                    <input
                        type="number"
                        id="budget"
                        name="budget"
                        className="form-control mb-3 mt-3"
                        value={orgToBeAdded.budget}
                        onChange={handleAddOrg}
                        placeholder="Enter budget" />
                    <input
                        type="submit"
                        className="btn btn-success form-control mb-3 mt-3"
                        value="Add Organiser"
                        onClick={submitAddOrg}
                    />
                </div>
            </div>
            <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-8">
                <p className="font-weight-bold">SEARCH FOR AN ORGANISER</p>
                <div>
                    <form className="form form-group">
                        <input
                            type="number"
                            className="form-control mb-3 mt-3"
                            id="oid"
                            value={oid}
                            placeholder="Enter Organiser id"
                            onChange={handleChange}
                             />
                        <input type="submit" className="form-control mb-3 mt-3 btn btn-success" value="Get Organiser" onClick={submitGetOrgById} />
                    </form>
                </div>
                <div> {(orgDataFromStore.organiserId) &&
                    <table className="table table-bordered ">
                        <thead>
                            <tr>
                                <th>Organiser id:</th>
                                <td>{orgDataFromStore.organiserId}</td>
                            </tr>
                            <tr>
                                <th>Organier Name:</th>
                                <td>{orgDataFromStore.organiserName}</td>
                            </tr>
                            <tr>
                                <th>Organier email</th>
                                <td>{orgDataFromStore.email}</td>
                            </tr>
                            <tr>
                                <th>Organier phone</th>
                                <td>{orgDataFromStore.phone}</td>
                            </tr>
                            <tr>
                                <th>Organier payment</th>
                                <td>{orgDataFromStore.payment}</td>
                            </tr>
                            <tr>
                                <th>Organier budget</th>
                                <td>{orgDataFromStore.budget}</td>
                            </tr>
                        </thead>
                    </table>
                }

                </div>
            </div>
            
            <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-8">
                <p className="font-weight-bold">GET ALL THE AVAILABLE ORGANISERS</p>
                <div className="form form-group" >
                    <input
                        type="button"
                        className="btn btn-primary form-control mb-3 mt-3"
                        value="Get All Organisers"
                        onClick={submitGetAllOrgs}
                    />
                </div>
                <div>
                    <div> {(allOrgsDataFromStore) &&
                        <div>
                            <p className="text-primary text-center font-weight-bold lead">List of All Organisers</p>
                            {
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Org Id</th>
                                            <th>Org Name</th>
                                            <th>email</th>
                                            <th>phone</th>
                                            <th>Payment</th>
                                            <th>Budget</th>
                                        </tr>
                                    </thead>
                                    {allOrgsDataFromStore.map((e =>
                                        <tbody>
                                            <tr>
                                                <td>{e.organiserId}</td>
                                                <td>{e.organiserName}</td>
                                                <td>{e.email}</td>
                                                <td>{e.phone}</td>
                                                <td>{e.payment}</td>
                                                <td>{e.budget}</td>
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

            <div className="bg-white shadow shadow-regular mb-5 mt-5 px-3 py-3 pb-3 pt-3 col-8">
                <p className="font-weight-bold">UPDATE AN EXISTING ORGANISER</p>
                <div className="form form-group" >
                    <input
                        type="number"
                        className="form-control mb-3 mt-3"
                        id="organiserId"
                        name="organiserId"
                        value={orgToBeUpdated.organiserId}
                        placeholder="Enter organiser id"
                        onChange={handleUpdateOrg}
                        />
                    <input
                        type="text"
                        id="organiserName"
                        name="organiserName"
                        className="form-control mb-3 mt-3"
                        value={orgToBeUpdated.organiserName}
                        onChange={handleUpdateOrg}
                        placeholder="Enter Organiser Name" />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control mb-3 mt-3"
                        value={orgToBeUpdated.email}
                        onChange={handleUpdateOrg}
                        placeholder="Enter email" />
                    <input
                        type="number"
                        id="phone"
                        name="phone"
                        className="form-control mb-3 mt-3"
                        value={orgToBeUpdated.phone}
                        onChange={handleUpdateOrg}
                        placeholder="Enter phone number" />
                    <input
                        type="number"
                        id="payment"
                        name="payment"
                        className="form-control mb-3 mt-3"
                        value={orgToBeUpdated.payment}
                        onChange={handleUpdateOrg}
                        placeholder="Enter payment" />
                    <input
                        type="number"
                        id="budget"
                        name="budget"
                        className="form-control mb-3 mt-3"
                        value={orgToBeUpdated.budget}
                        onChange={handleUpdateOrg}
                        placeholder="Enter budget" />
                    <input
                        type="submit"
                        className="btn btn-warning form-control mb-3 mt-3"
                        value="Update Organiser"
                        onClick={submitUpdateOrg}
                    />
                </div>
            </div>

            <div className="bg-white shadow shadow-regular mb-5 px-3 py-3 pb-3 pt-3 col-8">
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
            </div>

            
        </div >
        </center>
    );
}

export default OrganiserData;