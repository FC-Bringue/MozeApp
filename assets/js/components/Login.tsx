import "../../styles/Login.scss";

const Login = () => {
  return (
    <div id="login">
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
          <h1>Connexion</h1>
          <div>
            <input type="email" placeholder="Mail" />
          </div>
          <div>
            <input type="password" placeholder="Mot de passe" />
            <a>Mot de passe oublié?</a>
          </div>
        </form>
        <div>
          <p>Se connecter</p>
        </div>
        <p>
          Nouvel utilisateur? <a>Inscrivez-vous!</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
