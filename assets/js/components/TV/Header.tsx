import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import "../../../styles/TV/header.css";
import Logo from "../../../img/logos/MOZE.svg";

function Header({ name }: any) {
  const { urluid } = useParams();
  return (
    <nav className="navbar navbar-expand-xl navbar-lights">
      <div className="container-fluid justify-content-start">
        <img className="logo" src={Logo} alt="logo" />
        <h3 className="title">{name}</h3>
        <div className="ms-auto qrcodemtn">
          <p>Prenez le controle !</p>
          <QRCode
            value={`${window.location.origin}/app/${urluid}`}
            size={100}
          />
        </div>
      </div>
    </nav>
  );
}

export default Header;
