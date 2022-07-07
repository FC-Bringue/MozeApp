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
};

const MusicCellule = ({
  musicName,
  artistName,
  typeOfSong,
  musicCover,
  setCelluleHeight,
  celluleHeight,
}: AppProps) => {
  const celluleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("celluleHeightMusic", celluleHeight);
    setCelluleHeight(celluleRef.current!.clientHeight);
  }, []);

  return (
    <motion.div
      className={
        "cellule " + (musicName === "Time Machine" ? "activeMusic" : "hidden")
      }
      animate={{ y: -celluleHeight }}
      transition={{ /* repeat: Infinity, ease: "easeInOut", */ duration: 25 }}
      ref={celluleRef}
    >
      <div>
        <div className="imgContainer">
          <img src={musicCover} alt="" />
        </div>
        <div>
          <p>{musicName}</p>
          <p>
            {artistName.map((item: any, index: any) => {
              return <>{item.name} </>;
            })}
          </p>
        </div>
      </div>
      <div className="likes">
        <p>{typeOfSong}</p>
        <div>
          <img src={heart} alt="" className="icon" />
        </div>
      </div>
    </motion.div>
  );
};

export default MusicCellule;
