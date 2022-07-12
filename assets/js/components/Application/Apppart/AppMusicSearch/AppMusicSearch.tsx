import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
/* import UpVote from "../../../../../img/icons/upvote.png"; */
/* import search from "../../../../../img/icons/search.png"; */
import { FaSearch } from "react-icons/fa";
import { animate, motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import Footer from "../footer/footer";
import MozeLogo from "../../../../../img/logos/MOZE.svg";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import axios from "axios";
import {
  setNameGuest,
  setTokenGuest,
} from "../../../../../helpers/redux/slices/guestSlice";
import { BiUpvote } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../sessionName/loader";
import { setDisplayApp } from "../../../../../helpers/redux/slices/websiteWorkerSlice";

const Starting: React.FC<{}> = () => {
  const { sessionid } = useParams();
  const [music, searchMusic] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useSelector((state: any) => state.websiteWorker.displayApp);
  const tokenStored = useSelector((state: any) => state.guest.tokenGuest);
  const [searchmusicList, setSearchMusicList] = useState([]);

  const searchData = () => {
    axios
      .post(
        `/api/search/spotify`,
        {
          url: sessionid,
          song: music,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        console.log(res.data);
        setSearchMusicList(res.data.results);
        console.log(searchmusicList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addmusic = (id: any, cover: any, name: any, artist: any) => {
    axios
      .post(
        `/api/add/song/spotify`,
        {
          url: sessionid,
          songId: id,
          songName: name,
          songArtist: artist,
          songImage: cover,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        console.log(res.data);
        setSearchMusicList(res.data.results);
        console.log(searchmusicList);
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
  }, []);
  return (
    <>
      {loader ? (
        <>
          <div className="RunningSession">
            <Container className="Session">
              <Row>
                <Col className="text-center">
                  <form className="d-flex align-items-center">
                    <input
                      type={"search"}
                      placeholder="titre de musique"
                      className="m-5 search"
                      onChange={(event) => searchMusic(event.target.value)}
                    />
                    <motion.label
                      whileHover={{ scale: 1.2 }}
                      initial={{ scale: 1 }}
                    >
                      <div className="send" onClick={searchData}>
                        {/* <img src={search} title="search" className="w-100" /> */}
                        <FaSearch className="w-100" size="4em" color="white" />
                      </div>
                    </motion.label>
                    <input
                      type="submit"
                      id="upload-button"
                      style={{ display: "none" }}
                    />
                  </form>
                </Col>
              </Row>
              <Row>
                <Col className="text-center musicliste">
                  <ul>
                    {searchmusicList &&
                      searchmusicList.map((item: any) => (
                        <>
                          <li>
                            <div className="MusicPlayerImageTitle d-flex align-items-center">
                              <img
                                src={item.album.images[0].url}
                                title="MozeLogo"
                                className="w-100"
                              />
                              <div className="MusicPlayerInfo">
                                <span className="MusicPlayerTitle">
                                  {item.name}
                                </span>
                                <span className="MusicPlayerArtist">
                                  {item.artists[0].name}
                                </span>
                              </div>

                              <div className="upVoteNbr ms-auto d-flex align-items-baseline">
                                <BiUpvote
                                  size={"2em"}
                                  onClick={() => {
                                    addmusic(
                                      item.id,
                                      item.album.images[0].url,
                                      item.name,
                                      item.artists[0].name
                                    );
                                  }}
                                />
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

export default Starting;
