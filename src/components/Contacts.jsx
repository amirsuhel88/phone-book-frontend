import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getContact,
  setStatus,
  setError,
  deleteContact,
} from "../redux/contactSlice";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { FaEdit, FaTrash } from "react-icons/fa";

const Contacts = () => {
  const dispatch = useDispatch();
  const { contacts, status, error } = useSelector((state) => state.contacts);
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
        dispatch(getContact(response.data));
        setLoading(false);
      } catch (error) {
        dispatch(setError("Failed to fetch contacts"));
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  const handleClick = () => {
    navigate("/add-contact");
  };

  const handleEdit = (id) => {
    navigate(`/edit-contact/${id}`);
  };

  const handleDelete = (id) => {
    try {
      const token = localStorage.getItem("token");
      axios.delete(`http://localhost:5000/api/contacts/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteContact({ id }));
    } catch (error) {
      dispatch(setError("Failed to delete contact"));
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-3">
          <button onClick={handleClick} className="btn btn-success">
            ADD
          </button>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Photo</th>
              <th>Actions</th>
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
                      alt="Contact"
                      className="img-fluid rounded-circle"
                      style={{ height: "80px", width: "80px" }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEdit(contact.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(contact.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No contacts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Contacts;
