import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Store } from "../store";

function CreateAppointment() {
  const navigate = useNavigate();
  const [requestedTo, setRequestedto] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [users, setUsers] = useState([]);
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("api/auth/all", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setUsers((prevData) => ({
          ...prevData,
          users: data,
        }));
        setUsers(data);
        console.log(data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchUsers();
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "api/gahunda",
        { requestedTo, date, reason },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      console.log(data);
      navigate("/home");
      toast.success("Appointment received");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create appointment");
    }
  };
  return (
    <Container fluid className="small-container mt-3">
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="requestedTo" className="mt-3">
          <FormLabel>Usabwa gahunda</FormLabel>
          <FormControl
            as="select"
            placeholder="Hitamo uwo usaba gahnda"
            name="requestedTo"
            value={requestedTo}
            onChange={(e) => setRequestedto(e.target.value)}
            required
          >
            <option value="">--Hitamo uwo usaba gahunda--</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} {user.role}
              </option>
            ))}
          </FormControl>
        </FormGroup>
        <FormGroup controlId="reason" className="mt-3">
          <FormLabel>Impamvu</FormLabel>
          <FormControl
            as="textarea"
            placeholder="Shyiraho impamvu"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="date" className="mt-3">
          <FormLabel>
            <FormControl
              type="datetime-local"
              placeholder="Shyiriho umunsi ushaka ko muhura"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormLabel>
        </FormGroup>
        <Button variant="primary" type="submit">
          Ohereza
        </Button>
      </Form>
    </Container>
  );
}

export default CreateAppointment;
