import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Outlet } from "react-router-dom";

import Navigation from "../../Navigation";
import SessionContainer from "../session/SessionContainer";
import Parametres from "../settings/Parametres";

const AuthedUsers = () => {
  let { tab } = useParams();
  const navigate = useNavigate();
  const isAuthed = useSelector((state: any) => state.userInfos.token);
  const bearerToken = useSelector((state: any) => state.userInfos.token);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    console.log("isAuthed", isAuthed);
    if (!isAuthed) {
      navigate("/");
    }
    let JWTExpires = axios
      .get("/api/checkPermission", config)
      .then((res) => {
        console.log(res);
        if (res.data.result != true) {
          window.location.replace("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        window.location.replace("/login");
      });
  }, []);

  const selectTab = (tabToDisplay: string) => {
    switch (tabToDisplay) {
      /* case "sessions":
        return <Session />; */
      case "settings":
        return <Parametres />;
      default:
        return <SessionContainer />;
    }
  };

  return (
    <>
      <Navigation />
      {/* {selectTab(tab)} */}
      <Outlet />
    </>
  );
};
export default AuthedUsers;
