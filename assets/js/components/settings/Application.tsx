import {useNavigate} from "react-router-dom";

import amazonMusic from "../../../img/logos/amazonMusic.png";
import spotify from "../../../img/logos/spotify.png";
import deezer from "../../../img/logos/deezer.png";

import "../../../styles/settings/Parametres.css";
import "../../../styles/settings/Application.css";


const Application = () => {
  const navigate = useNavigate();

  return (
    <section id="applications">
      <div className="spotify"
      onClick={() => navigate("localhost/api/get/spotify/TokenUrl")}
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
