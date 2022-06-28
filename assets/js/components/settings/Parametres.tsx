import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import "../../../styles/settings/Parametres.css";
import SessionUtil from "../session/SessionUtil";
import Application from "./Application";

const Parametres = () => {
  const navigate = useNavigate();
  let { subTab } = useParams();

  console.log("subTab", subTab);

  const selectTab = (tabToDisplay: string) => {
    switch (tabToDisplay) {
      case "audio":
        return <SessionUtil />;
      case "linked-apps":
        return <Application />;
      default:
        return <Application />;
    }
  };

  return (
    <section id="parametres">
      <h4>PARAMETRES</h4>
      <h1>LE MACUMBA {/* Mettre un value pour le titre */}</h1>
      <div className="navigation">
        <div className={subTab === undefined ? "param-nav-active" : ""}>
          <p>GENERAL</p>
        </div>
        <div
          className={subTab === "linked-apps" ? "param-nav-active" : ""}
          onClick={() => navigate("settings/linked-apps")}
        >
          <p>APPLICATIONS</p>
        </div>
        <div
          className={subTab === "audio" ? "param-nav-active" : ""}
          onClick={() => navigate("settings/audio")}
        >
          <p>SORTIE AUDIO</p>
        </div>
      </div>
      {selectTab(subTab)}
    </section>
  );
};

export default Parametres;
