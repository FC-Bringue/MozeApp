import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";

import "../../../styles/dashboard/resume.scss";

const DashboardContainer = () => {
  const [display, setDisplay] = useState(false);
  const activeSession = useSelector(
    (state: any) => state.active.activeSessionInfos
  );
  const barname = useSelector((state: any) => state.userInfos.name);
  const displayResume = useSelector(
    (state: any) => state.websiteWorker.displayResume
  );
  const navigate = useNavigate();

  useEffect(() => {
    console.log("activeSessionAAAAAAA", activeSession);

    if (activeSession === "true") {
      setDisplay(!display);
    }
  }, [activeSession]);

  return (
    <section id="resume">
      <h4>{barname && barname}</h4>
      {displayResume ? (
        <>
          {activeSession ? (
            <>
              <h1>{activeSession.session.parameters.SessionName}</h1>
              <section className="session-list">
                <div className="playlistDetails"></div>
                <div className="lights_events">
                  <div className="lights"></div>
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
