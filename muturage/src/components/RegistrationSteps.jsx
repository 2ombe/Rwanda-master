import React from "react";
import { Col, Row } from "react-bootstrap";

function RegistrationSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? "active" : ""}>Imwirondoro</Col>
      <Col className={props.step2 ? "active" : ""}>Aho aturutse</Col>
      <Col className={props.step3 ? "active" : ""}>Amakuru y'igihe azamara</Col>
      <Col className={props.step4 ? "active" : ""}>Amakuru y'amasezerano</Col>
      <Col className={props.step5 ? "active" : ""}>Amakuru y'umwakiriye</Col>
      <Col className={props.step6 ? "active" : ""}>Emeza kwandikisha</Col>
    </Row>
  );
}

export default RegistrationSteps;
