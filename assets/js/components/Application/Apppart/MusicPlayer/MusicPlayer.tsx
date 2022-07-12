import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Starting: React.FC<{}> = () => {
  const [currentMusic, setCurrentMusic] = useState(null);
  const { sessionid } = useParams();

  const fetchData = () => {
    axios
      .post(`/api/get/spotify/playlist/current/url/${sessionid}`)
      .then((res) => {
        console.log(res.data);
        setCurrentMusic(res.data["current music"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <>
      <>
        <div className="MusicPlayer">
          <div className="MusicPlayerImageTitle">
            <img
              src={currentMusic && currentMusic.cover}
              title="MozeLogo"
              className="w-100"
            />
            <div className="MusicPlayerInfo">
              <span className="MusicPlayerTitle">
                {currentMusic && currentMusic.name}
              </span>
              <span className="MusicPlayerArtist">
                {currentMusic && currentMusic.artist}
              </span>
            </div>
          </div>
          <div className="MusicPlayerBar">
            <div className="MusicPlayerBarFill">
              <div className="MusicPlayerBarFillRect"></div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Starting;
