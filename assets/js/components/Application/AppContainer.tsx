import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
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

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };

  const selectTab = (tabToDisplay: string) => {
    console.log(tabToDisplay);
    switch (tabToDisplay) {
      case "search":
        return <AppMusicSearch />;
      case "music":
        return <AppPlaylist />;
      case "acceuil":
        return <Acceuil />;
      case "profile":
        return <UserProfile />;
      default:
        return <SessionName />;
    }
  };

  return (
    <section className="w-100 AppUser">
      <Outlet />
    </section>
  );
}

export default App;
