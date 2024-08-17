import React, { useEffect, useState } from "react";
import { Row, Button, Form, Container, Col, Alert } from "react-bootstrap";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editContact } from "../redux/contactSlice";

function EditContact() {
  const { id } = useParams();
  const contacts = useSelector((state) => state.contacts.contacts);
  const contactt = contacts.find((c) => c.id === id);

  const [name, setName] = useState(contactt?.name || "");
  const [phone, setPhone] = useState(contactt?.phone || "");
  const [email, setEmail] = useState(contactt?.email || "");
  const [photo, setPhoto] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("photo", photo);

      const response = await axios.put(
        `http://localhost:5000/api/contacts/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        editContact({
          id,
          name,
          phone,
          email,
          photo,
        })
      );

      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <NavigationBar />
      <h2 className="my-4">Edit Contact</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form onSubmit={handleEdit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Phone
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Image
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
}

export default EditContact;
