import mozeLogo from "../../../img/logos/MOZE.svg";

import "../../../styles/auth/PssdForget.scss";

const PssdForget = () => {
  return (
    <div id="pssdfgt">
      <div>
        <img src={mozeLogo} title="logo" />
      </div>
      <div>
        <form>
          <h1>Mot de passe oublié</h1>
          <div>
            <input type="email" placeholder="Mail" />
          </div>
          {/* <div className="result">
            <p>Un nouveau mot de passe vient de vous être envoyé!</p>
            <p>Vérifiez dès à présent votre boite mail.</p>
          </div> */}
        </form>
        <div>
          <p>Envoyer</p>
        </div>
      </div>
    </div>
  );
};

export default PssdForget;
