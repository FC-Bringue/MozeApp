import axios from "axios";

import amazonMusic from "../../../img/logos/amazonMusic.png";
import spotify from "../../../img/logos/spotify.png";
import deezer from "../../../img/logos/deezer.png";

import "../../../styles/settings/Parametres.css";
import "../../../styles/settings/Application.css";

import { useSelector } from "react-redux";

const Application = () => {
  const bearerToken = useSelector((state: any) => state.userInfos.token);
  const config = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  return (
    <section id="applications">
      <div
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
        <p>CONNECTER SON COMPTE</p>
        <div className="appLogo">
          <img src={spotify} title="spotify" />
        </div>
      </div>
      <div className="deezer">
        <p>CONNECTER SON COMPTE</p>
        <div className="appLogo">
          <img src={deezer} title="deezer" />
        </div>
      </div>
      <div className="amazon">
        <p>CONNECTER SON COMPTE</p>
        <div className="appLogo">
          <img src={amazonMusic} title="amazonMusic" />
        </div>
      </div>
    </section>
  );
};

export default Application;
