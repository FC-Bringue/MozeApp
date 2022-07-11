import { ImCross, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { useParams, useNavigate, Outlet } from "react-router-dom";

import Lights from "./lights/Step0Lights";

import "../../../styles/session/lights/lights.scss";

const switchParam = (typeOfSetting: any) => {
  console.log(typeOfSetting.typeOfSetting);
  switch (typeOfSetting.typeOfSetting) {
    case "config-playlist":
      console.log("playlist");
      return <Playlist />;
    case "config-lights":
      console.log("lights");
      return <Lights />;
    case "config-events":
      console.log("events");
      return <Events />;
    default:
      return;
  }
};

const Playlist = () => {
  return (
    <>
      <h4>Nom de la session</h4>
      <h2>Playlist</h2>
    </>
  );
};

const Events = () => {
  return (
    <>
      <h4>Nom de la session</h4>
      <h2>Playlist</h2>
    </>
  );
};

const SessionSettings = (typeOfSetting: any) => {
  const navigate = useNavigate();
  const { sessionID } = useParams();
  return (
    <section id="paramsSessions">
      <div
        className="exit"
        onClick={() => navigate("/dashboard/sessions/" + sessionID)}
      >
        <ImCross size={"2em"} />
      </div>
      {/* {switchParam(typeOfSetting)} */}
      <Outlet />
    </section>
  );
};

export default SessionSettings;
