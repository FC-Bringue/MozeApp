/* A supprimer */

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setNewSessionLights, setTmpSession } from "../redux/slices/tempSlice";
import { setNewSessionName } from "../redux/slices/tempSlice";
import { setNewSessionHashtag } from "../redux/slices/tempSlice";
import { setNewSessionIdPlaylist } from "../redux/slices/tempSlice";
import { setTmpPlaylist } from "../redux/slices/tempSlice";

const navigate = useNavigate();

const dispatch = useDispatch();
const bearerToken = useSelector((state: any) => state.userInfos.token);
const config = {
  headers: {
    Authorization: `Bearer ${bearerToken}`,
  },
};

export const createSession = (
  name: any,
  idPlaylist: any,
  imagePlaylist: any,
  namePlaylist: any,
  hashtag: any,
  lights: any
) => {
  var sessionInfos: any = {
    SessionName: name,
    idPlaylist: idPlaylist,
    urlPlaylist: imagePlaylist,
    PlaylistName: namePlaylist,
    hashtag: hashtag,
    lights: lights,
    events: [],
  };

  axios
    .post("/api/create/session", sessionInfos, config)
    .then((res) => {
      console.log(res);
      dispatch(setNewSessionLights(null));
      dispatch(setNewSessionName(null));
      dispatch(setNewSessionHashtag(null));
      dispatch(setNewSessionIdPlaylist(null));
      sessionInfos.sessionId = res.data.sessionId;
      dispatch(
        setTmpSession({
          parameters: sessionInfos,
        })
      );
      dispatch(
        setTmpPlaylist({
          name: namePlaylist,
          images: [{ url: imagePlaylist }],
          id: idPlaylist,
        })
      );
      navigate("/dashboard/sessions/" + res.data.sessionId);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getSessionById = async (sessionID: string) => {
  return await axios
    .get("/api/sessions/" + sessionID, config)
    .then((res) => {
      console.log(res.data);
      dispatch(setTmpSession(res.data));
      return true;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
};

export const setSessionActive: any = async (sessionID: string) => {
  const worked = await axios
    .get("/api/unset/session/active/" + sessionID, config)
    .then((res) => {
      console.log(res.data);
      return false;
    })
    .catch((err) => {
      console.log(err);
    });

  return worked;
};

export const setSessionInactive: any = async (sessionID: string) => {
  return await axios
    .get("/api/set/session/active/" + sessionID, config)
    .then((res) => {
      console.log(res.data);
      /*  dispatch(setTmpSession(res.data)); */
      return true;
    })
    .catch((err) => {
      console.log(err);
    });
};
