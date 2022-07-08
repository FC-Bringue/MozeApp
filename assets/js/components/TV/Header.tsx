import React from "react";
import "../../../styles/TV/header.css";
import Logo from "../../../img/logos/MOZE.png";

function Header() {
  return (
    <nav className="navbar navbar-expand-xl navbar-lights">
      <div className="container-fluid justify-content-start">
        <img className="logo" src={Logo} alt="logo" />
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
