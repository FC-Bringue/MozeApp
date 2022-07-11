import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BsPlay, BsSkipStart, BsSkipEnd, BsPause } from "react-icons/bs";

import "../../../styles/player/player.scss";
import { setTmpPlayingState } from "../../../helpers/redux/slices/tempSlice";
import { useLocation } from "react-router-dom";

const PlayerSpotify = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const getBearer = useSelector((state: any) => state.userInfos.token);
  const playingState = useSelector(
    (state: any) => state.tempSlice.tmpPlayingState
  );
  const config = {
    headers: {
      Authorization: `Bearer ${getBearer}`,
    },
  };

  const url = new URL("https://localhost/.well-known/mercure");
  url.searchParams.set("topic", "http://localhost/spotify");

  const eventSource = new EventSource(url);

  useEffect(() => {
    console.log(location.pathname);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data.status);
      switch (data.status) {
        case "pause":
          console.log("pause", false);
          dispatch(setTmpPlayingState(false));
          return;
        case "play":
          console.log("play", true);
          dispatch(setTmpPlayingState(true));
          return;
        default:
          break;
      }
    };
  }, []);

  const sessionActiveURL = useSelector(
    (state: any) => state.active.urlActiveSession
  );

  const playOrPause = () => {
    var callURL = `/api/set/spotify/playlist`;
    if (playingState) {
      callURL = callURL + "/pause";
    } else {
      callURL = callURL + "/play";
    }
    callURL = callURL + "/" + sessionActiveURL;

    axios
      .get(callURL, config)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const previous = () => {
    axios
      .get(`/api/set/spotify/playlist/previous/${sessionActiveURL}`, config)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const next = () => {
    axios
      .get(`/api/set/spotify/playlist/next/${sessionActiveURL}`, config)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <section
      id="spotifyPlayer"
      className={
        (location.pathname === "/dashboard/sessions/new" ||
          location.pathname === "/dashboard/sessions/new/config") &&
        "hidden"
      }
    >
      <div className="infos">
        <img src={""} alt="" />
        <div className="name">
          <h1>AAAAAAAAAAAAAAAA</h1>
          <h3>AAAAAAAAAAAAAAAAAAAAAAAAAA</h3>
        </div>
      </div>
      <div className="controls">
        <div
          className="btnContainer"
          onClick={() => {
            previous();
          }}
        >
          <BsSkipStart size={"4em"} className="previous" />
        </div>
        {/* <div></div> */}
        <div
          className="btnContainer"
          onClick={() => {
            playOrPause();
          }}
        >
          {playingState ? (
            <BsPause size={"4em"} className="pause" />
          ) : (
            <BsPlay size={"4em"} className="pause" />
          )}
        </div>
        <div
          className="btnContainer"
          onClick={() => {
            next();
          }}
        >
          <BsSkipEnd size={"4em"} className="next" />
        </div>
      </div>
    </section>
  );
};

export default PlayerSpotify;
