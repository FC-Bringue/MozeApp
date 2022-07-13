import React, { useState, useEffect } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import Loader from "./Apppart/sessionName/loader";
import SessionName from "./Apppart/sessionName/sessionApp";
import UserProfile from "./Apppart/AppProfile/AppProfile";
import Acceuil from "./Apppart/AppAcceuil/AppAccueil";
import AppPlaylist from "./Apppart/AppPlaylist/AppPlaylist";
import AppMusicSearch from "./Apppart/AppMusicSearch/AppMusicSearch";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
function App() {
  let { applicationSection } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { sessionid } = useParams();

  useEffect(() => {
    console.log(location.pathname);
    if (
      location.pathname === `/app/${sessionid}` ||
      location.pathname === `/app/${sessionid}/`
    ) {
      navigate(`/app/${sessionid}/addGuest`);
    }
  }, []);

  return (
    <section className="w-100 AppUser">
      <Outlet />
    </section>
  );
}

export default App;
