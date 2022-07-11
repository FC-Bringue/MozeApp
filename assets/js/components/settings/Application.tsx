import axios from "axios";

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

const Application = () => {
  const dispatch = useDispatch();
  const Bearer = useSelector((state: any) => state.userInfos.token);
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
        const isConnected = useSelector(
          (state: any) => state.userInfos.isConnected
        );
        console.log("isLOggedToSpotify", res.data);
        dispatch(setIsLoggedToSpotify(true));
        dispatch(setDisplayParams(true));
      })
      .catch((err) => {
        console.log("isLOggedToSpotify", err);
        dispatch(setIsLoggedToSpotify(false));
        dispatch(setDisplayParams(true));
      });
  }, []);

  return (
    <>
      {displayParams ? (
        <section id="applications" style={{ margin: "12em auto auto auto" }}>
          <div
            className="spotify"
            onClick={() => {
              if (isConnected) return;
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
            {isConnected ? <p>Lié</p> : <p>Se connecter</p>}
            <div className="appLogo">
              <img src={spotify} title="spotify" />
            </div>
          </div>
          <div className="mozeyee">
            <p id="mozeyeetxt">Moze Yeelight Control (Windows)</p>
            <div className="appLogo">
              <img src={mozeyee} title="mozeyee" />
            </div>
          </div>
        </section>
      ) : (
        <div className={"loaderContainer"}>
          <Bars color="#595251" height={200} width={200} />
        </div>
      )}
    </>
  );
};

export default Application;
