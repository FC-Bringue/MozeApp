import { useEffect } from "react";

import MusicCellule from "./MusicCellule";

import { Spotify } from "../../../../helpers/propsType/SpoRep";
import { spo_response } from "../../../../helpers/sample/spotify";
import { useState } from "react";

const MusicList = ({ musicList, currentNameMusic }: any) => {
  const [getPlaylist, setGetPlaylist] = useState<Spotify | null>(spo_response);
  const [celluleHeight, setCelluleHeight] = useState<number>(0);

  useEffect(() => {
    console.log("musicList", musicList);
  }, [musicList]);

  return (
    <section id="MusicList">
      <h1
        style={{
          fontWeight: 600,
          color: "white",
          position: "relative",
          zIndex: "100",
          backgroundColor: "#302F2C",
        }}
      >
        Prochaines musiques :
      </h1>
      {musicList &&
        currentNameMusic &&
        musicList.map((item: any, index: any) => {
          console.log("item", item);
          return (
            <MusicCellule
              key={index}
              musicName={item.name}
              artistName={item.artist}
              musicCover={item.cover}
              typeOfSong={item.nbrLike}
              setCelluleHeight={setCelluleHeight}
              celluleHeight={celluleHeight * musicList.length + 150}
              currentNameMusic={currentNameMusic}
            />
          );
        })}
    </section>
  );
};

export default MusicList;
