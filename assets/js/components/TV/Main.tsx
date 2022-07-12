import React from "react";
import Overlaytwitter from "./twitter/Overlaytwitter";
import OverlayInstagram from "./instagram/OverlayInstagram";
import MusicList from "./MusicList/MusicList";

function Main({
  hashtag,
  musicList,
  currentNameMusic,
  spotifyCurrent,
  spotifyCurrentName,
  spotifyCurrentArtist,
  spotifyCurrentCover,
}: any) {
  return (
    <div id="TVMainContent">
      <Overlaytwitter hashtag={hashtag} />
      {/* <OverlayInstagram /> */}
      <MusicList
        musicList={musicList}
        currentNameMusic={currentNameMusic}
        spotifyCurrent={spotifyCurrent}
      />
    </div>
  );
}

export default Main;
