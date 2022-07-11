import { ImCross, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setNewSessionLights } from "../../../../helpers/redux/slices/tempSlice";

import Step1Lights from "./Step1Lights";
import Step2Lights from "./Step2Lights";
import Step3Lights from "./Step3Lights";
import Step4Lights from "./Step4Lights";

const Lights = () => {
  const [lightsCount, setLightsCount] = useState<any>(1);
  const [NmbOfLights, setNmbOfLights] = useState<null | number | string>(1);
  const [canClick, setCanClick] = useState(false);
  const [dataLights, setDataLights] = useState<any>([]);

  const dispatch = useDispatch();

  const { sessionID, onNew } = useParams();
  const navigate = useNavigate();

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
                  dispatch(setNewSessionLights(dataLights));
                }
              }}
            >
              <p>SUIVANT</p> <ImArrowRight2 size={"2em"} />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Lights;
