import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../store";
import { toast } from "react-toastify";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function UserCases() {
  const [cases, setCases] = useState([]);
  const { state } = useContext(Store);
  const { userInfo } = state;
  console.log(userInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/cases", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setCases(res.data);
      } catch (error) {
        toast.error("Failed to create cases");
      }
    };
    fetchData();
  }, [userInfo]);

  const handleEscalate = async (caseId) => {
    try {
      const res = await axios.put(
        `/api/cases/${caseId}/escalate`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      const updatedCase = res.data;
      setCases((prevCases) => {
        const index = prevCases.findIndex((c) => c._id === updatedCase._id);
        prevCases[index] = updatedCase;
        return [...prevCases];
      });
    } catch (error) {
      toast.error("Failed to update case");
    }
  };

  return (
    <>
      <h1 className="my-4">User Cases</h1>
      <Row>
        {cases.map((userCase) => (
          <Col md={4} key={userCase._id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{userCase.title}</Card.Title>
                <Card.Text>{userCase.description}</Card.Text>
                <Card.Text>{userCase.level}</Card.Text>
                <Card.Text>{userCase.chapter}</Card.Text>
                <Card.Text>{userCase.article}</Card.Text>
                <Card.Text>{userCase.points}</Card.Text>
                <Card.Text>{userCase.assignedTo.name}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleEscalate(userCase._id)}
                  disabled={userCase.status !== "pending"}
                >
                  Escalate
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default UserCases;
