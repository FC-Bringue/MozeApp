import React from "react";

import MusicPlayer from "./MusicPlayer";

function Footer({
  currentMusic,
  spotifyCurrentName,
  spotifyCurrentArtist,
  spotifyCurrentCover,
}: any) {
  return (
    <>
      <MusicPlayer
        currentMusic={currentMusic}
        spotifyCurrentName={spotifyCurrentName}
        spotifyCurrentArtist={spotifyCurrentArtist}
        spotifyCurrentCover={spotifyCurrentCover}
      />
    </>
  );
}

export default Footer;
