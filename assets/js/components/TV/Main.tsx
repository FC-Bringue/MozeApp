import React from "react";
import Overlaytwitter from "./twitter/Overlaytwitter";
import OverlayInstagram from "./instagram/OverlayInstagram";
import MusicList from "./MusicList/MusicList";

function Main({ hashtag, musicList, currentNameMusic }: any) {
  return (
    <div id="TVMainContent">
      <Overlaytwitter hashtag={hashtag} />
      {/* <OverlayInstagram /> */}
      <MusicList musicList={musicList} currentNameMusic={currentNameMusic} />
    </div>
  );
}

export default Main;
