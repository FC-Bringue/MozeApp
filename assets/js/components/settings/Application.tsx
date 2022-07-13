import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import { useState } from "react";
import amazonMusic from "../../../img/logos/amazonMusic.png";
import spotify from "../../../img/logos/spotify.png";
import mozeyee from "../../../img/logos/mozeyee.png";
import deezer from "../../../img/logos/deezer.png";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bars } from "react-loader-spinner";
import { Container, Row, Col } from "react-bootstrap";

import { setIsLoggedToSpotify } from "../../../helpers/redux/slices/userInfosSlice";

import "../../../styles/settings/Parametres.css";
import "../../../styles/settings/Application.css";
import { setDisplayParams } from "../../../helpers/redux/slices/websiteWorkerSlice";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

const Application = () => {
  const dispatch = useDispatch();
  const Bearer = useSelector((state: any) => state.userInfos.token);
  const [fdp, setfdp] = useState(false);
  const isConnected = useSelector(
    (state: any) => state.userInfos.isLoggedToSpotify
  );
  const displayParams = useSelector(
    (state: any) => state.websiteWorker.displayParams
  );
  const config = {
    headers: {
      Authorization: `Bearer ${Bearer}`,
    },
  };

  useEffect(() => {
    dispatch(setDisplayParams(false));
    axios
      .get("/api/get/isConnected", config)
      .then((res) => {
        console.log("isLOggedToSpotifyLA", res.data);
        if (res.data.message == "Not Connected") {
          setfdp(false)
          dispatch(setIsLoggedToSpotify(false));
          setfdp(true)
        } else {
          dispatch(setIsLoggedToSpotify(true));
          setfdp(false)
        }

        dispatch(setDisplayParams(true));
      })
      .catch((err) => {
        console.log("isLOggedToSpotifyERR", err);
        dispatch(setIsLoggedToSpotify(false));
        setfdp(false)
        dispatch(setDisplayParams(true));
      });
  }, []);

  return (
    <>
      <section id="applications">
        {displayParams ? (
          <>
            <motion.div
              style={{
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={transition}
              className="spotify"
              onClick={() => {
                axios
                  .get("/api/get/spotify/TokenUrl", config)
                  .then((res) => {
                    console.log(res);
                    window.location.replace(res.data.url);
                  })
                  .catch((ee) => {
                    console.log(ee);
                  });
              }}
            >
              {fdp ? <p>Se connecter</p> : <p>Se connecter</p>}
              <div className="appLogo">
                <img src={spotify} title="spotify" />
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={transition}
              className="mozeyee"
              style={{
                cursor: "pointer",
              }}
            >
              <p id="mozeyeetxt">Moze Yeelight Control (Windows)</p>
              <div className="appLogo">
                <img src={mozeyee} title="mozeyee" />
              </div>
            </motion.div>
          </>
        ) : (
          <div className={"loaderContainer"}>
            <Bars color="#595251" height={200} width={200} />
          </div>
        )}
      </section>
    </>
  );
};

export default Application;
