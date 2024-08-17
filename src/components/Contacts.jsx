import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getContact, setStatus, setError } from "../redux/contactSlice"; // Ensure you have the correct actions
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
// import { Navbar } from "./Navbar";

const Contacts = () => {
  const dispatch = useDispatch();
  const { contacts, status, error } = useSelector((state) => state.contacts);
  console.log(contacts);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/contacts/contacts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        dispatch(getContact(response.data)); // Assuming the action is `getContacts`
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch contacts");
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  const handleClick = () => {
    navigate("/add-contact"); // Replace '/another-page' with the actual path
  };
  const handleEdit = (id) => {
    navigate(`/edit-contact/${id}`);
  };

  return (
    <>
      <NavigationBar />
      <div className="container">
        <button onClick={handleClick}>add</button>
        <h2>Contacts</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.email}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/uploads/${contact.photo}`}
                      alt=""
                      height={80}
                      width={80}
                    />
                  </td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(contact.id)}
                  >
                    Edit
                  </button>
                  <button className="mx-2 btn btn-danger" variant="danger">
                    Delete
                  </button>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No contacts available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Contacts;
