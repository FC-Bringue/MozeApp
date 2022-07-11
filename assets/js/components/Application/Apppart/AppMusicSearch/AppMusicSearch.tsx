import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UpVote from "../../../../../img/icons/upvote.png";
import search from "../../../../../img/icons/search.png";
import { animate, motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import Footer from "../footer/footer";
import MozeLogo from "../../../../../img/logos/MOZE.png";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import axios from "axios";
import {
  setNameGuest,
  setTokenGuest,
} from "../../../../../helpers/redux/slices/guestSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Starting: React.FC<{}> = () => {
  const { sessionid } = useParams();
  const navigate = useNavigate();
  const tokenStored = useSelector((state: any) => state.guest.tokenGuest);

  useEffect(() => {
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
        if (res.data.message) {
          navigate(`/app/${sessionid}/search`);
        } else {
          navigate(`/app/${sessionid}/addguest`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="appMusicSearh">
      <Container>
        <Row>
          <Col className="text-center">
            <form className="d-flex align-items-center">
              <input
                type={"search"}
                placeholder="titre de musique"
                className="m-5 search"
              />
              <motion.label whileHover={{ scale: 1.2 }} initial={{ scale: 1 }}>
                <div className="send">
                  <img src={search} title="search" className="w-100" />
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
          <Col className="text-center">
            <span>
              veuillez entrer le titre d'une musique pour afficher les resultats
            </span>
          </Col>
        </Row>
      </Container>

      <MusicPlayer />
      <Footer />
    </div>
  );
};

export default Starting;
