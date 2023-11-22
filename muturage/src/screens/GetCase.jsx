import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { Store } from "../store";

const CaseListByLevel = () => {
  const { state } = useContext(Store);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/cases/level/${state.userInfo.level}`);
        setCases(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [state.userInfo.level]);

  const handleCaseClick = (caseId) => {
    // Do something with the caseId, e.g. redirect to the case details page
  };

  return (
    <Container fluid>
      <h1 className="text-center">Cases by Level</h1>
      {cases.map((levelCases, index) => (
        <div key={index} className="my-5">
          <h2 className="text-center">Level {index + 1}</h2>
          <Row className="justify-content-center">
            {levelCases.map((singleCase) => (
              <Col key={singleCase._id} sm={12} md={6} lg={4} xl={3}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>{singleCase.title}</Card.Title>
                    <Card.Text>{singleCase.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleCaseClick(singleCase._id)}
                    >
                      View Case
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default CaseListByLevel;
