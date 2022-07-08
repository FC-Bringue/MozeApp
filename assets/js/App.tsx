import { Routes, Route, Link } from "react-router-dom";

import Login from "./components/auth/Login";
import PssdForget from "./components/auth/PssdForget";
import Signup from "./components/auth/Signup";
import AuthedUsers from "./components/AuthedUsers/AuthedUsers";
import SendAuthCall from "./components/devPages/sendAuthCall";
import InstagramRedirect from "./components/redirects/InstagramRedirect";
import SessionUtil from "./components/session/SessionUtil";
import Parametres from "./components/settings/Parametres";
import Navigation from "./Navigation";
import Index from "./components/landing/index";
import Tv from "./components/TV/Tv";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  return (
    <div id="App" className={location.pathname === "/tv" ? "forceColumn":null}>
      <Routes>
        {/* DEV PURPOSE ONLY */}
        <Route path="/dev/authedCall" element={<SendAuthCall />} />
        {/* END */}

        {/* {/* API REDIRECTION AUTHED ROUTES */}
        <Route path="/redirects/instagram" element={<InstagramRedirect />} />
        {/* END */}

        <Route path="dashboard" element={<AuthedUsers />}>
          <Route path=":tab" element={<AuthedUsers />}>
            <Route path=":subTab" element={<AuthedUsers />} />
          </Route>
          <Route path="sessions" element={<SessionUtil />}>
            <Route path=":sessionID" element={<SessionUtil />}>
              <Route path=":settingsType" element={<SessionUtil />} />
            </Route>
          </Route>
        </Route>
        <Route path="tv" element={<Tv />}>
          <Route path=":sessionID" element={<Parametres />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="/" element={<Index />} />
      </Routes>
    </div>
  );
};
export default App;
