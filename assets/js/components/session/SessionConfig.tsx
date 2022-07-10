import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImCross, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import Switch from "react-switch";
import { Bars } from "react-loader-spinner";

import { useEffect, useState } from "react";
import "../../../styles/session/lights/lights.scss";
import axios from "axios";

import {
  setNewSessionLights,
  setTmpSession,
} from "../../../helpers/redux/slices/tempSlice";
import { setNewSessionName } from "../../../helpers/redux/slices/tempSlice";
import { setNewSessionHashtag } from "../../../helpers/redux/slices/tempSlice";
import { setNewSessionIdPlaylist } from "../../../helpers/redux/slices/tempSlice";
import { setTmpPlaylist } from "../../../helpers/redux/slices/tempSlice";
import { HiOutlineTrash } from "react-icons/hi";
import { setActiveSessionInfos } from "../../../helpers/redux/slices/activeSlice";
import { setDisplayConfig } from "../../../helpers/redux/slices/websiteWorkerSlice";

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
  const activeSession = useSelector(
    (state: any) => state.active.activeSessionInfos
  );
  const tmpSession = useSelector((state: any) => state.tempSlice.tmpSession);
  const bearerToken = useSelector((state: any) => state.userInfos.token);
  const displayConfig = useSelector(
    (state: any) => state.websiteWorker.displayConfig
  );

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    console.log(onNew, getTmpName, getTmpHashtag, tmpSession, getTmpPlaylist);
    if (onNew === "config" && !getTmpName) {
      console.log("onNew && getTmpName");
      navigate("/dashboard/sessions/new");
    }

    if (!tmpSession) {
      axios
        .get("/api/sessions/" + sessionID, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        })
        .then((res) => {
          console.log("/api/sessions/", res.data.parameters);
          dispatch(setTmpSession({ parameters: res.data.parameters }));
          console.log("tmpSession2", tmpSession);
          dispatch(setDisplayConfig(true));
          return res.data.parameters;
        })
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
          console.log("tmpSession3", res);
          dispatch(
            setTmpPlaylist({
              name: res.PlaylistName,
              images: [{ url: res.urlPlaylist }],
              id: res.idPlaylist,
            })
          );
        });
    }

    console.log(activeSession, "sessionActiveInConfig");
    if (activeSession && !onNew) {
      console.log(
        sessionID,
        activeSession.session.parameters.sessionID,
        sessionID === activeSession.session.parameters.sessionID
      );
      if (
        parseInt(sessionID) ===
        parseInt(activeSession.session.parameters.sessionID)
      ) {
        setIsChecked(true);
      }
    }

    console.log("tmpSession", tmpSession);
  }, []);

  const toggleActive = (e: any) => {
    console.log("toggleActive", e);
    if (isChecked) {
      axios
        .get("/api/unset/session/active/" + sessionID, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setIsChecked(false);
          dispatch(setActiveSessionInfos(null));
          navigate("/dashboard/sessions");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get("/api/set/session/active/" + sessionID, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        })
        .then((res) => {
          console.log(res.data, "session viens d'être active");
          dispatch(setActiveSessionInfos(res.data.session));
          setIsChecked(true);
          console.log("activeSessionres", res.data.session);
          setTimeout(() => {
            console.log("activeSessionDispatch", activeSession);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <section id="sessions">
        <h4>SESSIONS</h4>
        {displayConfig && tmpSession ? (
          <>
            <div className="title">
              <h1>
                {getTmpName && getTmpName}
                {tmpSession && !getTmpName && tmpSession.parameters.SessionName}
                <span className="forceLittle">
                  {tmpSession &&
                    !getTmpHashtag &&
                    "#" + tmpSession.parameters.hashtag}
                  {getTmpHashtag && !tmpSession && "#" + getTmpHashtag}
                </span>
              </h1>
              <div className="actionsBtn">
                {!onNew && (
                  <>
                    {isChecked ? (
                      <Switch
                        onChange={(e) => toggleActive(e)}
                        checked={isChecked}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={30}
                        width={50}
                      />
                    ) : (
                      <>
                        <Switch
                          onChange={(e) => toggleActive(e)}
                          checked={isChecked}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          height={30}
                          width={50}
                        />
                        <HiOutlineTrash
                          size={"3em"}
                          onClick={() => {
                            axios
                              .get("/api/delete/session/" + sessionID, {
                                headers: {
                                  Authorization: `Bearer ${bearerToken}`,
                                },
                              })
                              .then((res) => {
                                console.log(res.data);
                                if (res.data.isDeleted) {
                                  navigate("/dashboard/sessions");
                                }
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

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
                  Egayez vos soirées en personnalisant toutes les teintes de
                  lumières que vous voulez !
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
                            urlPlaylist: getTmpPlaylist.images[0].url,
                            PlaylistName: getTmpPlaylist.name,
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
                          dispatch(
                            setTmpSession({
                              parameters: {
                                SessionName: getTmpName,
                                idPlaylist: getTmpPlaylist.id,
                                urlPlaylist: getTmpPlaylist.images[0].url,
                                PlaylistName: getTmpPlaylist.name,
                                hashtag: getTmpHashtag,
                                lights: getTmpLights,
                                events: [],
                              },
                            })
                          );
                          dispatch(
                            setTmpPlaylist({
                              name: getTmpPlaylist.name,
                              images: [{ url: getTmpPlaylist.images[0].url }],
                              id: getTmpPlaylist.id,
                            })
                          );
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
                  <div
                    className="passTo "
                    onClick={() => {
                      dispatch(
                        setTmpSession({
                          parameters: {
                            SessionName: getTmpName,
                            idPlaylist: getTmpPlaylist.id,
                            urlPlaylist: getTmpPlaylist.images[0].url,
                            PlaylistName: getTmpPlaylist.name,
                            hashtag: getTmpHashtag,
                            lights: getTmpLights,
                            events: [],
                          },
                        })
                      );
                      dispatch(
                        setTmpPlaylist({
                          name: getTmpPlaylist.name,
                          images: [{ url: getTmpPlaylist.images[0].url }],
                          id: getTmpPlaylist.id,
                        })
                      );
                      setTimeout(() => {
                        console.log(tmpSession, "ping");
                        navigate("config");
                      }, 1000);
                    }}
                  >
                    <p>SUIVANT</p>
                    <ImArrowRight2 size={"2em"} />
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <div className={"loaderContainer"}>
              <Bars color="#595251" height={200} width={200} />
            </div>
          </>
        )}
        <Outlet />
      </section>
    </>
  );
};

export default SessionConfig;
