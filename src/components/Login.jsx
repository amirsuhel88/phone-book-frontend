import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setStatus, setError } from "../redux/userSlice";
import axios from "axios";
import { Alert, Button, Form, Container } from "react-bootstrap";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.users);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setStatus("loading"));
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setToken(response.data.token));
      dispatch(setStatus("succeeded"));
    } catch (error) {
      dispatch(
        setError(error.response ? error.response.data.message : "Login failed")
      );
      dispatch(setStatus("failed"));
    }
  };

  return (
    <Container>
      <h2 className="my-4">Login</h2>
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
        <Button variant="primary" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Logging in..." : "Login"}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
