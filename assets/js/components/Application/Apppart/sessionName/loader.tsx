import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import mozeLogo from "../../../../../img/logos/MOZE.svg";

const Starting: React.FC<{}> = () => {
  return (
    <Container className="Starting">
      <Row>
        <Col className="logoCenter">
          <img src={mozeLogo} title="mozeLogo" className="w-100" />
        </Col>
      </Row>
    </Container>
  );
};

export default Starting;
