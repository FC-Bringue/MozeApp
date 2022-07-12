import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  setTmpLights,
  setTmpPlaylist,
  setTmpSession,
} from "../../../helpers/redux/slices/tempSlice";

import party from "../../../img/icons/party.svg";
import music from "../../../img/icons/music-solid.svg";
import light from "../../../img/icons/lightbulb-solid.svg";
import { setDisplayConfig } from "../../../helpers/redux/slices/websiteWorkerSlice";

type SessionCardsProps = {
  item: any;
};

const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

const SessionCards = ({ item }: SessionCardsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(item, "item");

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={transition}
      className="session-item"
      style={{
        cursor: "pointer",
      }}
      onClick={() => {
        dispatch(setTmpSession(item));
        dispatch(setDisplayConfig(true));
        dispatch(
          setTmpPlaylist({
            name: item.parameters.PlaylistName,
            images: [{ url: item.parameters.urlPlaylist }],
            id: item.parameters.idPlaylist,
          })
        );
        dispatch(setTmpLights(item.parameters.lights));
        navigate("/dashboard/sessions/" + item.parameters.sessionID);
      }}
    >
      <div>
        <p>
          {/* SESSION  */}
          {item.parameters.SessionName}
        </p>
      </div>
      <div>
        <p>
          {item.parameters.hashtag && "#"}
          {item.parameters.hashtag}
        </p>
        <div className="icons-fnct">
          <div>
            <img src={music} title="music" />
          </div>
          {/* item.parameters.events != [] && item.parameters.events && (
            <div>
              <img src={party} title="party" />
            </div>
          )*/}
          {item.parameters.lights && item.parameters.lights != [] && (
            <div>
              <img src={light} title="light" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SessionCards;
