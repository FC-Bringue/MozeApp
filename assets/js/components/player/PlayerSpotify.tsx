import { BsPlay, BsSkipStart, BsSkipEnd, BsPause } from "react-icons/bs";

import "../../../styles/player/player.scss";

const PlayerSpotify = () => {
  return (
    <section id="spotifyPlayer">
      <div className="infos">
        <img src={""} alt="" />
        <div className="name">
          <h1>AAAAAAAAAAAAAAAA</h1>
          <h3>AAAAAAAAAAAAAAAAAAAAAAAAAA</h3>
        </div>
      </div>
      <div className="controls">
        <div className="btnContainer">
          <BsSkipStart size={"4em"} className="previous" />
        </div>
        {/* <div><BsPause size={"2em"} className="pause" /></div> */}
        <div className="btnContainer">
          <BsPlay size={"4em"} className="play" />
        </div>
        <div className="btnContainer">
          <BsSkipEnd size={"4em"} className="next" />
        </div>
      </div>
    </section>
  );
};

export default PlayerSpotify;
