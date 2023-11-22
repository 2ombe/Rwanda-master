import React, { useContext, useReducer } from "react";
import { useNavigate } from "react-router";
import { Store } from "../store";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";
import RegistrationSteps from "../components/RegistrationSteps";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SECCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

function Andikisha() {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  console.log(cart.receiverInfo);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.tax = round2(0.18 * cart.rentInfo.amount);

  const registerVisitor = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        "api/umushyitsi",
        {
          visitorsInfo: cart.visitorsInfo,
          address: cart.addressInfo,
          stayingInfo: cart.stayingInfo,
          contract: cart.contractInfo,
          received: cart.receiverInfo,
          tax: cart.tax,
          rent: cart.rentInfo,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      ctxDispatch({ type: "SIBA" });
      dispatch({ type: "CREATE_SECCESS" });
      toast.success("Amakuru yakiriwe mububiko");
      navigate(`/home`);
    } catch (error) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(error));
    }
  };

  return (
    <>
      <RegistrationSteps step1 step2 step3 step4 step5 step6 />
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
                  {cart.visitorsInfo.firstName}
                </div>
                <div>
                  <strong>Izina rihera:</strong>
                  {cart.visitorsInfo.lastName}
                </div>
                <div>
                  <strong>Indangamuntu:</strong>
                  {cart.visitorsInfo.indangamuntu}
                </div>
                <div>
                  <strong>Igitsina:</strong>
                  {cart.visitorsInfo.sex}
                </div>
                <strong>Irangamimerere:</strong>
                {cart.visitorsInfo.status}
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
                  <strong>Igihugu:</strong> {cart.addressInfo.nationality}
                </div>
                <div>
                  <strong>Intara:</strong> {cart.addressInfo.province}
                </div>
                <div>
                  <strong>Akarere:</strong> {cart.addressInfo.district}
                </div>
                <div>
                  <strong>Umurenge:</strong> {cart.addressInfo.sector}
                </div>
                <div>
                  <strong>Akagali:</strong> {cart.addressInfo.cell}
                </div>
                <strong>Umudugudu:</strong> {cart.addressInfo.village}
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
                  {cart.stayingInfo.impamvu}
                </div>
                <div>
                  <strong>Igihe ahagereye</strong>
                  {cart.stayingInfo.igiheAhageze}
                </div>
                <div>
                  <strong>Igihe azamara</strong>
                  {cart.stayingInfo.igiheAmara}
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
                  {cart.contractInfo.salary} RWF
                </div>
                <div>
                  <strong>Amasaha y'akazi:</strong>
                  {cart.contractInfo.workHour}
                </div>
                <div>
                  <strong>Inshingano ze:</strong>
                  {cart.contractInfo.akazi}
                </div>
                <div>
                  <strong>Impamvu z'icyiruhuko:</strong>
                  {cart.contractInfo.sickLeave}
                </div>
                <div>
                  <strong>Amakimbirane:</strong>
                  {cart.contractInfo.dispute}
                </div>
                <strong>Iseswa ry'amasezerano:</strong>
                {cart.contractInfo.termination}
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
                {cart.rentInfo.amount} RWF
              </div>
              <div>
                <strong>Amafaranga y'ibyo yakwangiza</strong>
                {cart.rentInfo.securityBill} RWF
              </div>
              <div>
                <strong>amashanyarazi,amazi,...</strong>
                {cart.rentInfo.utilitiesBills} RWF
              </div>
              <div>
                <strong>umubare wabakodeshejwe: </strong>
                {cart.rentInfo.Occupancy}
              </div>
              <div>
                <strong>amatungo yemerewe: </strong>
                {cart.rentInfo.petPolicy}
              </div>
              <div>
                <strong>Ibitemewe: </strong>
                {cart.rentInfo.restrictions}
              </div>
              <div>
                <strong>Impamvu y'iseswa: </strong>
                {cart.rentInfo.termination}
              </div>
              <div>
                <strong>Intangiriro yamasezerano: </strong>
                {cart.rentInfo.entryDate}
              </div>
              <strong>Isozwa cd ivugururwa ry'amasezerano: </strong>
              {cart.rentInfo.exitDate}
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
                    {cart.tax}
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
            onClick={registerVisitor}
          >
            Emeza amakuru
          </Button>
        </div>
      </Row>
    </>
  );
}

export default Andikisha;
