import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImCross, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";

import { useEffect } from "react";
import "../../../styles/session/lights/lights.scss";
import axios from "axios";

import { setNewSessionLights } from "../../../helpers/redux/slices/tempSlice";
import { setNewSessionName } from "../../../helpers/redux/slices/tempSlice";
import { setNewSessionHashtag } from "../../../helpers/redux/slices/tempSlice";
import { setNewSessionIdPlaylist } from "../../../helpers/redux/slices/tempSlice";
import { setTmpPlaylist } from "../../../helpers/redux/slices/tempSlice";

const SessionConfig = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sessionID, onNew } = useParams();
  const getTmpPlaylist = useSelector(
    (state: any) => state.tempSlice.tmpPlaylist
  );
  const getTmpName = useSelector(
    (state: any) => state.tempSlice.newSessionName
  );
  const getTmpHashtag = useSelector(
    (state: any) => state.tempSlice.newSessionHashtag
  );
  const getTmpLights = useSelector(
    (state: any) => state.tempSlice.newSessionLights
  );
  const bearerToken = useSelector((state: any) => state.userInfos.token);

  useEffect(() => {
    console.log(onNew, getTmpName, getTmpHashtag);
    if (onNew === "config" && !getTmpName) {
      console.log("onNew && getTmpName");
      navigate("/dashboard/sessions/new");
    }
  }, []);

  return (
    <section id="sessions">
      <h4>SESSIONS</h4>
      <h1>Nom de la session</h1>
      <div id="params-options">
        <div
          onClick={() => {
            navigate("config-playlist");
          }}
          className={getTmpPlaylist ? "tmpPlaylist" : ""}
        >
          <h2>Playlist</h2>
          <p>Choisissez la playlist de départ pour votre session !</p>
          <div>
            {getTmpPlaylist && (
              <>
                <img src={getTmpPlaylist.images[0].url} alt="" />
                <p>{getTmpPlaylist.name}</p>
              </>
            )}
          </div>
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
            <div
              className="passTo "
              onClick={() => {
                let config = {
                  headers: {
                    Authorization: `Bearer ${bearerToken}`,
                  },
                };
                axios
                  .post(
                    "/api/create/session",
                    {
                      SessionName: getTmpName,
                      idPlaylist: getTmpPlaylist.id,
                      hashtag: getTmpHashtag,
                      lights: getTmpLights,
                      events: [],
                    },
                    config
                  )
                  .then((res) => {
                    console.log(res);
                    dispatch(setNewSessionLights(null));
                    dispatch(setNewSessionName(null));
                    dispatch(setNewSessionHashtag(null));
                    dispatch(setNewSessionIdPlaylist(null));
                    dispatch(setTmpPlaylist(null));
                    navigate("/dashboard/sessions/" + res.data.sessionId);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
            >
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
