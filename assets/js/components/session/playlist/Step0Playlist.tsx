import { ImCross, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Step1Lights from "./Step1Playlist";

import "../../../../styles/session/playlist/playlist.scss";

const Playlist = () => {
  const [lightsCount, setLightsCount] = useState<any>(1);
  const [NmbOfLights, setNmbOfLights] = useState<null | number | string>(1);
  const [canClick, setCanClick] = useState(false);
  const [dataLights, setDataLights] = useState<any>([]);

  const { sessionID, onNew } = useParams();
  const navigate = useNavigate();

  const getTmpName = useSelector(
    (state: any) => state.tempSlice.newSessionName
  );
  const tmpSession = useSelector((state: any) => state.tempSlice.tmpSession);

  const stepHolder = (step: number) => {
    switch (step) {
      case 1:
        return <Step1Lights />;
        break;
    }
  };

  return (
    <>
      <div id="back-ovr"></div>
      <section id="paramsSessions">
        <div
          className="exit"
          onClick={() => {
            if (onNew) {
              navigate("/dashboard/sessions/new/config/");
            } else {
              navigate("/dashboard/sessions/" + sessionID);
            }
          }}
        >
          <ImCross size={"2em"} />
        </div>
        <h4>
          {getTmpName && getTmpName}
          {tmpSession && !getTmpName && tmpSession.parameters.SessionName}
        </h4>
        <h2>Choix de la playlist</h2>
        <div id="playlist-params">{stepHolder(lightsCount)}</div>
        {lightsCount != "done" && (
          <div className="containerBtn">
            {lightsCount > 1 && (
              <div
                className={" passTo"}
                onClick={() => {
                  var retourBy = lightsCount - 1;
                  if (retourBy === 1) {
                    retourBy = 1;
                  }
                  setLightsCount(retourBy);
                }}
              >
                <ImArrowLeft2 size={"2em"} />
                <p>RETOUR</p>
              </div>
            )}

            <div
              className={
                (NmbOfLights === "noClick" && !canClick ? "noClick" : null) +
                " passTo right"
              }
              onClick={() => {
                if (
                  NmbOfLights != "noClick" &&
                  NmbOfLights != null &&
                  NmbOfLights != 0 &&
                  NmbOfLights != ""
                ) {
                  navigate("/dashboard/sessions/new/config/");
                }
              }}
            >
              <p>VALIDER</p> <BsCheckLg size={"2em"} />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Playlist;
