import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Outlet, useLocation } from "react-router-dom";
import { setActiveSessionInfos } from "../../../helpers/redux/slices/activeSlice";
import {
  setMail,
  setName,
  setUserId,
  setIsLoggedToSpotify,
} from "../../../helpers/redux/slices/userInfosSlice";
import { setUrlActiveSession } from "../../../helpers/redux/slices/activeSlice";
import {
  setDisplayResume,
  setResetOne,
} from "../../../helpers/redux/slices/websiteWorkerSlice";

import Navigation from "../../Navigation";
import PlayerSpotify from "../player/PlayerSpotify";
import SessionContainer from "../session/SessionContainer";
import Parametres from "../settings/Parametres";

const AuthedUsers = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idUser = useSelector((state: any) => state.userInfos.userId);
  const bearerToken = useSelector((state: any) => state.userInfos.token);
  const loggedToSpotify = useSelector(
    (state: any) => state.userInfos.isLoggedToSpotify
  );
  const sessionActiveURL = useSelector(
    (state: any) => state.active.urlActiveSession
  );
  const resetOne = useSelector((state: any) => state.websiteWorker.resetOne);
  const currentMusic = useSelector((state: any) => state.active.currentMusic);

  useEffect(() => {
    if (!bearerToken) {
      navigate("/login");
    }

    console.log("displayResume");
    dispatch(setDisplayResume(true));

    if (pathname === "/dashboard" || pathname === "/dashboard/") {
      navigate("/dashboard/resume");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    let JWTExpires = axios
      .get("/api/checkPermission", config)
      .then((res) => {
        console.log("checkPermission", res);
        if (res.data.result != true) {
          window.location.replace("/login");
        }
      })
      .catch((err) => {
        console.log("checkPermission", err);
        window.location.replace("/login");
      });

    axios
      .get("/api/getUserInfos", config)
      .then(async (res) => {
        dispatch(setName(res.data.user.name));
        dispatch(setMail(res.data.user.email));
        dispatch(setUserId(res.data.user.id));
        console.log("userinfos", res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log("userinfosbeforeactivesession", res);
        axios
          .get("/api/have/session/active/" + res.user.id, config)
          .then((res) => {
            console.log("Une session est active", res.data);
            dispatch(setActiveSessionInfos(res.data.sessionActive));

            if (res.data.message === "true") {
              return res.data.sessionActive.session.parameters.sessionID;
            } else {
              return false;
            }
          })
          .catch((err) => {
            console.log("active session", err);
          })
          .then((res) => {
            console.log("res before url", res, !res);
            if (!res) return;
            console.log("res after url", res, !res);
            axios
              .get(`/api/get/url/session/${res}`, {
                headers: { Authorization: `Bearer ${bearerToken}` },
              })

              .then((res) => {
                console.log("URL", res);
                dispatch(setUrlActiveSession(res.data.url));
                dispatch(setResetOne(resetOne + 1));
                dispatch(setDisplayResume(true));
              })
              .catch((err) => {
                console.log("errURL", err);
                setDisplayResume(true);
              });
          })
          .catch((err) => {
            console.log("active session", err);
            setDisplayResume(true);
          });
      })
      .catch((err) => {
        console.log("userinfos", err);
        setDisplayResume(true);
      });

    console.log("beforeislogged");
    axios
      .get("/api/get/isConnected", config)
      .then((res) => {
        console.log("isLOggedToSpotify", res.data);
        dispatch(setIsLoggedToSpotify(true));
      })
      .catch((err) => {
        console.log("isLOggedToSpotify", err);
        dispatch(setIsLoggedToSpotify(false));
      });
  }, []);

  return (
    <>
      <Navigation />
      <Outlet />
      {sessionActiveURL && currentMusic && <PlayerSpotify />}
    </>
  );
};
export default AuthedUsers;
