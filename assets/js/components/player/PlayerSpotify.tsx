import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BsPlay, BsSkipStart, BsSkipEnd, BsPause } from "react-icons/bs";

import "../../../styles/player/player.scss";
import { setTmpPlayingState } from "../../../helpers/redux/slices/tempSlice";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

const PlayerSpotify = () => {
  const [cooldown, setCooldown] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const getBearer = useSelector((state: any) => state.userInfos.token);
  const playingState = useSelector(
    (state: any) => state.tempSlice.tmpPlayingState
  );
  const currentMusic = useSelector((state: any) => state.active.currentMusic);

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
    if (!cooldown) return;
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
        setTimeout(() => {
          setCooldown(false);
        }, 2500);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const previous = () => {
    if (!cooldown) return;
    axios
      .get(`/api/set/spotify/playlist/previous/${sessionActiveURL}`, config)
      .then((res) => {
        console.log("res", res);
        setTimeout(() => {
          setCooldown(false);
        }, 2500);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const next = () => {
    if (!cooldown) return;
    axios
      .get(`/api/set/spotify/playlist/next/${sessionActiveURL}`, config)
      .then((res) => {
        console.log("res", res);
        setTimeout(() => {
          setCooldown(false);
        }, 2500);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <motion.section
      exit={{ opacity: 0 }}
      transition={transition}
      id="spotifyPlayer"
      className={
        (location.pathname === "/dashboard/sessions/new" ||
          location.pathname === "/dashboard/sessions/new/config") &&
        "hidden"
      }
    >
      <div className="infos">
        <div className="imageContainer">
          {currentMusic && <img src={currentMusic.cover} alt="" />}
        </div>

        <div className="name">
          {currentMusic && <h1> {currentMusic.name} </h1>}
          {currentMusic && <h3> {currentMusic.artist} </h3>}
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
    </motion.section>
  );
};

export default PlayerSpotify;
