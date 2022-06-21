import { useParams } from "react-router-dom";

import Navigation from "../../Navigation";
import Session from "../session/SessionUtil";
import Parametres from "../settings/Parametres";

const AuthedUsers = () => {
  let { tab } = useParams();
  const selectTab = () => {
    switch (tab) {
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
      {selectTab()}
    </>
  );
};
export default AuthedUsers;
