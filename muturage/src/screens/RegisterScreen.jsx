import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState, useReducer } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { GiArchiveRegister } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import RwandaSelector from "../components/RwandaSelector";
import { Store } from "../store";
import { getError } from "../utils";
import rwanda from "../rwandaApi";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return { ...state, loadingUpload: false, errorUpload: "" };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

function RegisterScreen() {
  const [{ loadingUpload, loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [village, setVillage] = useState("");
  const [phone, setPhone] = useState("");
  const [pic, setPic] = useState("");
  const [indangamuntu, setIndangamuntu] = useState("");
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");

  const redirect = redirectUrl ? redirectUrl : "/home";

  const uploadHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormDAta = new FormData();
    bodyFormDAta.append("file", file);

    try {
      dispatch({ type: "UPLOAD_RQUEST" });
      const { data } = await axios.post("/api/upload", bodyFormDAta, {
        headers: {
          "Content-Type": "multipart/formdata",
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });
      if (forImages) {
        setPic(...pic, data);
      } else {
        setPic(data);
      }

      toast.success("Ifoto yageze mububiko");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== ConfirmPassword) {
      toast.error("Umure bage wemeza siwo");
      return;
    }
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        ConfirmPassword,
        phone,
        pic,
        indangamuntu,
      });
      ctxDispatch({ type: "IYANDIKISHE", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/home");
    } catch (error) {
      toast.error(getError(error));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

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
      className="justify-content-center align-items-center"
      style={{
        height: "100vh",
      }}
    >
      <Helmet>
        <title>Iyandikishe</title>
      </Helmet>
      <Container>
        <Form
          style={{
            width: "50vw",
            WebkitBoxShadow: "-5px 13px 15px 8px #000000",
            boxShadow: "-5px 13px 15px 8px #000000",
          }}
          onSubmit={submitHandler}
        >
          <h1 style={{ marginRight: "3rem", textAlign: "center" }}>
            Iyandikishe
          </h1>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>NID</FormLabel>
            <FormControl
              type="number"
              value={indangamuntu}
              onChange={(e) => setIndangamuntu(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
                <FormControl
                  as="select"
                  value={district}
                  onChange={handleDistrict}
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
                <FormControl
                  as="select"
                  value={village}
                  onChange={handleVillage}
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
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Emeza Ijambobanga banga</FormLabel>
            <FormControl
              type="password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }}>
            <FormLabel>Phone</FormLabel>
            <FormControl
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }} className="mb-3">
            <FormLabel>Ifoto</FormLabel>
            <FormControl value={pic} onChange={(e) => setPic(e.target.value)} />
          </FormGroup>
          <FormGroup style={{ margin: "4px" }} className="mb-3">
            <FormLabel>Shyiraho ifoto</FormLabel>
            <FormControl
              type="file"
              accept="image/*"
              onChange={uploadHandler}
            />
            {loadingUpload && <LoadingBox />}
          </FormGroup>
          <Button
            style={{
              alignItems: "center",
              backgroundImage:
                "linear-gradient(to right, blue, rgb(167, 167, 36), green)",
              margin: "1rem",
            }}
            type="submit"
          >
            <GiArchiveRegister
              style={{
                fontSize: "40px",

                color: "blue",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </Button>
          <div className="mb-3">
            musanganye konte?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Injira</Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default RegisterScreen;
