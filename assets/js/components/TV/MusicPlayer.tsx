import React, { useEffect } from "react";
import "../../../styles/TV/MusicPlayer.css";

function MusicPlayer({ currentMusic, spotifyCurrent }: any) {
  useEffect(() => {
    console.log("spotifyCurrent", spotifyCurrent);
  }, [spotifyCurrent]);

  return (
    <>
      {(currentMusic || spotifyCurrent) && (
        <>
          {spotifyCurrent ? (
            <div className="MusicPlayerContainer">
              <div className="MusicPlayerImageTitle">
                <div className="MusicPlayerInfo" style={{ marginRight: "2em" }}>
                  <p className="MusicPlayerTitle">
                    Spoti Off Musique en cours :
                  </p>
                </div>
                <img
                  className="MusicPlayerImage"
                  src={
                    spotifyCurrent.album.images[
                      spotifyCurrent.album.images.length
                    ].url
                  }
                  alt="Music Player"
                />
                <div
                  className="MusicPlayerInfo"
                  style={{ marginTop: "auto", marginBottom: "auto" }}
                >
                  <span className="MusicPlayerTitle">
                    {spotifyCurrent.name}
                  </span>
                  <span className="MusicPlayerArtist">
                    {spotifyCurrent.artists[0].name}
                  </span>
                </div>
              </div>
            </div>
          ) : (
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
                  <span className="MusicPlayerArtist">
                    {currentMusic.artist}
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MusicPlayer;
