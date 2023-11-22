import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Store } from "../store";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, visitor: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UKEKWA":
      return { ...state, loading: false, ukekwa: action.payload };
    default:
      return state;
  }
};

function VisitorScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, visitor, ukekwa }, dispatch] = useReducer(reducer, {
    loading: true,
    visitor: [],
    ukekwa: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/umushyitsi", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, [userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/ukekwa", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "UKEKWA", payload: data });
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [userInfo]);

  useEffect(() => {
    const matchingId = visitor.filter((visit) =>
      ukekwa.some((ukekwa) => ukekwa.idNumber === visit.indangamunt)
    );
    if (matchingId.length > 0) {
      toast.error(`Uwo mwashakishaga yabonetse ${matchingId[0].firstName} `);
    }
  }, [visitor, ukekwa]);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>error</h1>
      ) : (
        <Card style={{ width: "18rem" }}>
          <Card.Header>
            <Card.Title>abashyitsi</Card.Title>
          </Card.Header>
          <Card.Body>
            {visitor.map((visitor) => (
              <div key={visitor._id}>
                <Row>
                  <Col>
                    <h3>{visitor.firstName}</h3>
                    <h3>{visitor.middleName}</h3>
                    <h3>{visitor.lastName}</h3>
                    <h3>{visitor.indangamuntu}</h3>
                  </Col>
                  <Col>
                    <h3>{visitor.nationality}</h3>
                    <h3>{visitor.umudugudu}</h3>
                    <h3>{visitor.akagali}</h3>
                    <h3>{visitor.umurenge}</h3>
                    <h3>{visitor.akarere}</h3>
                  </Col>
                  <Col>
                    <h3>{visitor.impamvu}</h3>
                    <h3>{visitor.igiheAhageze}</h3>
                    <h3>{visitor.igiheAmara}</h3>
                    <h3>{visitor.received}</h3>
                  </Col>
                  <Col>
                    <h3>{visitor.image}</h3>
                    <h3>{visitor.sex}</h3>
                    <h3>{visitor.status}</h3>
                  </Col>
                </Row>
              </div>
            ))}
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default VisitorScreen;
