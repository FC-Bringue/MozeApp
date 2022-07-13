import { ImCross, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Lights from "./lights/Step0Lights";

import "../../../styles/session/lights/lights.scss";

const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

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
      <motion.div
        whileHover={{ opacity: 0.4, scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        transition={transition}
        className="exit"
        onClick={() => navigate("/dashboard/sessions/" + sessionID)}
      >
        <ImCross size={"2em"} />
      </motion.div>
      {/* {switchParam(typeOfSetting)} */}
      <Outlet />
    </section>
  );
};

export default SessionSettings;
