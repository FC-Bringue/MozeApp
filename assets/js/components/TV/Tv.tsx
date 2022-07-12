import { useEffect, useState } from "react";

import "../../../styles/TV/Tv.scss";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

declare const window: any;

function Tv() {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hashtag, setHashtag] = useState(null);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [musicList, setMusicList] = useState(null);
  const [name, setName] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [player, setPlayer] = useState(undefined);

  const { urluid } = useParams();

  const url = new URL("https://localhost/.well-known/mercure");
  url.searchParams.set("topic", "http://localhost/spotify");

  const eventSource = new EventSource(url);

  useEffect(() => {
    eventSource.onmessage = (event) => {
      setRefresh(refresh + 1);
    };

    setCurrentMusic(null);
    setHashtag(null);
    setName(null);
    setMusicList(null);
    axios
      .get("/api/get/spotify/playlist/current/url/" + urluid)
      .then((res) => {
        console.log(res.data);
        setCurrentMusic(res.data["current music"]);
        setHashtag(res.data.hashtag);
        setName(res.data["session name"]);
        setMusicList(res.data["next music"]);
        console.log("musicList", musicList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    axios
      .post("/api/send/spotify/token/" + urluid)
      .then((res) => {
        console.log(res.data.token);
        window.onSpotifyWebPlaybackSDKReady = () => {
          const player = new window.Spotify.Player({
            name: "MozeApp TV",
            getOAuthToken: (cb: any) => {
              cb(res.data.token);
            },
            volume: 0.5,
          });

          setPlayer(player);

          player.addListener("ready", ({ device_id }: any) => {
            console.log("Ready with Device ID", device_id);
          });

          player.addListener("not_ready", ({ device_id }: any) => {
            console.log("Device ID has gone offline", device_id);
          });

          player.connect();
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="TV">
      <header className="App-header">
        <Header name={name} />
      </header>

      <main>
        <Main
          hashtag={hashtag}
          musicList={musicList}
          currentNameMusic={currentMusic && currentMusic.name}
        />
      </main>

      <footer className="fixed-bottom">
        <Footer currentMusic={currentMusic} />
      </footer>
    </div>
  );
}

export default Tv;
