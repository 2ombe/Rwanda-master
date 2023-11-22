import React, { useContext, useEffect, useState } from "react";
import { Store } from "../store";
import { toast } from "react-toastify";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";

function SingleGoal(props) {
  const [goal, setGoal] = useState(null);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const goalId = props.match.params.id;

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await axios.get(`api/imihigo/${goalId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setGoal(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch goal");
      }
    };
    fetchGoal();
  }, [goalId, userInfo.token]);

  return (
    <Container>
      {goal ? (
        <Card>
          <Card.Header>{goal.title}</Card.Header>
          <Card.Body>
            <Card.Text>{goal.description}</Card.Text>
            <Card.Text>Created By: {goal.createdBy.name}</Card.Text>
            <Card.Text>
              Evaluators:{" "}
              {goal.evaluators.map((evaluator) => evaluator.name).join(", ")}
            </Card.Text>
            <Card.Text>
              Beneficiaries:{" "}
              {goal.beneficiaries
                .map((beneficiary) => beneficiary.name)
                .join(", ")}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default SingleGoal;
