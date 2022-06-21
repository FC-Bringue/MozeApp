import { useParams } from "react-router-dom";

import logoHome from "../img/icons/logoHome.svg";
import dashboard from "../img/icons/dashboard.svg";
import play from "../img/icons/play.svg";
import setting from "../img/icons/setting.svg";

import { tabRedirects } from "../helpers/functions/tabRedirects";

import "../styles/Navigation.css";

const Navigation = () => {
  const { tab } = useParams();
  console.log(`tabis${tab}`);

  return (
    <nav id="navigation">
      <div>
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg"
          }
          title="logo"
        />
      </div>
      <div className={`${tab === "accueil" ? "active" : ""}`}>
        <div>
          <img src={logoHome} title="accueil" />
        </div>
        <p>ACCUEIL</p>
      </div>
      <div
        className={`${tab === "sessions" ? "active" : ""}`}
        onClick={() => tabRedirects("sessions")}
      >
        <div>
          <img src={play} title="session" />
        </div>
        <p>SESSION</p>
      </div>
      <div className={`${tab === "dashboard" ? "active" : ""}`}>
        <div>
          <img src={dashboard} title="dashboard" />
        </div>
        <p>PLAYLIST</p>
      </div>
      <div
        className={`${tab === "settings" ? "active" : ""}`}
        onClick={() => {
          window.location.href = "/dashboard/settings";
          tabRedirects("settings");
        }}
      >
        <div>
          <img src={setting} title="settings" />
        </div>
        <p>PARAMETRES</p>
      </div>
    </nav>
  );
};

export default Navigation;
