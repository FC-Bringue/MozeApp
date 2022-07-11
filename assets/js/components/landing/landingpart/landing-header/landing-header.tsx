import React from "react";
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import MozeLogo from "../../../../../img/logos/Moze.svg";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const animation3 = useAnimation();
  const bearerToken = useSelector((state: any) => state.userInfos.token);
  useEffect(() => {
    if (inView) {
      animation3.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });
    }
    if (!inView) {
      animation3.start({ x: "-100vw" });
    }
  }, [inView]);

  return (
    <section className="landing-header w-100 px-4 py-4">
      <nav className="navbar navbar-expand-lg w-100 navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {" "}
            <img src={MozeLogo} title="music" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {bearerToken ? (
                <div className="d-flex">
                  <li
                    className="nav-item"
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                      navigate(`/dashboard/resume`);
                    }}
                  >
                    <a className="nav-link " aria-current="page">
                      Acceder au dashboard
                    </a>
                  </li>
                </div>
              ) : (
                <div className="d-flex">
                  <li
                    className="nav-item"
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                      navigate(`/register`);
                    }}
                  >
                    <a className="nav-link " aria-current="page">
                      s'inscrire
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link "
                      aria-current="page"
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        navigate(`/login`);
                      }}
                    >
                      Connexion
                    </a>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Container>
        <Row ref={ref}>
          <Col lg={6} sm={12} xs={12}>
            <motion.div animate={animation3} className="Header-content">
              <h1>Rendez le controle a vos utilisateurs !</h1>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <div className="ico animated">
        <div className="circle circle-top"></div>
        <div className="circle circle-main"></div>
        <div className="circle circle-bottom"></div>

        <svg
          className="svg tegest"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 612 612"
          xmlSpace="preserve"
        >
          <defs>
            <clipPath id="cut-off-arrow">
              <circle cx="306" cy="306" r="287" />
            </clipPath>

            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
          <path
            className="st-arrow"
            d="M317.5,487.6c0.3-0.3,0.4-0.7,0.7-1.1l112.6-112.6c6.3-6.3,6.3-16.5,0-22.7c-6.3-6.3-16.5-6.3-22.7,0
					l-86,86V136.1c0-8.9-7.3-16.2-16.2-16.2c-8.9,0-16.2,7.3-16.2,16.2v301.1l-86-86c-6.3-6.3-16.5-6.3-22.7,0
					c-6.3,6.3-6.3,16.5,0,22.7l112.7,112.7c0.3,0.3,0.4,0.7,0.7,1c0.5,0.5,1.2,0.5,1.7,0.9c1.7,1.4,3.6,2.3,5.6,2.9
					c0.8,0.2,1.5,0.4,2.3,0.4C308.8,492.6,313.8,491.3,317.5,487.6z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Header;
