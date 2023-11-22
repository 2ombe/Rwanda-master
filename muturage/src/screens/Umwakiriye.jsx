import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Store } from "../store";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getError } from "../utils";
import laws from "../laws";
import RegistrationSteps from "../components/RegistrationSteps";
import { Helmet } from "react-helmet-async";

const Umwakiriye = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { receiverInfo },
  } = state;
  const navigate = useNavigate();

  const [received, setreceived] = useState(
    receiverInfo ? receiverInfo.received : ""
  );

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("api/auth/all", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setUsers((prevFormData) => ({
          ...prevFormData,

          users: data,
        }));

        setUsers(data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchUsers();
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "RECEIVER_INFO",
      payload: {
        received,
      },
    });
    localStorage.setItem(
      "receiverInfo",
      JSON.stringify({
        received,
      })
    );
    navigate("/andikisha");
  };

  return (
    <>
      <Helmet>
        <title>umwakiriye</title>
      </Helmet>
      <RegistrationSteps step1 step2 step3 step4 step5 />
      <Container className="container small-container ">
        <h2 style={{ textAlign: "center" }}>Umwakiriye</h2>
        <Form onSubmit={submitHandler}>
          <h2 style={{ margin: "1rem" }}>Create New Case</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group>
            <Form.Label>Umwakiriye</Form.Label>
            <Form.Control
              as="select"
              name="received"
              value={received}
              onChange={(e) => setreceived(e.target.value)}
              required
            >
              <option value="" disabled>
                --Hitamo uwo umenyesha--
              </option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button
            style={{ alignItems: "center", margin: "1rem" }}
            type="submit"
          >
            Komeza
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Umwakiriye;
