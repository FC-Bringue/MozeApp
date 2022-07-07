import MusicCellule from "./MusicCellule";

import { Spotify } from "../../../../helpers/propsType/SpoRep";
import { spo_response } from "../../../../helpers/sample/spotify";
import { useState } from "react";

const MusicList = () => {
  const [getPlaylist, setGetPlaylist] = useState<Spotify | null>(spo_response);
  const [celluleHeight, setCelluleHeight] = useState<number>(0);

  return (
    <section id="MusicList">
      {getPlaylist &&
        getPlaylist.tracks.items!.map((item, index) => {
          return (
            <MusicCellule
              key={index}
              musicName={item.track.name}
              artistName={item.track.album.artists}
              musicCover={item.track.album.images![0].url}
              typeOfSong={"13"}
              setCelluleHeight={setCelluleHeight}
              celluleHeight={
                celluleHeight * getPlaylist.tracks.items!.length + 150
              }
            />
          );
        })}
    </section>
  );
};

export default MusicList;
