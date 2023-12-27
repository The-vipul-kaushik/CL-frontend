import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../stylesheets/Org.css";
import { addOrgService } from "../services/OrganiserService";
import { Link } from "react-router-dom";
import Organiser from "../models/Organiser";

const AddOrganiser = () => {
  const [oid, setOid] = useState(0);
  const [org, setOrg] = useState(new Organiser());
  const [orgToBeAdded, setOrgToBeAdded] = useState(new Organiser());

  const dispatch = useDispatch();

  useEffect(() => {
    setOrgToBeAdded(new Organiser());
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
        window.location.reload();
      })
      .catch(() => {
        setOrgToBeAdded(new Organiser());
        OrgToAdd = "";
        alert("Organiser could not be added.");
      });
      setOrgToBeAdded(new Organiser());
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
          <p className="font-weight-bold">ADD NEW ORGANISER</p>
          <div className="form form-group">
            <input
              type="text"
              id="organiserName"
              name="organiserName"
              className="form-control mb-3 mt-3"
              value={orgToBeAdded.organiserName}
              onChange={handleAddOrg}
              placeholder="Enter Organiser Name"
              autoFocus
            />
            <input
              type="email"
              id="email"
              name="email"
              className="form-control mb-3 mt-3"
              value={orgToBeAdded.email}
              onChange={handleAddOrg}
              placeholder="Enter email"
            />
            <input
              type="number"
              id="phone"
              name="phone"
              className="form-control mb-3 mt-3"
              value={orgToBeAdded.phone}
              onChange={handleAddOrg}
              placeholder="Enter phone number"
            />
            <input
              type="number"
              id="payment"
              name="payment"
              className="form-control mb-3 mt-3"
              value={orgToBeAdded.payment}
              onChange={handleAddOrg}
              placeholder="Enter payment"
            />
            <input
              type="number"
              id="budget"
              name="budget"
              className="form-control mb-3 mt-3"
              value={orgToBeAdded.budget}
              onChange={handleAddOrg}
              placeholder="Enter budget"
            />
            
          </div>
          <input
              type="submit"
              className="btn btn-outline-success mb-3 mt-3"
              value="Add Organiser"
              onClick={submitAddOrg}
            />
          <Link to="/organiser">
            <button className="btn btn-outline-secondary ml-5">
                Back
            </button>
          </Link>
        </div>
      </div>
    </center>
  );
};

export default AddOrganiser;
