import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const UpdateCase = () => {
  const [caseId, setCaseId] = useState("");
  const [newLevel, setNewLevel] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/cases/${caseId}`, { level: newLevel });
      setMessage(`Case ${caseId} updated successfully!`);
      setError("");
      setCaseId("");
      setNewLevel("");
    } catch (err) {
      setMessage("");
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Update Case</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="caseId">
          <Form.Label>Case ID:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter case ID"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="newLevel">
          <Form.Label>New Level:</Form.Label>
          <Form.Control
            as="select"
            value={newLevel}
            onChange={(e) => setNewLevel(e.target.value)}
          >
            <option value="">Select new level</option>
            <option value="village">Village</option>
            <option value="cell">Cell</option>
            <option value="district">District</option>
            <option value="province">Province</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateCase;
