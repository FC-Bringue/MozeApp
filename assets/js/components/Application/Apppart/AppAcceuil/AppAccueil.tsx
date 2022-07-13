import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
/* import UpVote from "../../../../../img/icons/upvote.png"; */
import { BiUpvote } from "react-icons/bi";
import Footer from "../footer/footer";
import MozeLogo from "../../../../../img/logos/MOZE.svg";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import axios from "axios";
import Loader from "../sessionName/loader";

import { setDisplayApp } from "../../../../../helpers/redux/slices/websiteWorkerSlice";

const Starting = () => {
  const navigate = useNavigate();
  const { sessionid } = useParams();
  const dispatch = useDispatch();
  const loader = useSelector((state: any) => state.websiteWorker.displayApp);
  const tokenStored = useSelector((state: any) => state.guest.tokenGuest);
  const { musiqueArtiste } = useParams();
  const [data, setData] = useState<any>([]);
  const [currentMusic, setCurrentMusic] = useState([]);
  const [musicList, setMusicList] = useState([]);
  const [upVote, setUpVote] = useState([]);

  const [refresh, setRefresh] = useState(0);

  const upVoteMusic = (songId: any) => {
    axios
      .post(
        `/api/like/song/spotify`,
        {
          url: sessionid,
          songId: songId,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        console.log(res.data);
        setUpVote(res.data.results);
        console.log(upVote);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const url = new URL("https://localhost/.well-known/mercure");
  url.searchParams.set("topic", "http://localhost/spotify");

  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    setRefresh(refresh + 1);
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
  useEffect(() => {
    fetchData();
  }, [refresh]);
  return (
    <>
      {Loader ? (
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
                      navigate(`/app/${sessionid}/music`);
                    }}
                  >
                    Voir la playlist
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
                                <BiUpvote
                                  size={"2em"}
                                  onClick={() => {
                                    upVoteMusic(item.id);
                                  }}
                                />
                                <span className="p-2">{item.nbrLike}</span>
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
