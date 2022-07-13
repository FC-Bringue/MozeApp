import "../styles/app.css";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AuthedUsers from "./components/AuthedUsers/AuthedUsers";
import SendAuthCall from "./components/devPages/sendAuthCall";
import InstagramRedirect from "./components/redirects/InstagramRedirect";
import SessionContainer from "./components/session/SessionContainer";
import Parametres from "./components/settings/Parametres";
import Index from "./components/landing/index";
import Tv from "./components/TV/Tv";
import NewSession from "./components/session/NewSession";
import Application from "./components/settings/Application";
import SessionConfig from "./components/session/SessionConfig";
import LightsConfigContainer from "./components/session/lights/LightsConfigContainer";
import ListIt from "./components/session/SessionList";
import AppMusicSearch from "./components/Application/Apppart/AppMusicSearch/AppMusicSearch";
import AppPlaylist from "./components/Application/Apppart/AppPlaylist/AppPlaylist";
import Acceuil from "./components/Application/Apppart/AppAcceuil/AppAccueil";
import UserProfile from "./components/Application/Apppart/AppProfile/AppProfile";
import SessionName from "./components/Application/Apppart/sessionName/sessionApp";
import General from "./components/settings/General";
import AppContainer from "./components/Application/AppContainer";
import Playlist from "./components/session/playlist/Step0Playlist";
import DashboardContainer from "./components/dashboard/DashboardContainer";
import QuatreCentQuatre from "./components/404/QuatreCentQuatre";

const App = () => {
  const location = useLocation();
  return (
    <div
      id="App"
      className={location.pathname === "/tv" ? "forceColumn" : null}
    >
      <AnimatePresence initial={false} exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
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
              <Route path="linked-apps" element={<Application />} />
              <Route path="general" element={<General />} />
            </Route>
          </Route>
          {/* END */}

          {/* TV DISPLAY ROUTING */}
          <Route path="tv/:urluid" element={<Tv />}></Route>

          {/* APPLICATION ROUTING */}
          <Route path="app/:sessionid" element={<AppContainer />}>
            {/* <Route path=":applicationSection" element={<AppContainer/>} /> */}
            <Route path="search" element={<AppMusicSearch />} />
            <Route path="music" element={<AppPlaylist />} />
            <Route path="acceuil" element={<Acceuil />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="addGuest" element={<SessionName />} />
          </Route>
          {/* END */}

          {/* BASIC ROUTING */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
          <Route path="/" element={<Index />} />
          {/* END */}

          <Route path="*" element={<QuatreCentQuatre />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};
export default App;
