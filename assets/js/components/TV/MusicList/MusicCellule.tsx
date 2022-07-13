import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

import heart from "./heart-solid.svg";

type AppProps = {
  musicName: any;
  artistName: any;
  typeOfSong: any;
  musicCover: any;
  setCelluleHeight: any;
  celluleHeight: any;
  currentNameMusic: any;
};

const MusicCellule = ({
  musicName,
  artistName,
  typeOfSong,
  musicCover,
  setCelluleHeight,
  celluleHeight,
  currentNameMusic,
}: AppProps) => {
  const celluleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("celluleHeightMusic", celluleHeight);
    setCelluleHeight(celluleRef.current!.clientHeight);
  }, []);

  return (
    <motion.div
      className={
        "cellule " + (musicName === currentNameMusic ? "activeMusic" : "")
      }
      animate={{ y: -celluleHeight }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        duration: 20,
      }}
      ref={celluleRef}
    >
      <div>
        <div className="imgContainer">
          <img src={musicCover} alt="" />
        </div>
        <div style={{ overflow: "hidden" }}>
          <p style={{ fontWeight: "600", fontSize: "1.5em" }}>{musicName}</p>
          <p style={{ fontWeight: "600" }}>{artistName}</p>
        </div>
      </div>
      <div className="likes">
        <p style={{ fontWeight: "600", fontSize: "1.5em" }}>{typeOfSong}</p>
        <div className="iconLike">
          <img src={heart} alt="" className="icon" />
        </div>
      </div>
    </motion.div>
  );
};

export default MusicCellule;
