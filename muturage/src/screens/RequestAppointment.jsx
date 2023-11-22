import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Store } from "../store";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

function RequestAppointment() {
  const [requestedTo, setRequestedto] = useState("");
  const [date, setDate] = useState("");
  const { state } = useContext(Store);
  const { userInfo } = state;

  const handleRequestedtoChange = (e) => {
    setRequestedto(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/appointments",
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        },
        { requestedTo, date }
      );
      toast.success("Appointment requested");
      setRequestedto("");
      setDate("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to request appointment");
    }
  };
  return (
    <Container fluid className="small-container mt-5">
      <h2>Request appointment</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="formRequestedTo">
          <FormLabel>Requsted to</FormLabel>
          <FormControl
            type="text"
            placeholder="enter whom you request"
            value={requestedTo}
            onChange={handleRequestedtoChange}
            required
          />
        </FormGroup>

        <FormGroup controlId="formDate">
          <FormLabel>Date</FormLabel>
          <FormControl
            type="date"
            placeholder="enter date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </FormGroup>
        <Button variant="primary" type="submit">
          Request
        </Button>
      </Form>
    </Container>
  );
}

export default RequestAppointment;
