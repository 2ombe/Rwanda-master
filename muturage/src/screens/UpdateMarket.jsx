import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Store } from "../store";

function UpdateMarket() {
  const params = useParams();
  const { id } = params;
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [market, setMarket] = useState({}); // initial market state
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [activities, setActivities] = useState("");
  const [budgets, setBudgets] = useState("");
  const [steps, setSteps] = useState("");
  const [timeline, setTimeline] = useState("");
  const [performanceLevel, setPerformanceLevel] = useState("");
  const [amountUsed, setAmountUsed] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios
        .get(`/api/isoko/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setMarket(data);
          setName(data.name);
          setLocation(data.location);
          setActivities(data.activities);
          setBudgets(data.budgets);
          setSteps(data.steps);
          setTimeline(data.timeline);
          setPerformanceLevel(data.performanceLevel);
          setAmountUsed(data.amountUsed);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [id]);

  const handleActivityChange = (value, index) => {
    const newActivities = [...activities];
    newActivities[index].name = value;
    setActivities(newActivities);
  };

  const handleActivityBudgetChange = (value, index) => {
    const newActivities = [...activities];
    newActivities[index].budget = Number(value);
    setActivities(newActivities);
  };

  const handleAddActivity = () => {
    const newActivities = [...activities, { name: "", budget: 0 }];
    setActivities(newActivities);
  };

  const handleRemoveActivity = (index) => {
    const newActivities = [...activities];
    newActivities.splice(index, 1);
    setActivities(newActivities);
  };

  const handleSubmit = (e) => {
    e.preventdefault();
    const updatedMarket = {
      ...market,
      name,
      location,
      activities,
      budgets,
      steps,
      timeline,
      performanceLevel,
      amountUsed,
    };

    axios
      .post(`/api/isoko/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMarket),
      })
      .then((res) => {
        if (!res.ok) {
          toast.error("Failed to update the market");
        }
        navigate(`/isoko/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Update Market</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMarketName">
          <Form.Label>Market Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter market name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formActivities">
          <Form.Label>Activities</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter activities"
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBudgets">
          <Form.Label>Budgets</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter budgets separated by comma"
            value={budgets}
            onChange={(e) => setBudgets(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formSteps">
          <Form.Label>Steps</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter steps separated by comma"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formTimeline">
          <Form.Label>Timeline</Form.Label>
          <Form.Control
            type="date"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPerformanceLevel">
          <Form.Label>Performance Level</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter performance level"
            value={performanceLevel}
            onChange={(e) => setPerformanceLevel(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formAmountUsed">
          <Form.Label>Amount Used</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter amount used separated by comma"
            value={amountUsed}
            onChange={(e) => setAmountUsed(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UpdateMarket;
