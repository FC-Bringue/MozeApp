import React from "react";

import MusicPlayer from "./MusicPlayer";

function Footer({ currentMusic }: any) {
  return (
    <>
      <MusicPlayer currentMusic={currentMusic} />
    </>
  );
}

export default Footer;
