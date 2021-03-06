import { useEffect, useState } from "react";

import "../../../styles/TV/Tv.scss";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Bars } from "react-loader-spinner";

declare const window: any;

function Tv() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hashtag, setHashtag] = useState(null);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [musicList, setMusicList] = useState(null);
  const [name, setName] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [player, setPlayer] = useState(undefined);
  const [spotifyCurrent, setSpotifyCurrent] = useState(null);
  const [spotifyCurrentName, setSpotifyCurrentName] = useState(null);
  const [spotifyCurrentArtist, setSpotifyCurrentArtist] = useState(null);
  const [spotifyCurrentCover, setSpotifyCurrentCover] = useState(null);
  const [test, setTest] = useState(null);
  const [display, setDisplay] = useState(false);

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
        navigate("*");
      });
  }, [refresh]);

  useEffect(() => {
    axios
      .post("/api/send/spotify/token/" + urluid)
      .then((res) => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
          console.log("onSpotifyWebPlaybackSDKReady");
          console.log(res.data.token);
          const player = new window.Spotify.Player({
            name: "MozeApp TV",
            getOAuthToken: (cb: any) => {
              cb(res.data.token);
            },
            volume: 0.5,
          });

          setPlayer(player);

          player.addListener("ready", ({ device_id }: any) => {
            window.focus();
            console.log("Ready with Device ID", device_id);
          });

          player.addListener("not_ready", ({ device_id }: any) => {
            console.log("Device ID has gone offline", device_id);
          });

          player.addListener("player_state_changed", (state: any) => {
            if (!state) {
              return;
            }

            console.log("curr", state.track_window.current_track);
            setSpotifyCurrent(state.track_window.current_track);
            setTest(state.track_window.current_track.name);
            setSpotifyCurrentName(state.track_window.current_track.name);
            setSpotifyCurrentArtist(
              state.track_window.current_track.artists[0].name
            );
            setSpotifyCurrentCover(
              state.track_window.current_track.album.images[0].url
            );
            console.log("pause", state.paused);

            player.getCurrentState().then((state: any) => {
              !state ? console.log(false) : console.log(true);
            });
          });

          player.connect();
        };

        setDisplay(true);
      })
      .catch((err) => {
        console.log(err);
        navigate("/*");
      });
  }, []);

  return (
    <div id="TV" className={!display ? "forceWidth" : ""}>
      {display ? (
        <>
          <header className="App-header">
            <Header name={name} />
          </header>

          <main>
            <Main
              hashtag={hashtag}
              musicList={musicList}
              currentNameMusic={currentMusic && currentMusic.name}
              spotifyCurrent={spotifyCurrent}
              spotifyCurrentName={spotifyCurrentName}
              spotifyCurrentArtist={spotifyCurrentArtist}
              spotifyCurrentCover={spotifyCurrentCover}
            />
          </main>

          <footer className="fixed-bottom">
            <Footer
              currentMusic={currentMusic}
              spotifyCurrentName={spotifyCurrentName}
              spotifyCurrentArtist={spotifyCurrentArtist}
              spotifyCurrentCover={spotifyCurrentCover}
            />
          </footer>
        </>
      ) : (
        <>
          <div className={"loaderContainer"}>
            <Bars color="#595251" height={200} width={200} />
          </div>
        </>
      )}
    </div>
  );
}

export default Tv;
