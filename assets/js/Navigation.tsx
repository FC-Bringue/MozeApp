import { useParams, useNavigate } from "react-router-dom";

import logoHome from "../img/icons/logoHome.svg";
import dashboard from "../img/icons/dashboard.svg";
import play from "../img/icons/play.svg";
import setting from "../img/icons/setting.svg";
import logoMoze from "../img/logos/MOZE.png";

import { tabRedirects } from "../helpers/functions/tabRedirects";

import "../styles/Navigation.css";

const Navigation = () => {
  const navigate = useNavigate();
  const { tab } = useParams();
  console.log(`tabis${tab}`);

  return (
    <nav id="navigation">
      <div>
        <img src={logoMoze} title="logo" />
      </div>
      <div className={`${tab === "accueil" ? "active" : ""}`}>
        <div>
          <img src={logoHome} title="accueil" />
        </div>
        <p>ACCUEIL</p>
      </div>

      <div
        className={`${tab === "sessions" ? "active" : ""}`}
        onClick={() => navigate("/dashboard/sessions")}
      >
        <div>
          <img src={play} title="session" />
        </div>
        <p>SESSIONS</p>
      </div>
      <div
        className={`${tab === "settings" ? "active" : ""}`}
        onClick={() => {
          navigate("/dashboard/settings");
        }}
      >
        <div>
          <img src={setting} title="settings" />
        </div>
        <p>PARAMETRES</p>
      </div>

      <div className="copyright">
        <p>MOZEAPP - {new Date().getFullYear()}</p>
      </div>
    </nav>
  );
};

export default Navigation;
