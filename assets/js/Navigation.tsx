import { useParams, useNavigate } from "react-router-dom";

import { RiSettings4Line } from "react-icons/ri";
import { HiOutlineHome } from "react-icons/hi";
import { BsPlay } from "react-icons/bs";
import logoHome from "../img/icons/logoHome.svg";
import dashboard from "../img/icons/dashboard.svg";
import play from "../img/icons/play.svg";
import setting from "../img/icons/setting.svg";
import logoMoze from "../img/logos/Moze.svg";

import { tabRedirects } from "../helpers/functions/tabRedirects";

import "../styles/Navigation.scss";

const Navigation = () => {
  const navigate = useNavigate();
  const { tab } = useParams();
  console.log(`tabis${tab}`);

  return (
    <nav id="navigation">
      <div onClick={() => navigate("/dashboard/resume")}>
        <img src={logoMoze} title="logo" />
      </div>
      <div
        className={`${tab === "accueil" ? "active" : ""} btn-nav`}
        onClick={() => navigate("/dashboard/resume")}
      >
        {/* <div>
          <img src={logoHome} title="accueil" />
        </div> */}
        <HiOutlineHome size={"2em"} />
        <p>ACCUEIL</p>
      </div>

      <div
        className={`${tab === "sessions" ? "active" : ""} btn-nav`}
        onClick={() => navigate("/dashboard/sessions")}
      >
        {/* <div>
          <img src={play} title="session" />
        </div> */}
        <BsPlay size={"2em"} />
        <p>SESSIONS</p>
      </div>
      <div
        className={`${tab === "settings" ? "active" : ""} btn-nav`}
        onClick={() => {
          navigate("/dashboard/settings");
        }}
      >
        {/* <div>
          <img src={setting} title="settings" />
        </div> */}
        <RiSettings4Line size={"2em"} />
        <p>PARAMETRES</p>
      </div>

      <div className="copyright">
        <p>MOZEAPP - {new Date().getFullYear()}</p>
      </div>
    </nav>
  );
};

export default Navigation;
