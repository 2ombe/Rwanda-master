import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Store } from "../store";
import { useParams } from "react-router";

const UpdateGoal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");
  const [evaluators, setEvaluators] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [performance, setPerformance] = useState("");
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id } = params;

  const handleUpdate = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    try {
      const res = await axios.put(
        `/api/imuhigo/${id}`,
        {
          name,
          description,
          timeline,
          evaluators,
          beneficiaries,
          performance,
        },
        config
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleUpdate}>
      <Form.Group controlId="name">
        <Form.Label>Goal Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter goal name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Goal Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter goal description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="timeline">
        <Form.Label>Timeline</Form.Label>
        <Form.Control
          type="date"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="evaluators">
        <Form.Label>Evaluators</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter evaluator(s)"
          value={evaluators}
          onChange={(e) => setEvaluators(e.target.value.split(","))}
        />
      </Form.Group>
      <Form.Group controlId="beneficiaries">
        <Form.Label>Beneficiaries</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter beneficiary/ies"
          value={beneficiaries}
          onChange={(e) => setBeneficiaries(e.target.value.split(","))}
        />
      </Form.Group>
      <Form.Group controlId="performance">
        <Form.Label>Performance</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter performance description"
          value={performance}
          onChange={(e) => setPerformance(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update Goal
      </Button>
    </Form>
  );
};

export default UpdateGoal;
