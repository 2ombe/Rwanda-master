import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useParams } from "react-router";
import LoadingBox from "../components/LoadingBox";
import { Store } from "../store";
import { toast } from "react-toastify";
import { getError } from "../utils";

function GetSingleCase() {
  const params = useParams();
  const { id } = params;
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCase = async () => {
      try {
        const { data } = await axios.get(`/api/cases/${id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setCaseData(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchCase();
  }, [id, userInfo]);

  const handleEscalateCase = async () => {
    try {
      const { data } = await axios.put(`/api/cases/${id}/escalate`, null, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setCaseData(data);
      toast.success("Ikirego cyoherejwe ku rwego rwisumbuye");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const canEscalateCase = () => {
    if (caseData && caseData.status !== "escalated") {
      const escalationDate = new Date(caseData.createdAt);
      const currentDate = new Date();
      return escalationDate <= new Date(currentDate.getTime() + 2 * 60 * 1000);
    }
    return false;
  };

  return (
    <Container>
      <h2>Case Details</h2>
      {loading ? (
        <LoadingBox />
      ) : (
        <Card>
          {caseData ? (
            <Card.Body>
              <Card.Title>{caseData.title}</Card.Title>
              <Card.Text>{caseData.description}</Card.Text>
              <Card.Text>Status: {caseData.status}</Card.Text>
              <Card.Text>Assigned To: {caseData.assignedTo._id}</Card.Text>
              <Card.Text>Created By: {caseData.createdBy.name}</Card.Text>
              <Card.Text>Points: {caseData.chapter}</Card.Text>
              <Card.Text>Points: {caseData.article}</Card.Text>
              <Card.Text>Points: {caseData.points}</Card.Text>
              <Card.Text>Points: {caseData.lastUpdatedOn}</Card.Text>
              <Card.Text>Points: {caseData.createdAt}</Card.Text>
              {canEscalateCase() && (
                <Button variant="primary" onClick={handleEscalateCase}>
                  escalate
                </Button>
              )}
            </Card.Body>
          ) : (
            <p>Case not found.</p>
          )}
        </Card>
      )}
    </Container>
  );
}

export default GetSingleCase;
