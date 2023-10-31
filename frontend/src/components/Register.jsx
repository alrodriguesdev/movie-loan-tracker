import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./FormLabel.css";

const Register = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/users/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        // Make sure to include this to handle cookies
        withCredentials: true,
      });
      setIsAuthenticated(true);
      alert("Registration successful!");
    } catch (error) {
      if (error.response) {
        // Check if the response contains an errors array
        if (
          error.response.data.errors &&
          Array.isArray(error.response.data.errors)
        ) {
          // Join the error messages into a single string
          const errorMsg = error.response.data.errors
            .map((err) => err.msg)
            .join(". ");
          alert(errorMsg);
        } else {
          // Fallback to the generic message
          alert(
            error.response.data.message || "Server error during registration."
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        alert("No response from server. Check server or network.");
      } else {
        // Something happened in setting up the request that triggered an Error
        alert("Error setting up request:" + error.message);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="4">
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
