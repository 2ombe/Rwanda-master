import React from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { Store } from "../store";
import { BiLogInCircle } from "react-icons/bi";

export default function SignIn() {
  const { search } = useLocation();

  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl && "/home";
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { dispatch: ctxDispatch } = useContext(Store);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });
      ctxDispatch({ type: "INJIRA", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="small-container mt-5  ">
      <Helmet>
        <title>Injira</title>
      </Helmet>
      <Form onSubmit={submitHandler}>
        <h1 className="mt-3">Injira</h1>
        <Form.Group className="mb-3">
          <Form.Label>emeli</Form.Label>
          <Form.Control
            style={{ width: "100%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ijambobanga</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />

          <div className="mb-3 mt-3" style={{ display: "flex" }}>
            <Button
              style={{
                backgroundImage:
                  "linear-gradient(to right, blue, rgb(167, 167, 36), green)",
              }}
              type="submit"
            >
              <BiLogInCircle style={{ color: "blue", fontSize: "35px" }} />
            </Button>
            <Button
              variant="solid"
              type="submit"
              style={{
                color: "blue",
                marginLeft: "6rem",
                backgroundImage:
                  "linear-gradient(to right, blue, rgb(167, 167, 36), green)",
              }}
              onClick={() => {
                setEmail("umushyitse@gmail.com");
                setPassword("rwanda1visitor");
              }}
            >
              Visit Rwanda
            </Button>
          </div>
          <div className="mb-4">
            Muri bashya?{" "}
            <Link to={`/signup?redirect=${redirect}`}>Fungura konti</Link>
          </div>
        </Form.Group>
      </Form>
    </Container>
  );
}
