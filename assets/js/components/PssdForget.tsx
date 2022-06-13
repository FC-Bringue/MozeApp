import "../../styles/PssdForget.scss";

const PssdForget = () => {
  return (
    <div id="pssdfgt">
      <div>
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg"
          }
          title="logo"
        />
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
