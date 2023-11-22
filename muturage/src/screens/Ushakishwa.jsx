import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Store } from "../store";
import { useNavigate } from "react-router";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, abakekwa: action.paylaod };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UMUSHYITSI":
      return { ...state, loading: false, visitors: action.paylaod };
    case "FIND_MATCH":
      return { ...state, found: action.payload };

    default:
      return state;
  }
};

function Ushakishwa() {
  const navigate = useNavigate();
  const [{ loading, error, visitors, abakekwa, found }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: null,
      visitors: [],
      abakekwa: [],
      found: [],
    }
  );
  console.log(found);

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const result = await axios.get("/api/ukekwa", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: "FETCH_SUCCESS", paylaod: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
        toast.error("failed to fetch abakekwa");
      }
    };
    fetchData();
  }, [userInfo]);
  useEffect(() => {
    const fetchVisitor = async () => {
      const result = await axios.get("/api/umushyitsi", {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "UMUSHYITSI", paylaod: result.data });
    };
    fetchVisitor();
  }, [userInfo]);
  useEffect(() => {
    const matchingId = abakekwa.filter((ukekwa) =>
      visitors.some(
        (visitor) => visitor.visitorsInfo.indangamuntu === ukekwa.idNumber
      )
    );
    console.log(matchingId);
    if (matchingId.length >= 1) {
      const foundData = matchingId.map((ukekwa) => {
        const visitorData = visitors.find(
          (visitor) => visitor.visitorsInfo.indangamuntu === ukekwa.idNumber
        );
        toast.success("suspect found");
        return { abakekwa: ukekwa, visitor: visitorData };
      });
      dispatch({ type: "FIND_MATCH", payload: foundData });
    }
  }, [visitors, abakekwa]);
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs>
          <Card className="mt-3">
            <Table>
              <thead>
                <td>Photo</td>
                <td>izina ribanza</td>
                <td>izina rikurikira</td>
                <td>icyaha aregwa</td>
                <td>irangamuntu</td>
              </thead>
              <tbody>
                {abakekwa.map((wanted) => (
                  <tr key={wanted._id}>
                    <td>{wanted.pic}</td>
                    <td>{wanted.firstName}</td>
                    <td>{wanted.lastName}</td>
                    <td>{wanted.icyaha}</td>
                    <td>{wanted.idNumber}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {found && found.length >= 1 && (
              <div className="d-flex justify-content-center">
                <Button
                  style={{ width: "30%" }}
                  variant="primary"
                  type="button"
                  onClick={() => {
                    navigate("/found");
                  }}
                >
                  Uwabonetse
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Ushakishwa;
