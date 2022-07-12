import React from "react";
import "../../../styles/TV/MusicPlayer.css";

function MusicPlayer({ currentMusic }: any) {
  return (
    <>
      {currentMusic && (
        <div className="MusicPlayerContainer">
          <div className="MusicPlayerImageTitle">
            <div className="MusicPlayerInfo" style={{ marginRight: "2em" }}>
              <p className="MusicPlayerTitle">Musique en cours :</p>
            </div>
            <img
              className="MusicPlayerImage"
              src={currentMusic.cover}
              alt="Music Player"
            />
            <div
              className="MusicPlayerInfo"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              <span className="MusicPlayerTitle">{currentMusic.name}</span>
              <span className="MusicPlayerArtist">{currentMusic.artist}</span>
            </div>
          </div>
          {/* <div className="MusicPlayerBar">
            <div className="MusicPlayerBarTime">0:25</div>
            <div className="MusicPlayerBarFill">
              <div className="MusicPlayerBarFillRect"></div>
              <div className="MusicPlayerBarFillCircle"></div>
            </div>
            <div className="MusicPlayerBarTime TimeLeft">-2:47</div>
          </div> */}
        </div>
      )}
    </>
  );
}

export default MusicPlayer;
