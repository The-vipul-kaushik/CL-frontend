import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../stylesheets/Org.css";
import { Link, useParams } from "react-router-dom";
import Organiser from "../models/Organiser";
import { getOrgByIdService } from "../services/OrganiserService";
import { updateOrgService } from "../services/OrganiserService";
import { useLocation } from "react-router-dom";
import { getOrgById } from "../redux/OrgSlice";

const UpdateOrganiser = () => {
  const [oid, setOid] = useState(0);
  const [org, setOrg] = useState(new Organiser());
  const [orgToBeUpdated, setOrgToBeUpdated] = useState(new Organiser());

  const location = useLocation();
  // const params = new URLSearchParams(location.search);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getOrgByIdService(id)
      .then((response) => {
        dispatch(getOrgById(response.data));
        console.log(response.data);
        setOrgToBeUpdated(response.data);
      })
      .catch((error) => {
        alert(`Organiser with Organiser id ${oid} not found !`);
      });
  }, []);

  const handleChange = (evt) => {
    console.log(evt.target.name);
    console.log(evt.target.value);
    setOid(evt.target.value);
  };

  const handleUpdateOrg = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setOrgToBeUpdated({
      ...orgToBeUpdated,
      [e.target.name]: e.target.value,
    });
  };

  const submitUpdateOrg = (evt) => {
    evt.preventDefault();
    console.log(orgToBeUpdated);
    let OrgToUpdate = { ...orgToBeUpdated };
    updateOrgService(OrgToUpdate)
      .then((response) => {
        console.log(response.data);
        alert(
          `Organiser with Organiser id ${response.data.organiserId} Updated successfully.`
        );
      })
      .catch(() => {
        setOrgToBeUpdated(new Organiser());
        OrgToUpdate = "";
        alert("Organiser could not be Updated.");
      });
    setOrgToBeUpdated(new Organiser());
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
              type="text"
              id="organiserName"
              name="organiserName"
              className="form-control mb-3 mt-3"
              value={orgToBeUpdated.organiserName}
              onChange={handleUpdateOrg}
              placeholder="Enter Organiser Name"
              autoFocus
            />
            <input
              type="email"
              id="email"
              name="email"
              className="form-control mb-3 mt-3"
              value={orgToBeUpdated.email}
              onChange={handleUpdateOrg}
              placeholder="Enter email"
            />
            <input
              type="number"
              id="phone"
              name="phone"
              className="form-control mb-3 mt-3"
              value={orgToBeUpdated.phone}
              onChange={handleUpdateOrg}
              placeholder="Enter phone number"
            />
            <input
              type="number"
              id="payment"
              name="payment"
              className="form-control mb-3 mt-3"
              value={orgToBeUpdated.payment}
              onChange={handleUpdateOrg}
              placeholder="Enter payment"
            />
            <input
              type="number"
              id="budget"
              name="budget"
              className="form-control mb-3 mt-3"
              value={orgToBeUpdated.budget}
              onChange={handleUpdateOrg}
              placeholder="Enter budget"
            />
          </div>
          <input
            type="submit"
            className="btn btn-outline-success mb-3 mt-3"
            value="Update Organiser"
            onClick={submitUpdateOrg}
          />
          <Link to="/organiser">
            <button className="btn btn-outline-secondary ml-5">Back</button>
          </Link>
        </div>
      </div>
    </center>
  );
};

export default UpdateOrganiser;
