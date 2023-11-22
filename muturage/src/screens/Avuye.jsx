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
import rwanda from "../rwandaApi";
import Countries from "../countries";
import { useNavigate } from "react-router";
import { Store } from "../store";
import RegistrationSteps from "../components/RegistrationSteps";

function Avuye() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { addressInfo },
  } = state;
  const [province, setProvince] = useState(addressInfo.province || "");
  const [district, setDistrict] = useState(addressInfo.district || "");
  const [sector, setSector] = useState(addressInfo.sector || "");
  const [cell, setCell] = useState(addressInfo.cell || "");
  const [village, setVillage] = useState(addressInfo.village || "");
  const [nationality, setNationality] = useState(
    addressInfo.nationality || "RW"
  );

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "ADDRESS_INFO",
      payload: {
        nationality,
        province,
        district,
        sector,
        cell,
        village,
      },
    });
    localStorage.setItem(
      "addressInfo",
      JSON.stringify({
        nationality,
        province,
        district,
        sector,
        cell,
        village,
      })
    );

    navigate("/impamvu");
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setDistrict("");
    setSector("");
    setCell("");
    setVillage("");
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setSector("");
    setCell("");
    setVillage("");
  };

  const handleSectorChange = (e) => {
    setSector(e.target.value);
    setCell("");
    setVillage("");
  };
  const handleCelleChange = (e) => {
    setCell(e.target.value);
    setVillage("");
  };
  const handleVillage = (e) => {
    setVillage(e.target.value);
  };
  return (
    <div>
      <Helmet>
        <title>Yakiriwe</title>
      </Helmet>
      <RegistrationSteps step1 step2 />
      <Container
        style={{ height: "120%" }}
        className="container mt-3 small-container"
      >
        <h1 style={{ textAlign: "center" }}>Aho yakiriwe</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Ubwenegihugu</FormLabel>
            <FormControl
              as="select"
              value={nationality}
              onChange={(e) => setNationality}
              required
            >
              <Countries />
            </FormControl>
          </FormGroup>
          <FormLabel>Intara</FormLabel>
          <FormControl
            value={province}
            as="select"
            onChange={handleProvinceChange}
            required
          >
            <option value="">Hitamo intara</option>
            {Object.keys(rwanda[0]).map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </FormControl>
          {province !== "" && (
            <>
              <FormLabel>Akarere</FormLabel>
              <FormControl
                as="select"
                value={district}
                onChange={handleDistrictChange}
                required
              >
                <option value="">Hitamo akarere</option>
                {Object.keys(rwanda[0][province]).map((district) => (
                  <option value={district} key={district}>
                    {district}
                  </option>
                ))}
              </FormControl>
            </>
          )}
          {district !== "" && (
            <>
              <FormLabel>Umurenge</FormLabel>
              <FormControl
                value={sector}
                as="select"
                onChange={handleSectorChange}
                required
              >
                <option value="">hitamo umurenge</option>
                {Object.keys(rwanda[0][province][district]).map((sector) => (
                  <option value={sector} key={sector}>
                    {sector}
                  </option>
                ))}
              </FormControl>
            </>
          )}
          {sector !== "" && (
            <>
              <FormLabel>Akagali</FormLabel>
              <FormControl
                value={cell}
                as="select"
                onChange={handleCelleChange}
                required
              >
                <option value="">hitamo akagali</option>
                {Object.keys(rwanda[0][province][district][sector]).map(
                  (cell) => (
                    <option value={cell} key={cell}>
                      {cell}
                    </option>
                  )
                )}
              </FormControl>
            </>
          )}
          {cell !== "" && (
            <>
              <FormLabel>Umudugudu</FormLabel>
              <FormControl
                as="select"
                value={village}
                onChange={handleVillage}
                required
              >
                <option value="">hitamo umudugudu</option>
                {Object.keys(rwanda[0][province][district][sector][cell]).map(
                  (village) => (
                    <option key={village} value={village}>
                      {village}
                    </option>
                  )
                )}
              </FormControl>
            </>
          )}

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

export default Avuye;
