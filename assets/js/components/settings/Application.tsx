import axios from "axios";

import amazonMusic from "../../../img/logos/amazonMusic.png";
import spotify from "../../../img/logos/spotify.png";
import deezer from "../../../img/logos/deezer.png";
import React, {useState, useEffect} from "React";
import { useSelector } from "react-redux";

import "../../../styles/settings/Parametres.css";
import "../../../styles/settings/Application.css";

function isConnected() {

  const [isConnected, setIsConnected] = useState([]);

  useEffect(() => {
    const Bearer = useSelector((state: any) => state.userInfos.token);
    const headers ={
      "Content-Type": "application/json",
    }
    fetch("/api/isConnected")
      .then(res => res.json())
      .then(data => setIsConnected(data))
      .catch(err => console.log(err));
  }, [isConnected]);

  return<>
    {
      isConnected.map(post => {

      })
    }
  </>
}

const Application = () => {
  const bearerToken = useSelector((state: any) => state.userInfos.token);
  const config = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  return (
    <section id="applications">
      <div
        className="spotify"
        onClick={() => {
          axios
            .get("/api/get/spotify/TokenUrl", config)
            .then((res) => {
              console.log(res);
              window.location.replace(res.data.url);
            })
            .catch((ee) => {
              console.log(ee);
            });
        }}
      >
        <p>CONNECTER SON COMPTE</p>
        <div className="appLogo">
          <img src={spotify} title="spotify" />
        </div>
      </div>
    </section>
  );
};

export default Application;
