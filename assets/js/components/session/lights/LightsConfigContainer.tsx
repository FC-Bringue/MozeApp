import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ImCross, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";

import Step1Lights from "./Step1Lights";
import RegisterLightNmb from "./RegisterLightNmb";
import RegisterLightsIp from "./RegisterLightsIp";

const LightsConfigContainer = () => {
  const { sessionID, onNew } = useParams();
  const navigate = useNavigate();

  const [stepCountLights, setStepCountLights] = useState(1);
  const [NmbOfLights, setNmbOfLights] = useState<null | number | string>(1);

  useEffect(() => {
    if (!onNew) {
      setStepCountLights(0);
    }
  }, []);

  const stepsDisplay = (step: number) => {
    switch (step) {
      case 1:
        return <Step1Lights />;
        break;
      case 2:
        return <RegisterLightNmb setNmbOfLights={setNmbOfLights} />;
        break;
      case 3:
        return <RegisterLightsIp NmbOfLights={NmbOfLights} />;
        break;
      default:
        return "Step 4";
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
        <div id="lights-params">{stepsDisplay(stepCountLights)}</div>
        <div className="containerBtn lights">
          <div
            className={(stepCountLights === 1 && "hidden") + " passTo"}
            onClick={() => {
              if (stepCountLights > 1) {
                setStepCountLights(stepCountLights - 1);
              }
            }}
          >
            <ImArrowLeft2 size={"2em"} />
            <p>RETOUR</p>
          </div>
          <div
            className={"passTo right"}
            onClick={() => {
              if (stepCountLights < 3) {
                setStepCountLights(stepCountLights + 1);
              }
            }}
          >
            <p>SUIVANT</p> <ImArrowRight2 size={"2em"} />
          </div>
        </div>
      </section>
    </>
  );
};

export default LightsConfigContainer;
