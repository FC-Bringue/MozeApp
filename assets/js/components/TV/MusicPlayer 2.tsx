import React from "react";
import "../../../styles/TV/MusicPlayer.css";

function MusicPlayer() {
  return (
    <div className="MusicPlayerContainer">
      <div className="MusicPlayerImageTitle">
        <img
          className="MusicPlayerImage"
          src="/Images/placeholderImageMusic.png"
          alt="Music Player"
        />
        <div className="MusicPlayerInfo">
          <span className="MusicPlayerTitle">Beat It</span>
          <span className="MusicPlayerArtist">Michael Jackson</span>
        </div>
      </div>
      <div className="MusicPlayerBar">
        <div className="MusicPlayerBarTime">0:25</div>
        <div className="MusicPlayerBarFill">
          <div className="MusicPlayerBarFillRect"></div>
          <div className="MusicPlayerBarFillCircle"></div>
        </div>
        <div className="MusicPlayerBarTime TimeLeft">-2:47</div>
      </div>
    </div>
  );
}

export default MusicPlayer;
