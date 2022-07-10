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
import { setDisplayResume } from "../../../helpers/redux/slices/websiteWorkerSlice";

import Navigation from "../../Navigation";
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

  useEffect(() => {
    dispatch(setDisplayResume(false));
    if (pathname === "/dashboard" || pathname === "/dashboard/") {
      navigate("/dashboard/resume");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    console.log("isAuthed", bearerToken);
    if (!bearerToken) {
      navigate("/");
    }
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
            dispatch(setDisplayResume(true));
          })
          .catch((err) => {
            console.log("active session", err);
          });
      });

    axios
      .get("/api/get/spotify/userplaylist", config)
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
    </>
  );
};
export default AuthedUsers;
