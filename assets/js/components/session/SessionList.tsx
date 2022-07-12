import { useEffect, useState } from "react";

import SessionCards from "./SessionCards";
import SessionAdd from "./SessionAdd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSessionList } from "../../../helpers/redux/slices/userInfosSlice";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const ListIt = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);

  const dispatch = useDispatch();
  const bearerToken = useSelector((state: any) => state.userInfos.token);
  const sessionList = useSelector((state: any) => state.userInfos.sessionList);
  const loggedToSpotify = useSelector(
    (state: any) => state.userInfos.isLoggedToSpotify
  );
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    axios
      .get("/api/get/sessionList", config)
      .then((res) => {
        console.log("/api/get/sessionList", res.data.sessions);
        dispatch(setSessionList(res.data.sessions));
        setDisplay(!display);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <section id="sessions">
      <h4>SESSIONS</h4>
      <h1>LISTE DES SESSIONS</h1>
      {display ? (
        <section className="session-list">
          {loggedToSpotify ? (
            <>
              {sessionList &&
                sessionList.map((item: any, index: any) => (
                  <>
                    <SessionCards
                      key={item.parameters.SessionName + index}
                      item={item}
                    />
                    {index + 1 === sessionList.length && (
                      <SessionAdd key={index + 1} />
                    )}
                  </>
                ))}
              {sessionList.length === 0 && <SessionAdd />}
            </>
          ) : (
            <div className="actiuvationContainer">
              <h1 className="h1Question">
                Il est nécessaire de lier votre compte spotify !
              </h1>
              <p
                className="pQuestion"
                onClick={() => {
                  navigate("/dashboard/settings/linked-apps");
                }}
              >
                Merci de le faire dans les parametres
              </p>
            </div>
          )}
        </section>
      ) : (
        <div className={"loaderContainer"}>
          <Bars color="#595251" height={200} width={200} />
        </div>
      )}
    </section>
  );
};

export default ListIt;
