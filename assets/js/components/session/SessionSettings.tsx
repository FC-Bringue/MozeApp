import { ImCross, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { useParams, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Step1Lights from "./lights/Step1Lights";
import Step2Lights from "./lights/Step2Lights";
import Step3Lights from "./lights/Step3Lights";
import Step4Lights from "./lights/Step4Lights";

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

const Lights = () => {
  const [lightsCount, setLightsCount] = useState<any>(1);
  const [NmbOfLights, setNmbOfLights] = useState<null | number | string>(1);
  const [canClick, setCanClick] = useState(false);
  const [dataLights, setDataLights] = useState<any>([]);

  const stepHolder = (step: number) => {
    switch (step) {
      case 1:
        return <Step1Lights />;
        break;
      case 2:
        return (
          <Step2Lights
            setNmbOfLights={setNmbOfLights}
            setCanClick={setCanClick}
          />
        );
        break;
      case 3:
        return (
          <Step3Lights
            NmbOfLights={NmbOfLights}
            dataLights={dataLights}
            setDataLights={setDataLights}
          />
        );
        break;
      default:
        return <Step4Lights dataLights={dataLights} />;
        break;
    }
  };

  return (
    <>
      <h4>Nom de la session</h4>
      <h2>Parametrages des lumieres</h2>
      <div id="lights-params">{stepHolder(lightsCount)}</div>
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
                console.log(lightsCount);
                if (lightsCount > 2) {
                  setLightsCount("done");
                  return;
                }
                setLightsCount(lightsCount + 1);
              }
            }}
          >
            <p>SUIVANT</p> <ImArrowRight2 size={"2em"} />
          </div>
        </div>
      )}
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
      {switchParam(typeOfSetting)}
    </section>
  );
};

export default SessionSettings;
