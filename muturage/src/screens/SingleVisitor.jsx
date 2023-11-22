import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import { Store } from "../store";
import { Link } from "react-router-dom";

function SingleVisitor() {
  const [visitor, setVisitors] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const { id: visitorId } = params;
  const { state } = useContext(Store);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/umushyitsi/${visitorId}`, {
          headers: { authorization: `Bearer ${state.userInfo.token}` },
        });
        setVisitors(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [state, visitorId]);

  return (
    <>
      <Helmet>
        <title>incamake</title>
      </Helmet>
      <h1 className="mb-3">Incamake</h1>
      <Row>
        <Col className="mb-3">
          <Card className="mb-3">
            <Card.Title>Imyirondoro</Card.Title>
            <Card.Body>
              <Card.Text>
                <div>
                  <strong>Izina:</strong>
                  {visitor.visitorsInfo?.firstName}
                </div>
                <div>
                  <strong>Izina rihera:</strong>
                  {visitor.visitorsInfo?.lastName}
                </div>
                <div>
                  <strong>Indangamuntu:</strong>
                  {visitor.visitorsInfo?.indangamuntu}
                </div>
                <div>
                  <strong>Igitsina:</strong>
                  {visitor.visitorsInfo?.sex}
                </div>
                <strong>Irangamimerere:</strong>
                {visitor.visitorsInfo?.status}
              </Card.Text>
              <Link to="/abashyitsi">Vugurura</Link>
            </Card.Body>
          </Card>
          <hr />
          <Card className="mb-3">
            <Card.Title>Aho yaje aturutse</Card.Title>
            <Card.Body>
              <Card.Text>
                <div>
                  <strong>Igihugu:</strong> {visitor.address?.nationality}
                </div>
                <div>
                  <strong>Intara:</strong> {visitor.address?.province}
                </div>
                <div>
                  <strong>Akarere:</strong> {visitor.address?.district}
                </div>
                <div>
                  <strong>Umurenge:</strong> {visitor.address?.sector}
                </div>
                <div>
                  <strong>Akagali:</strong> {visitor.address?.cell}
                </div>
                <strong>Umudugudu:</strong> {visitor.address?.village}
              </Card.Text>
              <Link to="/aturutse">Vugurura</Link>
            </Card.Body>
          </Card>
          <hr />
          <Card className="mb-3">
            <Card.Title>Amakuru y'ikimugenza</Card.Title>
            <Card.Body>
              <Card.Text>
                <div>
                  <strong>Impamvu</strong>
                  {visitor.stayingInfo?.impamvu}
                </div>
                <div>
                  <strong>Igihe ahagereye</strong>
                  {visitor.stayingInfo?.igiheAhageze}
                </div>
                <div>
                  <strong>Igihe azamara</strong>
                  {visitor.stayingInfo?.igiheAmara}
                </div>
              </Card.Text>
              <Link to="/impamvu">Vugurura</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-3">
          <Card className="mb-3">
            <Card.Title>Amasezerano mufitanye</Card.Title>
            <Card.Body>
              <Card.Text>
                <div>
                  <strong>Umushahara:</strong>
                  {visitor.contract?.salary} RWF
                </div>
                <div>
                  <strong>Amasaha y'akazi:</strong>
                  {visitor.contract?.workHour}
                </div>
                <div>
                  <strong>Inshingano ze:</strong>
                  {visitor.contract?.akazi}
                </div>
                <div>
                  <strong>Impamvu z'icyiruhuko:</strong>
                  {visitor.contract?.sickLeave}
                </div>
                <div>
                  <strong>Amakimbirane:</strong>
                  {visitor.contract?.dispute}
                </div>
                <strong>Iseswa ry'amasezerano:</strong>
                {visitor.contract?.termination}
              </Card.Text>
              <Link to="/amasezerano">Vugurura</Link>
            </Card.Body>
          </Card>
          <hr />
          <Card className="mb-3">
            <Card.Title>Amasezerano y'ubukode</Card.Title>
            <Card.Text>
              <div>
                <strong>Amafaranga y'ubukode</strong>
                {visitor.rent?.amount} RWF
              </div>
              <div>
                <strong>Amafaranga y'ibyo yakwangiza</strong>
                {visitor.rent?.securityBill} RWF
              </div>
              <div>
                <strong>amashanyarazi,amazi,...</strong>
                {visitor.rent?.utilitiesBills} RWF
              </div>
              <div>
                <strong>umubare wabakodeshejwe: </strong>
                {visitor.rent?.Occupancy}
              </div>
              <div>
                <strong>amatungo yemerewe: </strong>
                {visitor.rent?.petPolicy}
              </div>
              <div>
                <strong>Ibitemewe: </strong>
                {visitor.rent?.restrictions}
              </div>
              <div>
                <strong>Impamvu y'iseswa: </strong>
                {visitor.rent?.termination}
              </div>
              <div>
                <strong>Intangiriro yamasezerano: </strong>
                {visitor.rent?.entryDate}
              </div>
              <strong>Isozwa cd ivugururwa ry'amasezerano: </strong>
              {visitor.rent?.exitDate}
            </Card.Text>
            <Link to="/ubukode">Vugurura</Link>
          </Card>
          <Card>
            <Card.Title>Andi makuru</Card.Title>
            <Card.Body>
              <Card.Text>
                <Row>
                  <Col>
                    <strong>Umusoro w'ubukode</strong>
                    {visitor?.tax}
                  </Col>
                </Row>
              </Card.Text>
              <Link to="/umwakiriye">Vugurura</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <div className="d-flex justify-content-center">
          <Button
            type="button"
            centered
            style={{ width: "20%" }}
            onClick={() => {
              navigate("/home");
            }}
          >
            Subira kuntangiriro
          </Button>
        </div>
      </Row>
    </>
  );
}

export default SingleVisitor;
