import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Form, FormControl, FormLabel } from "react-bootstrap";
import rwanda from "../rwandaApi";
import axios from "axios";
import { Store } from "../store";

export default function RwandaSelector() {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [village, setvillage] = useState("");
  const [rwanda, setRwanda] = useState([]);
  const { state } = useContext(Store);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("api/data", {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      setRwanda(data);
    };
    fetchData();
  }, [state]);

  const handleProvince = (e) => {
    setProvince(e.target.value);
    setDistrict("");
    setSector("");
    setCell("");
    setvillage("");
  };
  const handleDistrict = (e) => {
    setDistrict(e.target.value);
    setSector("");
    setCell("");
    setvillage("");
  };
  const handleSector = (e) => {
    setSector(e.target.value);
    setCell("");
    setvillage("");
  };
  const handleCell = (e) => {
    setCell(e.target.value);
    setvillage("");
  };
  const handleVillage = (e) => {
    setvillage(e.target.value);
  };

  return (
    <div style={{ margin: "6px" }}>
      <div style={{ width: "100%" }}>
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
      </div>
    </div>
  );
}
