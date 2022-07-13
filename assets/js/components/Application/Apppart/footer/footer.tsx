import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import btnleft from "../../../../../img/icons/Sort.png";
/* import btnmid from "../../../../../img/icons/music.png";
import btnright from "../../../../../img/icons/profil.png"; */
import { FaUserAlt, FaMusic } from "react-icons/fa";
import { animate, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiUpvote } from "react-icons/bi";
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
                navigate(`/app/${sessionid}/search`);
              }}
            >
              {/* <img src={btnmid} title="MozeLogo" className="footerIcon" /> */}
              <FaMusic className="footerIcon" size={"4em"} color={"white"} />
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
              {/* <img src={btnright} title="MozeLogo" className="footerIcon" /> */}
              <FaUserAlt className="footerIcon" size={"4em"} color={"white"} />
            </div>
          </motion.label>
        </Col>
      </Row>
    </section>
  );
};

export default Starting;
