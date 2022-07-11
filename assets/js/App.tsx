import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Login from "./components/auth/Login";
import PssdForget from "./components/auth/PssdForget";
import Signup from "./components/auth/Signup";
import AuthedUsers from "./components/AuthedUsers/AuthedUsers";
import SendAuthCall from "./components/devPages/sendAuthCall";
import InstagramRedirect from "./components/redirects/InstagramRedirect";
import SessionContainer from "./components/session/SessionContainer";
import Parametres from "./components/settings/Parametres";
import Index from "./components/landing/index";
import Tv from "./components/TV/Tv";
import NewSession from "./components/session/NewSession";
import General from "./components/settings/General"
import Application from "./components/settings/Application";
import SessionConfig from "./components/session/SessionConfig";
import Lights from "./components/session/lights/Step0Lights";
import LightsConfigContainer from "./components/session/lights/LightsConfigContainer";
import ListIt from "./components/session/SessionList";
import Appuser from "./components/Application/Appuser";
import Playlist from "./components/session/playlist/Step0Playlist";
import DashboardContainer from "./components/dashboard/DashboardContainer";

const App = () => {
  const location = useLocation();
  return (
    <div
      id="App"
      className={location.pathname === "/tv" ? "forceColumn" : null}
    >
      <Routes>
        {/* DEV PURPOSE ONLY */}
        <Route path="/dev/authedCall" element={<SendAuthCall />} />
        {/* END */}

        {/* API REDIRECTION AUTHED ROUTES */}
        <Route path="/redirects/instagram" element={<InstagramRedirect />} />
        {/* END */}

        {/* DASHBOARD ROUTING */}
        <Route path="dashboard" element={<AuthedUsers />}>
          {/* WELCOME PAGE */}
          <Route path="resume" element={<DashboardContainer />} />

          {/* SESSIONS PAGE */}
          <Route path="sessions" element={<ListIt />} />
          <Route path="sessions/new" element={<NewSession />} />
          <Route path="sessions/new/:onNew" element={<SessionConfig />}>
            <Route path="config-playlist" element={<Playlist />} />
            <Route path="config-lights" element={<LightsConfigContainer />} />
            <Route path="config-events" element={<SessionContainer />} />
          </Route>
          <Route path="sessions/:sessionID" element={<SessionConfig />}>
            <Route path="config-playlist" element={<Playlist />} />
            <Route path="config-lights" element={<LightsConfigContainer />} />
            <Route path="config-events" element={<SessionContainer />} />
          </Route>

          {/* SETTINGS PAGE */}
          <Route path="settings" element={<Parametres />}>
            {/*  <Route path="" element={<AuthedUsers />} /> */}
            <Route path="general" element={<General />} />
            <Route path="linked-apps" element={<Application />} />
          </Route>
        </Route>
        {/* END */}

        {/* TV DISPLAY ROUTING */}
        <Route path="tv" element={<Tv />}>
          <Route path=":sessionID" element={<Parametres />} />
        </Route>
        {/* END */}

        {/* BASIC ROUTING */}
        <Route path="login" element={<Login />} />
        <Route path="App" element={<Appuser />} />
        <Route path="register" element={<Signup />} />
        <Route path="/" element={<Index />} />
        {/* END */}
      </Routes>
    </div>
  );
};
export default App;
