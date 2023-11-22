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

function Ubukode() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { rentInfo },
  } = state;
  const [amount, setAmount] = useState(rentInfo.amount || 0);
  const [entryDate, setEntryDate] = useState(rentInfo.entryDate || Date.now());
  const [exitDate, setExitDate] = useState(rentInfo.exitDate || Date);
  const [securityBill, setSecurityBill] = useState(rentInfo.securityBill || 0);
  const [utilitiesBills, setUtilityBills] = useState(
    rentInfo.utilitiesBills || 0
  );
  const [maintainace, setMaintainance] = useState(rentInfo.maintainace || "");
  const [Occupancy, setOccupancy] = useState(rentInfo.Occupancy || 1);
  const [petPolicy, setPetypolicy] = useState(rentInfo.petPolicy || "");
  const [restrictions, setRestrictions] = useState(
    rentInfo.restrictions || "Ibiyobyabwenge"
  );
  const [termination, setTermination] = useState(rentInfo.termination || "");

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "RENT_INFO",
      payload: {
        amount,
        entryDate,
        exitDate,
        securityBill,
        utilitiesBills,
        maintainace,
        Occupancy,
        petPolicy,
        restrictions,
      },
    });
    localStorage.setItem(
      "rentInfo",
      JSON.stringify({
        amount,
        entryDate,
        exitDate,
        securityBill,
        utilitiesBills,
        maintainace,
        Occupancy,
        petPolicy,
        restrictions,
      })
    );
    navigate("/umwakiriye");
  };

  return (
    <div>
      <Helmet>
        <title>Ubukode</title>
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
            <FormLabel>Umubare wamafaranga agomba kwishyura</FormLabel>
            <FormControl
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Amafaranga yibyo yazangiriza</FormLabel>
            <FormControl
              type="number"
              value={securityBill}
              onChange={(e) => setSecurityBill(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Umubare wabagomba kuba munzu</FormLabel>
            <FormControl
              type="number"
              value={Occupancy}
              onChange={(e) => setOccupancy(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Amafaranga, y'amazi, umuriro, interneti .....</FormLabel>
            <FormControl
              type="text"
              value={utilitiesBills}
              onChange={(e) => setUtilityBills(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Ninde ugomba kuvugurura</FormLabel>
            <FormControl
              as="select"
              required
              value={maintainace}
              onChange={(e) => setMaintainance(e.target.value)}
            >
              <option value="" disabled>
                --Hitamo ugomba kuzajya avugurura---
              </option>
              <option value="nyirinzu">Nyirinzu</option>
              <option value="ukodesha">Ukodesha</option>
            </FormControl>
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Amatungo yemewe</FormLabel>
            <FormControl
              type="text"
              as="select"
              required
              value={petPolicy}
              onChange={(e) => setPetypolicy(e.target.value)}
            >
              <option value="" disabled>
                --Hitamo amatungo yemewe---
              </option>
              <option value="injangwe">Injangwe</option>
              <option value="imbwa">Imbwa</option>
              <option value="iryariryo">Iryariryo ryose</option>
            </FormControl>
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Ibintu mutemerewe</FormLabel>
            <FormControl
              as="textarea"
              value={restrictions}
              onChange={(e) => setRestrictions(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Amabwiriza yo gusoza ubukode</FormLabel>
            <FormControl
              as="textarea"
              value={termination}
              onChange={(e) => setTermination(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Hitamo itakiki yinshiyemo</FormLabel>
            <FormControl
              type="date"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Igihe amazeserano azarangirira</FormLabel>
            <FormControl
              type="date"
              value={exitDate}
              onChange={(e) => setExitDate(e.target.value)}
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

export default Ubukode;
