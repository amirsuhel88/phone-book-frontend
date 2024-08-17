import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setStatus, setError, loginUser } from "../redux/userSlice";
import { Alert, Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ username, password }));
    if (loginUser.rejected.match(resultAction)) {
      console.log(resultAction.payload);
    } else {
      navigate("/");
    }
  };

  return (
    <Container>
      <div className="col-6 mx-auto p-4 border border-danger" id="login_form">
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
          <Button
            variant="primary"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;
