import { Routes, Route, Link } from "react-router-dom";

import Login from "./components/auth/Login";
import PssdForget from "./components/auth/PssdForget";
import Signup from "./components/auth/Signup";
import AuthedUsers from "./components/AuthedUsers/AuthedUsers";
import SendAuthCall from "./components/devPages/sendAuthCall";
import InstagramRedirect from "./components/redirects/InstagramRedirect";
import SessionContainer from "./components/session/SessionContainer";
import Parametres from "./components/settings/Parametres";
import Navigation from "./Navigation";
import Index from "./components/landing/index";
import Tv from "./components/TV/Tv";
import NewSession from "./components/session/NewSession";
import Application from "./components/settings/Application";
import SessionSettings from "./components/session/SessionSettings";
import SessionConfig from "./components/session/SessionConfig";
import Lights from "./components/session/lights/Step0Lights";
import ListIt from "./components/session/SessionList";
import Appuser from "./components/Application/Appuser";

const App = () => {
  return (
    <div id="App">
      <Routes>
        {/* DEV PURPOSE ONLY */}
        <Route path="/dev/authedCall" element={<SendAuthCall />} />
        {/* END */}

        {/* API REDIRECTION AUTHED ROUTES */}
        <Route path="/redirects/instagram" element={<InstagramRedirect />} />
        {/* END */}

        {/* DASHBOARD ROUTING */}
        <Route path="dashboard" element={<AuthedUsers />}>
          <Route path="sessions" element={<ListIt />} />
          <Route path="sessions/new" element={<NewSession />} />
          <Route path="sessions/new/:onNew" element={<SessionConfig />}>
            <Route path="config-playlist" element={<SessionContainer />} />
            <Route path="config-lights" element={<Lights />} />
            <Route path="config-events" element={<SessionContainer />} />
          </Route>
          <Route path="sessions/:sessionID" element={<SessionConfig />}>
            <Route path="config-playlist" element={<SessionContainer />} />
            <Route path="config-lights" element={<Lights />} />
            <Route path="config-events" element={<SessionContainer />} />
          </Route>

          <Route path="settings" element={<Parametres />}>
            {/*  <Route path="" element={<AuthedUsers />} /> */}
            <Route path="audio" element={<SessionContainer />} />
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
