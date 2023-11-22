import React, { useContext } from "react";
import { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Store } from "../store";
import { useNavigate } from "react-router";
import RegistrationSteps from "../components/RegistrationSteps";

function Abashyitsi() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { visitorsInfo },
  } = state;
  const [firstName, setFirstName] = useState(visitorsInfo.firstName || "");
  const [middleName, setMiddleName] = useState(visitorsInfo.middleName || "");
  const [lastName, setLastName] = useState(visitorsInfo.lastName || "");
  const [indangamuntu, setIndangamuntu] = useState(
    visitorsInfo.indangamuntu || ""
  );
  const [sex, setSex] = useState(visitorsInfo.sex || "");
  const [status, setStatus] = useState(visitorsInfo.status || "");

  const [error, setError] = useState("");
  const [received, setReceived] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "VISITOR_INFO",
      payload: {
        firstName,
        middleName,
        lastName,
        indangamuntu,
        sex,
        status,
      },
    });
    localStorage.setItem(
      "visitorsInfo",
      JSON.stringify({
        firstName,
        middleName,
        lastName,
        indangamuntu,
        sex,
        status,
      })
    );
    navigate("/aturutse");
  };

  return (
    <div>
      <Helmet>
        <title>Abashyitsi</title>
      </Helmet>
      <RegistrationSteps step1 />
      <Container
        style={{ height: "120%" }}
        className="container small-container"
      >
        <h1 style={{ textAlign: "center" }} className="my-3">
          Abashya
        </h1>
        <Form onSubmit={submitHandler}>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Izina Ribanza</FormLabel>
            <FormControl
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Izina Rikurikira</FormLabel>
            <FormControl
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Izina Risoza</FormLabel>
            <FormControl
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Indangamuntu</FormLabel>
            <FormControl
              type="number"
              required
              value={indangamuntu}
              onChange={(e) => setIndangamuntu(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>igitsina</FormLabel>
            <FormControl
              as="select"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              required
            >
              <option value="" disabled>
                igitsina
              </option>
              <option value="gabo">Gabo</option>
              <option value="gore">Gore</option>
            </FormControl>
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Irangamimerere</FormLabel>
            <FormControl
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled>
                Irangamimerere
              </option>
              <option value="single">Ingaragu</option>
              <option value="married">Arubatse</option>
              <option value="devorced">Yatandukanye nuwo bashakanye</option>
            </FormControl>
          </FormGroup>
          

         
          <Button
            style={{ alignItems: "center", margin: "1rem" }}
            type="submit"
          >
            Komeza
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Abashyitsi;
