import React from "react";
import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Countries from "../countries";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Store } from "../store";
import { useNavigate } from "react-router";
import rwanda from "../rwandaApi";

function Ucyekwa() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [village, setVillage] = useState("");
  const [idNumber, setIndangamuntu] = useState("");
  const [nationality, setNationality] = useState("RW");
  const [icyaha, setIcyaha] = useState("");
  const [since, setSince] = useState(Date.now);
  const [sex, setSex] = useState("");
  const [postedBy, setPostedBy] = useState("");
  console.log(userInfo);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/ukekwa",
        {
          firstName,
          middleName,
          lastName,
          idNumber,
          nationality,
          since,
          icyaha,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log(response);
      toast.success("mwamenyesheje neza ucyekwa");
      navigate("/njye");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const handleProvince = (e) => {
    setProvince(e.target.value);
    setDistrict("");
    setSector("");
    setCell("");
    setVillage("");
  };

  const handleDistrict = (e) => {
    setDistrict(e.target.value);
    setSector("");
    setCell("");
    setVillage("");
  };

  const handleSector = (e) => {
    setSector(e.target.value);
    setCell("");
    setVillage("");
  };
  const handleCell = (e) => {
    setCell(e.target.value);
    setVillage("");
  };
  const handleVillage = (e) => {
    setVillage(e.target.value);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
      }}
    >
      <Helmet>
        <title>Ukekwa</title>
      </Helmet>

      <h1 style={{ marginRight: "3rem" }}>Wanted</h1>
      <Form
        style={{
          width: "50vw",
          WebkitBoxShadow: "-5px 13px 15px 8px #000000",
          boxShadow: "-5px 13px 15px 8px #000000",
        }}
        onSubmit={submitHandler}
      >
        <FormGroup style={{ margin: "4px" }}>
          <FormLabel>Izina Ribanza</FormLabel>
          <FormControl
            type="text"
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
            value={idNumber}
            onChange={(e) => setIndangamuntu(e.target.value)}
          />
        </FormGroup>
        <FormGroup style={{ margin: "4px" }}>
          <FormLabel>Ubwenegihugu</FormLabel>
          <FormControl
            as="select"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          >
            <Countries />
          </FormControl>
        </FormGroup>
        <FormLabel>Intara</FormLabel>
        <FormControl value={province} as="select" onChange={handleProvince}>
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
            <FormControl as="select" value={district} onChange={handleDistrict}>
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
            <FormControl value={sector} as="select" onChange={handleSector}>
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
            <FormControl value={cell} as="select" onChange={handleCell}>
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
            <FormControl as="select" value={village} onChange={handleVillage}>
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
        <FormGroup style={{ margin: "4px" }}>
          <FormLabel>Impamvu ituma akurikiranwa</FormLabel>
          <FormControl
            value={icyaha}
            onChange={(e) => setIcyaha(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup style={{ margin: "4px" }}>
          <FormLabel>igitsina</FormLabel>
          <FormControl
            as="select"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
            <option value="" disabled>
              igitsina
            </option>
            <option value="gabo">Gabo</option>
            <option value="gore">Gore</option>
          </FormControl>
        </FormGroup>

        <FormGroup style={{ margin: "4px" }}>
          <FormLabel>Igihe icyaha cyabereye</FormLabel>

          <DatePicker
            selected={since}
            onChange={(date) => setSince(date)}
            customInput={<FormControl />}
            dateFormat="dd/MM/yyyy"
          />
        </FormGroup>

        <FormGroup style={{ margin: "4px" }}>
          <FormLabel>Umukurikiranye</FormLabel>
          <FormControl
            type="text"
            value={postedBy}
            onChange={(e) => setPostedBy(e.target.value)}
          />
        </FormGroup>
        <Button style={{ alignItems: "center", margin: "1rem" }} type="submit">
          Tangaza
        </Button>
      </Form>
    </div>
  );
}

export default Ucyekwa;
