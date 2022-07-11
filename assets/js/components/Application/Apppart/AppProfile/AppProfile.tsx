import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import profil from "../../../../../img/icons/TallProfil.png";
import Arrow from "../../../../../img/icons/Arrow_right.png";
import { animate, motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import Footer from "../footer/footer";
import axios from "axios";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import {
  setNameGuest,
  setTokenGuest,
} from "../../../../../helpers/redux/slices/guestSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pseudo = useSelector((state: any) => state.login.pseudo);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [name, setUsername] = useState("");
  const guestName = useSelector((state: any) => state.guest.nameGuest);
  const { sessionid } = useParams();
  const tokenStored = useSelector((state: any) => state.guest.tokenGuest);
  const nameStored = useSelector((state: any) => state.guest.nameGuest);

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
          navigate(`/app/${sessionid}/profile`);
        } else {
          navigate(`/app/${sessionid}/addguest`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCookie() {
    setCookie("user", name, {
      path: "/",
    });
  }

  function addPseudo() {
    handleCookie();

    axios
      .post(
        "/api/patch/guest/" + tokenStored,
        { name: name },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data.message);
        dispatch(setNameGuest(name));
        /*  if (res.status === 200){
                    navigate(`/app/${sessionid}/acceuil`)
                }else{
                    navigate(`/app/${sessionid}/addguest`)
                } */
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div className="AppProfile">
        <Container className="Session">
          <Row className="d-flex align-items-center">
            <Col className="p-4 text-center">
              <img src={profil} title="MozeLogo" className="w-50" />
              <p>{nameStored && nameStored}</p>
            </Col>
          </Row>
          <Row>
            <span>changer le pseudo :</span>
          </Row>
          <Row>
            <Col className="d-flex align-items-center">
              <input
                type="search"
                name="name"
                className="name"
                placeholder="Ex : xX_jf_Xx"
                onChange={(event) => setUsername(event.target.value)}
              />
              <div className="send ms-3" onClick={addPseudo}>
                <img src={Arrow} title="MozeLogo" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <MusicPlayer />
      <Footer />
    </>
  );
};

export default Profile;
