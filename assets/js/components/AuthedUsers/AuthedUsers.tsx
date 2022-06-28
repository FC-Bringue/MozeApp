import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Navigation from "../../Navigation";
import Session from "../session/SessionUtil";
import Parametres from "../settings/Parametres";

const AuthedUsers = () => {
  let { tab } = useParams();
  const navigate = useNavigate();
  const isAuthed = useSelector((state: any) => state.userInfos.token);

  useEffect(() => {
    console.log("isAuthed", isAuthed);
    if (!isAuthed) {
      navigate("/");
    }
  }, [tab]);

  const selectTab = (tabToDisplay: string) => {
    switch (tabToDisplay) {
      case "sessions":
        return <Session />;
      case "settings":
        return <Parametres />;
      default:
        return <Session />;
    }
  };

  return (
    <>
      <Navigation />
      {selectTab(tab)}
    </>
  );
};
export default AuthedUsers;
