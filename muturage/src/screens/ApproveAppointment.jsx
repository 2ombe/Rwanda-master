import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Store } from "../store";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const ApproveAppointment = ({ match, history }) => {
  const [date, setDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { params } = useParams();
  const appointmentId = params;
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(
          `/api/appointments/${appointmentId}`,
          config
        );
        setDate(data.date);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    };

    fetchAppointmentDetails();
  }, [userInfo.token, appointmentId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(
        `/api/gahunda/${appointmentId}`,
        { date, remarks },
        config
      );
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="py-3">Appointment Details</h2>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {loading ? (
            <LoadingBox />
          ) : (
            <>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="remarks">
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                  Approve
                </Button>
                <Link className="btn btn-secondary mx-3" to="/">
                  Cancel
                </Link>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ApproveAppointment;
