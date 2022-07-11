import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { ImPlus } from "react-icons/im";
import { AiOutlinePoweroff } from "react-icons/ai";
import axios from "axios";
import SimpleBar from "simplebar-react";

import TracksData from "./tracks/TracksData";

import { setMozeYeelightControlToken } from "../../../helpers/redux/slices/userInfosSlice";

import "../../../styles/dashboard/resume.scss";
import "simplebar/dist/simplebar.min.css";

const DashboardContainer = () => {
  const [display, setDisplay] = useState(false);
  const [lightsDuplicate, setLightsDuplicate] = useState([]);
  const dispatch = useDispatch();
  const activeSession = useSelector(
    (state: any) => state.active.activeSessionInfos
  );
  const barname = useSelector((state: any) => state.userInfos.name);
  const displayResume = useSelector(
    (state: any) => state.websiteWorker.displayResume
  );
  const mozeYeelightToken = useSelector(
    (state: any) => state.userInfos.mozeYeelightControlToken
  );
  const navigate = useNavigate();

  useEffect(() => {
    console.log("activeSessionAAAAAAA", activeSession);

    if (activeSession === "true") {
      useEffect(() => {
        setLightsDuplicate(activeSession.session.parameters.lights);
        console.log("lightsDuplicateupdatedDashboardRsume", lightsDuplicate);
      }, [activeSession.session.parameters.lights]);
      setDisplay(!display);
    }
  }, [activeSession]);

  const handleChangeLight = (action: any, color: any) => {
    console.log("color", color);
    if (!mozeYeelightToken) {
      console.log("no token");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${mozeYeelightToken}`,
      },
    };

    activeSession.session.parameters.lights.forEach(
      (light: any, index: any) => {
        var newLights = [...lightsDuplicate];
        //If the index is already inside a Json inside the array, update the ip value of the Json, else create a new Json with the ip value
        if (newLights.map((item: any) => item.index).includes(index)) {
          newLights = [
            ...newLights.filter((item: any) => item.index !== index),
            {
              index: index,
              ip: light.ip,
              color: color,
              flow: [],
            },
          ];
        } else {
          newLights.push({
            ip: light.ip,
            color: color,
            flow: [],
            index: index,
          });
        }
      }
    );

    axios
      .post(
        "http://localhost:3001/api/changeLight",
        {
          listOfLights: lightsDuplicate,
          typeOfAction: action,
        },
        config
      )
      .then((res) => {
        console.log("changeLight", res);
      })
      .catch((err) => {
        console.log("changeLight", err);
      });
  };

  return (
    <section id="resume">
      <h4>{barname && barname}</h4>
      {displayResume ? (
        <>
          {activeSession ? (
            <>
              <h1>
                {activeSession.session.parameters.SessionName}{" "}
                <span>
                  {"#"}
                  {activeSession.session.parameters.hashtag}
                </span>
              </h1>
              <section className="session-list-resume">
                <div className="playlistDetails">
                  <h3>Votre playlist en cours :</h3>
                  <SimpleBar
                    forceVisible="y"
                    autoHide={false}
                    style={{ height: "80%" }}
                  >
                    {activeSession.musicQueue.map((music: any, index: any) => (
                      <TracksData
                        key={music + index}
                        track={music}
                        index={index}
                      />
                    ))}
                  </SimpleBar>
                </div>
                <div className="lights_and_events">
                  <div className="lights">
                    <h3>Vos lumières :</h3>
                    <div className="lightsCount">
                      <h3>Nombres de lumières enregistrée :</h3>
                      <p>
                        {activeSession.session.parameters.lights
                          ? activeSession.session.parameters.lights.length
                          : 0}
                      </p>
                    </div>
                    <div className="lightsAction">
                      <div
                        className="quickPower"
                        onClick={() => {
                          handleChangeLight("power", "#000000");
                        }}
                      >
                        <p>Allumer</p>
                        <AiOutlinePoweroff size={"6em"} />
                      </div>
                      <div className="quickChange">
                        <p>Changer de couleur</p>
                        <div className="btnColorContainer">
                          <div
                            className="btnColor red"
                            onClick={() => {
                              handleChangeLight("color", "#FF0000");
                            }}
                          >
                            <p>Rouge</p>
                          </div>
                          <div
                            className="btnColor green"
                            onClick={() => {
                              handleChangeLight("color", "#00FF00");
                            }}
                          >
                            <p>Vert</p>
                          </div>
                          <div
                            className="btnColor blue"
                            onClick={() => {
                              handleChangeLight("color", "#0000FF");
                            }}
                          >
                            <p>Bleu</p>
                          </div>
                          <div
                            className="btnColor pink"
                            onClick={() => {
                              handleChangeLight("color", "#FF00FF");
                            }}
                          >
                            <p>Rose</p>
                          </div>
                          <div
                            className="btnColor purple"
                            onClick={() => {
                              handleChangeLight("color", "#800080");
                            }}
                          >
                            <p>Violet</p>
                          </div>
                          <div className="btnColor plus">
                            <ImPlus className="iconsPlus" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tokenPlace">
                      <p>Moze Yeelight Control token :</p>
                      <input
                        type={"text"}
                        placeholder={
                          mozeYeelightToken === ""
                            ? "Générez votre token sur l'app"
                            : mozeYeelightToken
                        }
                        onBlur={(e: any) => {
                          dispatch(setMozeYeelightControlToken(e.target.value));
                        }}
                      />
                    </div>
                  </div>
                  {/*  <div className="events"></div> */}
                </div>
              </section>
            </>
          ) : (
            <section className="noSession">
              <h1>Vous n'avez actuellement aucune sessions en cours.</h1>
              <p className="question">Pourquoi ne pas en déclencher une ?</p>
              <div
                className="btn"
                onClick={() => navigate("/dashboard/sessions")}
              >
                <p>Liste des sessions</p>
              </div>
            </section>
          )}
        </>
      ) : (
        <>
          <div className={"loaderContainer"}>
            <Bars color="#595251" height={200} width={200} />
          </div>
        </>
      )}
    </section>
  );
};

export default DashboardContainer;
