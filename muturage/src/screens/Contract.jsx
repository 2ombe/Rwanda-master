import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import RegistrationSteps from "../components/RegistrationSteps";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { Store } from "../store";

function Contract() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { contractInfo },
  } = state;
  const [salary, setSalary] = useState(contractInfo.salary || 0);
  const [akazi, setAkazi] = useState(contractInfo.akazi || "");
  const [workHour, setWorkhour] = useState(contractInfo.workHour || 0);
  const [sickLeave, setSickleave] = useState(contractInfo.sickLeave || "");

  const [dispute, setDisput] = useState(contractInfo.dispute || "");

  const [termination, setTermination] = useState(
    contractInfo.termination || ""
  );

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "CONTRACT_INFO",
      payload: {
        salary,
        akazi,
        workHour,
        sickLeave,
        termination,
        dispute,
      },
    });
    localStorage.setItem(
      "contractInfo",
      JSON.stringify({
        salary,
        akazi,
        workHour,
        sickLeave,
        termination,
        dispute,
      })
    );
    navigate("/umwakiriye");
  };

  return (
    <div>
      <Helmet>
        <title>Contract</title>
      </Helmet>
      <RegistrationSteps step1 step2 step3 step4 />
      <Container
        style={{ height: "120%" }}
        className="container small-container"
      >
        <h1 style={{ textAlign: "center" }} className="my-3">
          Abashya
        </h1>
        <Form onSubmit={submitHandler}>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Umushahara azajya ahembwa</FormLabel>
            <FormControl
              type="number"
              required
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Akazi azajya akora</FormLabel>
            <FormControl
              type="text"
              value={akazi}
              onChange={(e) => setAkazi(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Amazaha azajya akora kumunsi</FormLabel>
            <FormControl
              type="number"
              value={workHour}
              onChange={(e) => setWorkhour(e.target.value)}
            />
          </FormGroup>

          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Impamvu zituma afata ikiruhuko</FormLabel>
            <FormControl
              as="select"
              required
              value={sickLeave}
              onChange={(e) => setSickleave(e.target.value)}
            >
              <option value="" disabled>
                --Hitamo impamvu ahabwa ikiruhuko---
              </option>
              <option value="uburwayi">Uburwayi</option>
              <option value="gusura">Gusura</option>
              <option value="gusenga">Gusenga</option>
            </FormControl>
          </FormGroup>

          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Uburyo bwo gukemura amakimbirane</FormLabel>
            <FormControl
              as="textarea"
              value={dispute}
              onChange={(e) => setDisput(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Amabwiriza yo gusoza Contract</FormLabel>
            <FormControl
              as="textarea"
              value={termination}
              onChange={(e) => setTermination(e.target.value)}
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

export default Contract;
