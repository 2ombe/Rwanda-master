import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import moment from "moment";

const CaseReport = ({ title, description, status, createdAt }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isPromoted, setIsPromoted] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const diff = moment().diff(createdAt, "days");
      setTimeRemaining(30 - diff);
      if (diff >= 30) {
        setIsPromoted(true);
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [createdAt]);

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Header>
              <Badge variant="secondary">{status}</Badge>
            </Card.Header>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              {timeRemaining !== null && (
                <>
                  <hr />
                  <p>Time remaining before promotion: {timeRemaining} day(s)</p>
                </>
              )}
              {isPromoted && (
                <>
                  <hr />
                  <p>
                    <Badge variant="danger">This case has been promoted!</Badge>
                  </p>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const CaseReports = ({ caseReports }) => {
  return (
    <Container>
      <Row className="my-3">
        <Col>
          {caseReports.map((caseReport) => (
            <CaseReport key={caseReport._id} {...caseReport} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

const App = () => {
  const [caseReports, setCaseReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/caseReports");
      const data = await response.json();
      setCaseReports(data);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h1>Case Reports</h1>
        </Col>
      </Row>
      <CaseReports caseReports={caseReports} />
    </Container>
  );
};

export default App;
