import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Loader from "./Apppart/sessionName/loader";
import SessionName from "./Apppart/sessionName/sessionApp";
import UserProfile from "./Apppart/AppProfile/AppProfile";
import Acceuil from "./Apppart/AppAcceuil/AppAccueil";
import AppPlaylist from "./Apppart/AppPlaylist/AppPlaylist";
import AppMusicSearch from "./Apppart/AppMusicSearch/AppMusicSearch";

function App() {
  let { applicationSection } = useParams();
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
      {/*    {selectTab(applicationSection)} */}
      <Outlet />
    </section>
  );
}

export default App;
