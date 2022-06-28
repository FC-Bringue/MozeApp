import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setMail, setPassword } from "../../../helpers/redux/slices/loginSlice";
import { setToken } from "../../../helpers/redux/slices/userInfosSlice";
import { loginUser } from "../../../helpers/API/login_signup";

import "../../../styles/auth/Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mail = useSelector((state: any) => state.login.mail);
  const password = useSelector((state: any) => state.login.password);

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
            <input
              type="email"
              placeholder="Mail"
              onChange={(e) => dispatch(setMail(e.target.value))}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />
            <a>Mot de passe oublié?</a>
          </div>
        </form>
        <div
          onClick={async () => {
            let response = await loginUser({
              email: mail,
              password: password,
            });

            if (response.status === 200) {
              dispatch(setToken(response.data.token));
              navigate("/dashboard");
            } else {
              console.log("response", response);
            }
          }}
        >
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
