import { useState } from "react";
import "../../styles/Signup.scss";
import { createUser } from "../API/login_signup";

const Signup = () => {
  const [user, setUser] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleCreateInputUpdate = (value: string, typeChange: string) => {
    setUser({
      ...user,
      [typeChange]: value,
    });
  };

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
                onChange={(e) =>
                  handleCreateInputUpdate(e.target.value, "lastName")
                }
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Prénom"
                onChange={(e) =>
                  handleCreateInputUpdate(e.target.value, "firstName")
                }
              />
            </div>
          </div>
          <div>
            <input
              type="email"
              placeholder="Mail"
              onChange={(e) => handleCreateInputUpdate(e.target.value, "email")}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={(e) =>
                handleCreateInputUpdate(e.target.value, "password")
              }
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirmation du mot de passe"
              onChange={(e) =>
                handleCreateInputUpdate(e.target.value, "passwordConfirm")
              }
            />
          </div>
        </form>
        <div
          onClick={() =>
            createUser({ email: user.email, password: user.password })
          }
        >
          <p>S'inscrire</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
