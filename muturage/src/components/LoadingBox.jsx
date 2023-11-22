import React from "react";
import { Spinner } from "react-bootstrap";

function LoadingBox() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Shakisha...</span>
    </Spinner>
  );
}

export default LoadingBox;
