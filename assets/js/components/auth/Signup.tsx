import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { createUser } from "../../../helpers/API/login_signup";

import {
  setName,
  setEmail,
  setPassword,
  setPasswordConfirm,
} from "../../../helpers/redux/slices/registerSlice";

import mozeLogo from "../../../img/logos/MOZE.svg";

import "../../../styles/auth/Signup.scss";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mail = useSelector((state: any) => state.register.email);
  const password = useSelector((state: any) => state.register.password);
  const name = useSelector((state: any) => state.register.name);

  return (
    <div id="signup">
      <div>
        <img src={mozeLogo} title="logo" />
      </div>
      <div>
        <form>
          <h1>Inscription</h1>
          <div>
            <div>
              <input
                type="text"
                placeholder="Nom"
                onChange={
                  (e) => dispatch(setName(e.target.value))
                  /* handleCreateInputUpdate(e.target.value, "lastName") */
                }
              />
            </div>
          </div>
          <div>
            <input
              type="email"
              placeholder="Mail"
              onChange={
                (e) =>
                  dispatch(
                    setEmail(e.target.value)
                  ) /* handleCreateInputUpdate(e.target.value, "email") */
              }
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={
                (e) => dispatch(setPassword(e.target.value))
                /* handleCreateInputUpdate(e.target.value, "password") */
              }
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirmation du mot de passe"
              onChange={
                (e) => dispatch(setPasswordConfirm(e.target.value))
                /* handleCreateInputUpdate(e.target.value, "passwordConfirm") */
              }
            />
          </div>
        </form>
        <div
          onClick={async () => {
            let response = await createUser({
              email: mail,
              password: password,
              name: name,
            });
            if (response.status === 200) {
              navigate("/login");
            } else {
              console.log("response", response);
            }
          }}
        >
          <p>S'inscrire</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
