import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getContact, setStatus, setError } from "../redux/contactSlice"; // Ensure you have the correct actions
// import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const dispatch = useDispatch();
  const { contacts, status, error } = useSelector((state) => state.contacts);
  console.log(contacts);
  const [loading, setLoading] = useState(true);

  //   const navigate = useNavigate();

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

  return (
    <div className="container">
      <h2>Contacts</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>
                  <img src={contact.photo} alt="" />
                </td>
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
  );
};

export default Contacts;
