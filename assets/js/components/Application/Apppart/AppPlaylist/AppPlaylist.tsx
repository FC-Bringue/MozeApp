import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
/* import UpVote from "../../../../../img/icons/upvote.png"; */
import { BiUpvote } from "react-icons/bi";
import { animate, motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../footer/footer";
import { useDispatch, useSelector } from "react-redux";
import MozeLogo from "../../../../../img/logos/MOZE.svg";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import axios from "axios";
import {
  setNameGuest,
  setTokenGuest,
} from "../../../../../helpers/redux/slices/guestSlice";
import Loader from "../sessionName/loader";
import { setDisplayApp } from "../../../../../helpers/redux/slices/websiteWorkerSlice";

const AppPlaylist = () => {
  const { sessionid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useSelector((state: any) => state.websiteWorker.displayApp);
  const tokenStored = useSelector((state: any) => state.guest.tokenGuest);
  const [currentMusic, setCurrentMusic] = useState([]);
  const [musicList, setMusicList] = useState([]);

  const fetchData = () => {
    axios
      .post(`/api/get/spotify/playlist/current/url/${sessionid}`)
      .then((res) => {
        console.log(res.data);
        setCurrentMusic(res.data["current music"]);
        setMusicList(res.data["next music"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(setDisplayApp(false));
    console.log(tokenStored);
    axios
      .post(
        "/api/get/isAlreadyCreated",
        {
          token: tokenStored,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        console.log(res.data.message);

        if (!res.data.message) {
          navigate(`/app/${sessionid}/addguest`);
        }
        dispatch(setDisplayApp(true));
      })
      .catch((err) => {
        console.log(err);
      });
    fetchData();
  }, []);

  return (
    <>
      {loader ? (
        <>
          <div className="RunningSession">
            <Container className="Session">
              <Row className="d-flex align-items-center">
                <Col className="p-4 text-center">
                  <img src={MozeLogo} title="MozeLogo" className="w-50" />
                </Col>
              </Row>
              <Row className="d-flex align-items-center text-center">
                <Col lg={9} sm={9} xs={9}>
                  <h3 className="w-80">prochaine musiques</h3>
                </Col>
                <Col lg={3} sm={3} xs={3} className="">
                  <button
                    className="playlistBtn"
                    onClick={async () => {
                      navigate(`/app/${sessionid}/search`);
                    }}
                  >
                    {" "}
                    Ajouter une musique{" "}
                  </button>
                </Col>
              </Row>
              <Row>
                <Col className=" musicListe">
                  <ul>
                    {musicList &&
                      musicList.map((item: any) => (
                        <>
                          <li>
                            <div className="MusicPlayerImageTitle d-flex align-items-center">
                              <img
                                src={item.cover}
                                title="MozeLogo"
                                className="w-100"
                              />
                              <div className="MusicPlayerInfo">
                                <span className="MusicPlayerTitle">
                                  {item.name}
                                </span>
                                <span className="MusicPlayerArtist">
                                  {item.artist}
                                </span>
                              </div>

                              <div className="upVoteNbr ms-auto d-flex align-items-baseline">
                                <BiUpvote size={"2em"} />
                                <span className="p-2">20</span>
                              </div>
                            </div>
                          </li>
                        </>
                      ))}
                  </ul>
                </Col>
              </Row>
            </Container>
            <MusicPlayer />
            <Footer />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AppPlaylist;
