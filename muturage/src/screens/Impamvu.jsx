import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { Store } from "../store";
import RegistrationSteps from "../components/RegistrationSteps";

function Impamvu() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { stayingInfo },
  } = state;
  const [impamvu, setImpamvu] = useState(stayingInfo.impamvu || "");
  const [igiheAhageze, setIgiheAhageze] = useState(
    stayingInfo.igiheAhageze || Date.now
  );
  const [igiheAmara, setIgiheAmara] = useState(
    stayingInfo.igiheAmara || new Date()
  );

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "STAYING_INFO",
      payload: {
        impamvu,
        igiheAhageze,
        igiheAmara,
      },
    });
    localStorage.setItem(
      "stayingInfo",
      JSON.stringify({
        impamvu,
        igiheAhageze,
        igiheAmara,
      })
    );
    if (impamvu === "gukodesha") {
      navigate("/ubukode");
    } else if (impamvu === "umukozi") {
      navigate("/amasezerano");
    } else {
      navigate("/umwakiriye");
    }
  };
  return (
    <div>
      <Helmet>
        <title>impamvu</title>
      </Helmet>
      <RegistrationSteps step1 step2 step3 />
      <Container className="container mt-3 small-container">
        <h2 style={{ textAlign: "center" }}>Impamvu imugenza</h2>
        <Form onSubmit={submitHandler}>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Impamvu</FormLabel>
            <FormControl
              as="select"
              value={impamvu}
              onChange={(e) => setImpamvu(e.target.value)}
              required
            >
              <option value="" disabled>
                Impamvu imugenza
              </option>
              <option value="gusura">Gusura</option>
              <option value="gukodesha">Gukodesha</option>
              <option value="umukozi">Umukozi</option>
            </FormControl>
          </FormGroup>

          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Igihe Ahagereye</FormLabel>

            <FormControl
              type="date"
              value={igiheAhageze}
              onChange={(e) => setIgiheAhageze(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Igihe Azamara</FormLabel>

            <FormControl
              value={igiheAmara}
              type="date"
              onChange={(e) => setIgiheAmara(e.target.value)}
            />
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

export default Impamvu;
