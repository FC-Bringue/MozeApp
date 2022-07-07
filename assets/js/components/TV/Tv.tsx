import React from "react";

import "../../../styles/TV/Tv.css";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

function Tv() {
  return (
    <>
      <header className="App-header">
        <Header />
      </header>

      <main>
        <Main />
      </main>

      <footer className="fixed-bottom">
        <Footer />
      </footer>
    </>
  );
}

export default Tv;
