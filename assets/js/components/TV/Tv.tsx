import React, { useEffect } from "react";

import "../../../styles/TV/Tv.css";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

function Tv() {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = React.useState(false);

  const { urluid } = useParams();

  useEffect(() => {
    axios
      .get("/api/get/spotify/playlist/current/url/" + urluid)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="TV">
      <header className="App-header">
        <Header />
      </header>

      <main>
        <Main />
      </main>

      <footer className="fixed-bottom">
        <Footer />
      </footer>
    </div>
  );
}

export default Tv;
