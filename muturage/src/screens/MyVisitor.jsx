import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../store";
import { getError } from "../utils";
import { useNavigate } from "react-router";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, visitors: action.paylaod };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "ARACYEKWA":
      return { ...state, loading: false, ukekwa: action.paylaod };

    default:
      return state;
  }
};

function MyVisitor() {
  const navigate = useNavigate();
  const [{ loading, visitors, error, ukekwa }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    visitors: [],
    ukekwa: [],
  });
  console.log(Array.isArray(visitors));
  const { state } = useContext(Store);

  useEffect(() => {
    const fetchUkekwa = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const ukekwa = await axios.get("/api/ukekwa", {
          headers: { Authorization: `Bearer ${state.userInfo.token}` },
        });

        dispatch({ type: "ARACYEKWA", paylaod: ukekwa.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchUkekwa();
  }, [state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const result = await axios.get("/api/umushyitsi", {
          headers: { Authorization: `Bearer ${state.userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", paylaod: result.data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [state]);

  useEffect(() => {
    const matchingId = visitors.filter((visitor) =>
      ukekwa.some((ukekwa) => ukekwa.id === visitor.indangamuntu)
    );

    if (matchingId.length > 0) {
      toast.error(`Umushyitsi wanyu akurikiranywe n' inzego zibishinzwe`);
    }
  }, [visitors, ukekwa]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox />
  ) : (
    <Container className="container small-container">
      <Card className="mt-3">
        <Table>
          <thead>
            <tr>
              <td>Amazina</td>
              <td>Indandamuntu</td>
              <td>Igihe agereye iwawe</td>
            </tr>
          </thead>

          <tbody>
            {visitors.map((visitor) => (
              <>
                <tr key={visitor._id}>
                  <td> {visitor.visitorsInfo.firstName}</td>
                  <td> {visitor.visitorsInfo.indangamuntu}</td>
                  <td> {visitor.stayingInfo.igiheAhageze.substring(0, 10)}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        navigate(`/umushyitsi/${visitor._id}`);
                      }}
                    >
                      Amakuru arambuye
                    </Button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}

export default MyVisitor;
