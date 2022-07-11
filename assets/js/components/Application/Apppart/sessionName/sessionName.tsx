import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Arrow from "../../../../../img/icons/Arrow_right.png";
import { animate, motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  setNameGuest,
  setTokenGuest,
} from "../../../../../helpers/redux/slices/guestSlice";
import Loader from "../sessionName/loader";

import { setDisplayApp } from "../../../../../helpers/redux/slices/websiteWorkerSlice";

const Pseudo = () => {
  const { sessionid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pseudo = useSelector((state: any) => state.login.pseudo);
  const [cookies, setCookie, removeCookie] = useCookies([
    "user",
    "token",
    "sessionUrl",
  ]);
  const [name, setUsername] = useState("");
  const token = (Math.random() + 1).toString(36).substring(7);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const tokenStored = useSelector((state: any) => state.guest.tokenGuest);
  const loader = useSelector((state: any) => state.websiteWorker.displayApp);

  useEffect(() => {
    dispatch(setDisplayApp(false));
    console.log(tokenStored);
    axios
      .post(
        "/api/get/isAlreadyCreated",
        {
          token: tokenStored,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.message) {
          navigate(`/app/${sessionid}/acceuil`);
          return;
        }
        dispatch(setDisplayApp(true));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCookie() {
    setCookie("user", name, { path: "/" });
    setCookie("token", token, { path: "/" });
    dispatch(setNameGuest(name));
    dispatch(setTokenGuest(token));
  }
  function handleRemoveCookie() {
    removeCookie("user");
  }

  function addGuest() {
    handleRemoveCookie();
    handleCookie();
    console.log(token);
    {
      console.log(name);
    }

    axios
      .post(
        "/api/set/guest/" + sessionid,
        { name: name, token: token },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        console.log(res);
        console.log(res.status);
        if (res.status === 200) {
          navigate(`/app/${sessionid}/acceuil`);
        } else {
          navigate(`/app/${sessionid}/addguest`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {loader ? (
        <>
          <Container className="SessionName">
            <Row>
              <Col className="text-center">
                <h2 className="p-5"> Bienvenue </h2>
              </Col>
            </Row>
            <form>
              <Row>
                <Col className="text-left">
                  <label className="d-grid">
                    <span>Pseudo :</span>
                    <input
                      type="search"
                      name="name"
                      className="name"
                      placeholder="Ex : xX_jf_Xx"
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </label>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <motion.label
                    whileHover={{ scale: 1.2 }}
                    initial={{ scale: 1 }}
                  >
                    <div className="send" onClick={addGuest}>
                      <img src={Arrow} title="MozeLogo" className="w-100" />
                    </div>
                  </motion.label>
                </Col>
              </Row>
            </form>
          </Container>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Pseudo;
