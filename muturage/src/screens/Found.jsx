import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Store } from "../store";
import { getError } from "../utils";

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

function Found() {
  const [found, setFound] = useState({});
  const [matched, setMatched] = useState([]);
  const [{ loading, error, visitors, abakekwa }, dispatch] = useReducer(
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

    if (matchingId.length >= 1) {
      const foundData = matchingId.map((ukekwa) => {
        const visitorData = visitors.find(
          (visitor) => visitor.visitorsInfo.indangamuntu === ukekwa.idNumber
        );
        setFound(ukekwa);
        setMatched(visitorData);

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
            <Table className="table">
              <thead
                style={{ border: "1px solid #ccc", backgroundColor: "#f2f2f2" }}
              >
                <th>Photo</th>
                <th>izina ribanza</th>
                <th>izina rikurikira</th>
                <th>izina aho yabonetse</th>
                <th>icyaha aregwa</th>
                <th>irangamuntu</th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img
                      src={`/images/${found.photo}`}
                      alt={found.firstName}
                      width="50px"
                    />
                  </td>
                  <td>{found.lastName}</td>
                  <td>{found.izinaRikurikira}</td>
                  <tr>
                    {" "}
                    <tr>
                      <td>Intara:{matched.address?.province}</td>{" "}
                    </tr>
                    <tr>
                      <td>Akarere:{matched.address?.district}</td>{" "}
                    </tr>
                    <tr>
                      <td>Umurenge:{matched.address?.sector}</td>{" "}
                    </tr>
                    <tr>
                      <td>Akagali:{matched.address?.cell}</td>{" "}
                    </tr>
                    <tr>
                      <td>Amudugudu:{matched.address?.village}</td>{" "}
                    </tr>
                  </tr>
                  <td>{found.icyaha}</td>
                  <td>{found.idNumber}</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Found;
