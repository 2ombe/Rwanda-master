import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { Store } from "../store";

function CreateMarket() {
  const { state } = useContext(Store);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [activities, setActivities] = useState("");
  const [startdate, setStartDate] = useState();
  const [enddate, setEndDate] = useState();
  const [budget, setBudget] = useState([]);
  const [amountUsed, setAmountUsed] = useState(0);
  const [steps, setSteps] = useState([]);
  const [timeline, setTimeline] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [performanceLevel, setPerformanceLevel] = useState("");
  const [entrepreneurName, setEntrepreneur] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const marketData = {
      name,
      location,
      activities,
      budget,
      steps,
      timeline,
      amountUsed,
      totalCost,
      remainingAmount,
      performanceLevel,
      entrepreneurName,
    };
    try {
      const response = await axios.post("/api/isoko", marketData, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Ntibishobotse kwandikisha isoko");
    }
  };

  const handleBudgetChange = (e, index) => {
    const updateBudgets = [...budget];
    updateBudgets[index] = parseInt(e.target.value);
    setBudget(updateBudgets);
  };

  const handleStepChange = (e, index) => {
    const updateSteps = [...steps];
    updateSteps[index] = e.target.value;
    setSteps(updateSteps);
  };

  return (
    <div
      style={{
        marginLeft: "400px",
        marginRight: "400px",
        alignContent: "center",
        alignItems: "center",
      }}
      className="my-container mt-5"
    >
      <Helmet>isoko</Helmet>
      <h1>Create Market</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Market Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter market name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Label>Market Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter market location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="activities">
          <Form.Label>Market Activities</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter market activities"
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Label>Market Budgets</Form.Label>
        <Row>
          <Col>
            <Form.Label>Activity</Form.Label>
          </Col>
          <Col>
            <Form.Label>Budget</Form.Label>
          </Col>
        </Row>
        {budget.map((budget, index) => (
          <Row key={index}>
            <Col>
              <Form.Control
                type="text"
                value={steps[index]}
                onChange={(e) => handleStepChange(e, index)}
                required
              />
            </Col>
            <Col>
              <Form.Control
                type="number"
                value={budget[index]}
                onChange={(e) => handleBudgetChange(e, index)}
                required
              />
            </Col>
          </Row>
        ))}
        <Button variant="secondary" onClick={() => setBudget([...budget, 0])}>
          Add Activity
        </Button>
        <hr />
        <Form.Group controlId="timeline">
          <Form.Label>Market Timeline</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter market timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="totalCost">
          <Form.Label>Total Cost</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter total cost"
            value={totalCost}
            onChange={(e) => setTotalCost(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="remainingAmount">
          <Form.Label>Amount used</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter remaining amount"
            value={amountUsed}
            onChange={(e) => setAmountUsed(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="remainingAmount">
          <Form.Label>Remaining Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter remaining amount"
            value={remainingAmount}
            onChange={(e) => setRemainingAmount(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="performanceLevel">
          <Form.Label>Performance Level</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter performance level"
            value={performanceLevel}
            onChange={(e) => setPerformanceLevel(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="entrepreneur">
          <Form.Label>Entrepreneur</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter entrepreneur"
            value={entrepreneurName}
            onChange={(e) => setEntrepreneur(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="startdate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter start date"
            value={startdate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="enddate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter end date"
            value={enddate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Market
        </Button>
      </Form>
    </div>
  );
}

export default CreateMarket;
