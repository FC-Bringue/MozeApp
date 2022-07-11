import React from "react";
import Overlaytwitter from "./twitter/Overlaytwitter";
import OverlayInstagram from "./instagram/OverlayInstagram";
import MusicList from "./MusicList/MusicList";

function Main() {
  return (
    <div id="TVMainContent">
      <Overlaytwitter />
      {/* <OverlayInstagram /> */}
      <MusicList />
    </div>
  );
}

export default Main;
