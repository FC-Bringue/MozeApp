import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BsPlay, BsSkipStart, BsSkipEnd, BsPause } from "react-icons/bs";

import "../../../styles/player/player.scss";
import { setTmpPlayingState } from "../../../helpers/redux/slices/tempSlice";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Bars } from "react-loader-spinner";

const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

const PlayerSpotify = () => {
  const [cooldown, setCooldown] = useState(true);
  const [refreshTimeout, setRefreshTimeout] = useState(0);
  const [data, setData] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const getBearer = useSelector((state: any) => state.userInfos.token);
  const playingState = useSelector(
    (state: any) => state.tempSlice.tmpPlayingState
  );
  const currentMusic = useSelector((state: any) => state.active.currentMusic);
  const currentMusicFromSpoti = useSelector(
    (state: any) => state.active.currentFromSpotify
  );
  const sessionActiveURL = useSelector(
    (state: any) => state.active.urlActiveSession
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
    if (sessionActiveURL) {
      axios
        .get("/api/get/spotify/source/" + sessionActiveURL)
        .then((res) => {
          console.log("setCurrentMusicDashboard", res.data);

          if(data.message === null){
            setData(null);
          }
          else{
            setData(res.data);
          }
        })
        .catch((err) => {
          setData(null);
          console.log(err);
        });
    }

    setTimeout(() => {
      setRefreshTimeout(refreshTimeout + 1);
    }, 5000);

    console.log(data)
  }, [refreshTimeout, sessionActiveURL]);

  useEffect(() => {
    console.log(location.pathname);

    eventSource.onmessage = (event) => {
      setRefreshTimeout(refreshTimeout + 1);
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

  const playOrPause = () => {
    /*if (!cooldown) return;*/
    var callURL = `/api/set/spotify/playlist`;
    if (!data.is_playing) {
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
    /*if (!cooldown) return;*/
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
   /* if (!cooldown) return;*/
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
        {(data || currentMusic)? (
          <div className="imageContainer">
            {currentMusic && !data && (
              <img src={currentMusic.cover} alt="" />
            )}
            {data != null && <img src={data.message.item.album.images[0].url} alt="" />}
          </div>
        ) : (
          <div className={"loaderContainer"}>
            <Bars color="#595251" />
          </div>
        )}

        {(data || currentMusic) ? (
          <div className="name">
            {currentMusic && (
              <h1>
                {currentMusic.name && !data && currentMusic.name}
                {data && data.message.item.name}
              </h1>
            )}
            {currentMusic && (
              <h3>
                {data && data.message.item.artists[0].name}
                {currentMusic.artist && !data && currentMusic.artist}
              </h3>
            )}
          </div>
        ) : (
          <div className={"loaderContainer"}>
            <Bars color="#595251" />
          </div>
        )}
      </div>
      <div className="controls">
        <motion.div
          whileHover={{ opacity: 0.4, scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          transition={transition}
          className="btnContainer"
          onClick={() => {
            previous();
          }}
        >
          <BsSkipStart size={"4em"} className="previous" />
        </motion.div>
        {/* <div></div> */}
        <motion.div
          whileHover={{ opacity: 0.4, scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          transition={transition}
          className="btnContainer"
          onClick={() => {
            playOrPause();
          }}
        >
          {data.is_playing ? (
            <BsPause size={"4em"} className="pause" />
          ) : (
            <BsPlay size={"4em"} className="pause" />
          )}
        </motion.div>
        <motion.div
          whileHover={{ opacity: 0.4, scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          transition={transition}
          className="btnContainer"
          onClick={() => {
            next();
          }}
        >
          <BsSkipEnd size={"4em"} className="next" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PlayerSpotify;
