import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setStatus, setError } from "../redux/userSlice";
import { Alert, Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(setError("Passwords do not match")); // Set error message for mismatched passwords
      return;
    }

    dispatch(setStatus("loading")); // Set status to loading before making the request
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          username,
          email,
          password,
        }
      );
      dispatch(setToken(response.data.token)); // Assume response contains a token
      dispatch(setStatus("succeeded")); // Set status to succeeded
      navigate("/login"); // Redirect to home or another page on success
    } catch (error) {
      dispatch(setError(error.response.data.message)); // Set error message
      dispatch(setStatus("failed")); // Set status to failed
    }
  };

  return (
    <Container>
      <div className="col-6 mx-auto p-4 border border-danger" id="signup_form">
        <h2 className="my-4">Signup</h2>
        {status === "failed" && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Signing up..." : "Signup"}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Signup;
