import React, { useEffect } from "react";
import "../../../styles/TV/MusicPlayer.css";

function MusicPlayer({
  spotifyCurrent,
  spotifyCurrentName,
  spotifyCurrentArtist,
  spotifyCurrentCover,
}: any) {
  useEffect(() => {
    console.log("spotifyCurrent", spotifyCurrent);
  }, [spotifyCurrent]);

  return (
    <>
      {spotifyCurrentArtist && spotifyCurrentName && spotifyCurrentCover ? (
        <div className="MusicPlayerContainer">
          <div className="MusicPlayerImageTitle">
            <div className="MusicPlayerInfo" style={{ marginRight: "2em" }}>
              <p className="MusicPlayerTitle">Musique en cours :</p>
            </div>
            <img
              className="MusicPlayerImage"
              src={spotifyCurrentCover}
              alt="Music Player"
            />
            <div
              className="MusicPlayerInfo"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              <span className="MusicPlayerTitle">{spotifyCurrentName}</span>
              <span className="MusicPlayerArtist">{spotifyCurrentArtist}</span>
            </div>
          </div>
        </div>
      ) : (
        <h1 id="PlayerNotConnected">
          Connectez-vous à MozeApp TV depuis votre application Spotify
        </h1>
      )}
    </>
  );
}

export default MusicPlayer;
