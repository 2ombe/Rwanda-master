import axios from "axios";
import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Store } from "../store";

const CreateEventForm = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [host, setHost] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [impamvu, setImpamvu] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/event",
        {
          name,
          location,
          host,
          startDate,
          endDate,
          startTime,
          impamvu,
          endTime,
        },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Event requested");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="eventName">
        <Form.Label>Event Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="eventLocation">
        <Form.Label>Reason</Form.Label>
        <Form.Control
          type="text"
          value={impamvu}
          onChange={(e) => setImpamvu(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="eventLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="eventHost">
        <Form.Label>Host</Form.Label>
        <Form.Control
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="eventStartDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="eventEndDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="eventStartTime">
        <Form.Label>Start Time</Form.Label>
        <Form.Control
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="eventEndTime">
        <Form.Label>End Time</Form.Label>
        <Form.Control
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Event
      </Button>
    </Form>
  );
};

export default CreateEventForm;
