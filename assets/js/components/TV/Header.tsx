import React from "react";
import "../../../styles/TV/header.css";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-lights">
      <div className="container-fluid justify-content-start">
        <img className="logo" src="/Images/logo.png" alt="logo" />
        <h3 className="title">LE MACUMBA</h3>
        <img
          className="qrCode ms-auto"
          src="/Images/qrcode.png"
          alt="Qr Code"
        />
      </div>
    </nav>
  );
}

export default Header;
