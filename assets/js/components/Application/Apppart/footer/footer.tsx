import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import btnleft from "../../../../../img/icons/Sort.png";
import btnmid from "../../../../../img/icons/music.png";
import { FaUserAlt, FaMusic } from "react-icons/fa";
import { animate, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDisplayApp } from "../../../../../helpers/redux/slices/websiteWorkerSlice";

const Starting: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionid } = useParams();
  return (
    <section className="footerApp w-100">
      <Row>
        <Col className="d-flex  align-items-center">
          <motion.label whileHover={{ scale: 1.2 }} initial={{ scale: 1 }}>
            <div
              id="navigate-Acceuil"
              onClick={async () => {
                dispatch(setDisplayApp(false));
                navigate(`/app/${sessionid}/acceuil`);
              }}
            >
              <img src={btnleft} title="MozeLogo" className="footerIcon" />
            </div>
          </motion.label>
        </Col>

        <Col className="d-flex  align-items-center">
          <motion.label whileHover={{ scale: 1.2 }} initial={{ scale: 1 }}>
            <div
              id="navigate-Profile"
              onClick={async () => {
                dispatch(setDisplayApp(false));
                navigate(`/app/${sessionid}/music`);
              }}
            >
              <FaMusic
                size={"6em"}
                color={"white"}
                title="MozeLogo"
                className="footerIcon"
              />
            </div>
          </motion.label>
          <input type="submit" id="upload-button" style={{ display: "none" }} />
        </Col>

        <Col className="d-flex  align-items-center">
          <motion.label whileHover={{ scale: 1.2 }} initial={{ scale: 1 }}>
            <div
              id="navigate-Profile"
              onClick={async () => {
                dispatch(setDisplayApp(false));
                navigate(`/app/${sessionid}/profile`);
              }}
            >
              <FaUserAlt title="MozeLogo" className="footerIcon" />
            </div>
          </motion.label>
        </Col>
      </Row>
    </section>
  );
};

export default Starting;
