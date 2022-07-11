import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MozeLogo from "../../../../../img/logos/MOZE.svg";

const Starting: React.FC<{}> = () => {
  return (
    <Container className="Starting">
      <Row>
        <Col className="logoCenter">
          <img src={MozeLogo} title="MozeLogo" className="w-100" />
        </Col>
      </Row>
    </Container>
  );
};

export default Starting;
