import { useSelector, useDispatch } from "react-redux";

import { createUser } from "../../../helpers/API/login_signup";

import {
  setLastName,
  setFirstName,
  setEmail,
  setPassword,
  setPasswordConfirm,
} from "../../../helpers/redux/slices/registerSlice";

import "../../../styles/auth/Signup.scss";

const Signup = () => {
  const dispatch = useDispatch();

  const mail = useSelector((state: any) => state.register.email);
  const password = useSelector((state: any) => state.register.password);

  /* const [user, setUser] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  }); */

  /* const handleCreateInputUpdate = (value: string, typeChange: string) => {
    setUser({
      ...user,
      [typeChange]: value,
    });
  }; */

  return (
    <div id="signup">
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
          <h1>Inscription</h1>
          <div>
            <div>
              <input
                type="text"
                placeholder="Nom"
                onChange={
                  (e) => dispatch(setLastName(e.target.value))
                  /* handleCreateInputUpdate(e.target.value, "lastName") */
                }
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Prénom"
                onChange={
                  (e) => dispatch(setFirstName(e.target.value))
                  /* handleCreateInputUpdate(e.target.value, "firstName") */
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
          onClick={() =>
            createUser({
              email: mail,
              password: password,
            })
          }
        >
          <p>S'inscrire</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
