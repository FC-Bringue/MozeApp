import { useParams, useNavigate, Outlet } from "react-router-dom";

import "../../../styles/session/Session.scss";
import SessionCards from "./SessionCards";
import SessionSettings from "./SessionSettings";
import SessionAdd from "./SessionAdd";

const SessionContainer = () => {
  const { sessionID, settingsType } = useParams();
  const navigate = useNavigate();

  return (
    <section id="sessions">
      <Outlet />
    </section>
  );
};

export default SessionContainer;
