import React from "react";
import { animate, motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import FlecheInfini from "../../../../../img/icons/fleche-infini.png";
import NoADS from "../../../../../img/icons/no-ads.png";
import NoteMusique from "../../../../../img/icons/note-musique.png";
import { resolvePath } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { GiPartyPopper } from "react-icons/gi";
import { FaLightbulb, FaMusic } from "react-icons/fa";

const Content: React.FC<{}> = () => {
  const { ref, inView } = useInView();
  const animation1 = useAnimation();
  const animation2 = useAnimation();

  useEffect(() => {
    if (inView) {
      animation1.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });
      animation2.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });
    }
    if (!inView) {
      animation1.start({ x: "-100vw" });
      animation2.start({ x: "100vh" });
    }
  }, [inView]);

  return (
    <section className="landing-Content w-100 ">
      <Container ref={ref}>
        <Row>
          <Col>
            <motion.div animate={animation1}>
              <p className="text-center">
                <span className="fw-bold">MOZE</span>, est l'application de
                gestion de salle nouvelle génération pour votre entreprise, quel
                que soit votre type de salle.
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>
      <div className="w-100 border-top border-bottom border-white">
        <Container>
          <Row className="text-center Pourquoi">
            <Col xs={12}>
              <motion.div animate={animation2}>
                <h2 className="text-center fw-bold py-5">
                  Quelles sont les fonctionnalités de MOZE ?
                </h2>
              </motion.div>
            </Col>

            <Col lg={4} sm={12} xs={12}>
              <div className="d-grid">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  title="music"
                  className="m-auto p-3 note"
                >
                  <FaLightbulb size={"6em"} color={"white"} />
                </motion.div>
                <span className="colExample">
                  Controle de lumieres connectées
                  <br />
                  (marque Yeelight)
                </span>
              </div>
            </Col>
            <Col lg={4} sm={12} xs={12}>
              <div className="d-grid">
                <motion.div
                  whileHover={{
                    y: "-50vw",
                    transition: {
                      type: "spring",
                      duration: 3,
                      bounce: 0.3,
                    },
                  }}
                  initial={{ y: "0" }}
                  title="music"
                  className="m-auto p-3 note"
                >
                  <FaMusic size={"6em"} color={"white"} />
                </motion.div>
                <span className="colExample beige">
                  Controle des musiques avec votes
                  <br />
                  (necessite Spotify Premium)
                </span>
              </div>
            </Col>
            <Col lg={4} sm={12} xs={12}>
              <div className="d-grid pb-lg-3">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  initial={{ scale: 1 }}
                  title="music"
                  className="m-auto p-3"
                >
                  <GiPartyPopper size={"6em"} color={"white"} />
                </motion.div>
                <span className="colExample">
                  Gestion d'évenements
                  <br />
                  (à venir)
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Content;
