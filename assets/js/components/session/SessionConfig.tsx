import { useParams, useNavigate, Outlet } from "react-router-dom";

import { ImCross, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";

import "../../../styles/session/lights/lights.scss";

const SessionConfig = () => {
  const navigate = useNavigate();
  const { sessionID, onNew } = useParams();
  return (
    <section id="sessions">
      <h4>SESSIONS</h4>
      <h1>Nom de la session</h1>
      <div id="params-options">
        <div
          onClick={() => {
            navigate("config-playlist");
          }}
        >
          <h2>Playlist</h2>
          <p>Choisissez la playlist de départ pour votre session !</p>
          <div>CURRENT PLAYLIST</div>
        </div>
        <div
          onClick={() => {
            navigate("config-lights");
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
            navigate("config-events");
          }}
        >
          <h2>Evenements</h2>
          <p>Proposez a vos invités des activités qui vous plairont !</p>
          <div>ACTIF - CURRENT COLOR</div>
        </div>
      </div>
      {onNew && (
        <div className="containerBtn">
          <div
            className="passTo"
            onClick={() => navigate("/dashboard/sessions/new")}
          >
            <ImArrowLeft2 size={"2em"} />
            <p>RETOUR</p>
          </div>

          {onNew ? (
            <div className="passTo " onClick={() => navigate("config")}>
              <p>SUIVANT</p>
              <BsCheckLg size={"2em"} />
            </div>
          ) : (
            <div className="passTo " onClick={() => navigate("config")}>
              <p>SUIVANT</p>
              <ImArrowRight2 size={"2em"} />
            </div>
          )}
        </div>
      )}

      <Outlet />
    </section>
  );
};

export default SessionConfig;
