import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Store } from "../store";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import "../App.css";

function ImihigoScreen() {
  const params = useParams();
  const { id } = params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGoal = {
      name,
      description,
      timeline,
      beneficiaries,
    };

    try {
      const response = await axios.post("api/imihigo", newGoal, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      // const { _id } = await response.json();
      toast.success("Umuhigo wemejwe");
      navigate(`/imihigo/${id}`);
    } catch (error) {
      console.log(error);
      toast.error("error.message");
    }
  };

  const handleAddBeneficiaryChange = () => {
    setBeneficiaries([...beneficiaries, []]);
  };

  const handleBeneficiaryChange = (event, index) => {
    beneficiaries[index] = event.target.value;
    setBeneficiaries([...beneficiaries]);
  };

  return (
    <Container className="small-container mt-5" fluid>
      <Helmet>Imihigo</Helmet>
      <h1>Imihigo</h1>
      {error && <Alert variant="danger">{<MessageBox />}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Izina ry'umuhigo</Form.Label>
          <Form.Control
            type="text"
            placeholder="injiza izina ry'umuhigo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter a description of the goal"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="timeline">
          <Form.Label>Timeline</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter the deadline for the goal"
            value={timeline}
            onChange={(event) => setTimeline(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="beneficiaries">
          <Form.Label>Beneficiaries</Form.Label>
          {beneficiaries.map((beneficiary, index) => (
            <Form.Control
              key={index}
              type="text"
              placeholder={`Enter beneficiary #${index + 1}`}
              value={beneficiaries}
              onChange={(e) => handleBeneficiaryChange(e, index)}
            />
          ))}
          <Button variant="secondary" onClick={handleAddBeneficiaryChange}>
            Add beneficiary
          </Button>
          <Button variant="primary" type="submit">
            Add goal
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default ImihigoScreen;
