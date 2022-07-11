import React from "react";
import MozeLogo from "../../../../../img/logos/MOZE.svg";

const Content: React.FC<{}> = () => {
  return (
    <section className="landing-Footer py-5">
      <div className="container">
        <div className="row">
          {/*<div className="col-12 col-md-3 footer-link text-center">
            <h4 className="footer-title ">MOZE</h4>
             <ul>
              <li>
                {" "}
                <a>offre</a>{" "}
              </li>
              <li>
                {" "}
                <a>fonctionalité</a>{" "}
              </li>
              <li>
                {" "}
                <a>Appareils</a>
              </li>
              <li>
                {" "}
                <a>Aide</a>
              </li>
            </ul>
          </div>
           <div className="col-12 col-md-3 footer-link text-center">
            <h4 className="footer-title ">Explorer</h4>
            <ul>
              <li>
                {" "}
                <a>offre</a>{" "}
              </li>
              <li>
                {" "}
                <a>fonctionalité</a>{" "}
              </li>
              <li>
                {" "}
                <a>Appareils</a>
              </li>
              <li>
                {" "}
                <a>Aide</a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-3 footer-link text-center">
            <h4 className="footer-title ">Qui sommes-nous ? </h4>
            <ul>
              <li>
                {" "}
                <a>offre</a>{" "}
              </li>
              <li>
                {" "}
                <a>fonctionalité</a>{" "}
              </li>
              <li>
                {" "}
                <a>Appareils</a>
              </li>
              <li>
                {" "}
                <a>Aide</a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-3 footer-link text-center">
            <h4 className="footer-title ">Légal</h4>
            <ul>
              <li>
                {" "}
                <a>offre</a>{" "}
              </li>
              <li>
                {" "}
                <a>fonctionalité</a>{" "}
              </li>
              <li>
                {" "}
                <a>Appareils</a>
              </li>
              <li>
                {" "}
                <a>Aide</a>
              </li>
            </ul>
          </div>*/}
        </div>
        <div className="row py-5">
          <div className="col-12 text-center">
            <img src={MozeLogo} title="music" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
