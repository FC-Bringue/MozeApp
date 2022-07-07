import { useParams, useNavigate, Navigate } from "react-router-dom";

import "../../../styles/session/Session.scss";
import SessionCards from "./SessionCards";
import SessionSettings from "./SessionSettings";

const smplSess = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const SessionSolo = () => {
  const navigate = useNavigate();
  const { sessionID } = useParams();
  return (
    <>
      <h4>SESSIONS</h4>
      <h1>Nom de la session</h1>
      <div id="params-options">
        <div
          onClick={() => {
            navigate("/dashboard/sessions/" + sessionID + "/config-playlist");
          }}
        >
          <h2>Playlist</h2>
          <p>Choisissez la playlist de départ pour votre session !</p>
          <div>CURRENT PLAYLIST</div>
        </div>
        <div
          onClick={() => {
            navigate("/dashboard/sessions/" + sessionID + "/config-lights");
          }}
        >
          <h2>Lumieres</h2>
          <p>
            Egayez vos soirées en personnalisant toutes les teintes de lumières
            que vous voulez !
          </p>
          <div>ACTIF - CURRENT COLOR</div>
        </div>
        <div
          onClick={() => {
            navigate("/dashboard/sessions/" + sessionID + "/config-events");
          }}
        >
          <h2>Evenements</h2>
          <p>Proposez a vos invités des activités qui vous plairont !</p>
          <div>ACTIF - CURRENT COLOR</div>
        </div>
      </div>
    </>
  );
};

const SessionsListing = () => {
  return (
    <>
      <h4>SESSIONS</h4>
      <h1>LISTE DES SESSIONS</h1>
      <section className="session-list">
        {smplSess.map((number) => (
          <SessionCards number={number} />
        ))}
      </section>
    </>
  );
};

const SessionUtil = () => {
  const { sessionID, settingsType } = useParams();
  const navigate = useNavigate();

  return (
    <section id="sessions">
      {sessionID ? <SessionSolo /> : <SessionsListing />}
      {settingsType && (
        <>
          <div id="back-ovr"></div>
          <SessionSettings typeOfSetting={settingsType} />
        </>
      )}
    </section>
  );
};

export default SessionUtil;
