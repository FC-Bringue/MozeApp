import "../../../styles/settings/General.css";
import axios from "axios";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMail, setName } from "../../../helpers/redux/slices/userInfosSlice";

const General = () => {
  const dispatch = useDispatch();
  const bearerToken = useSelector((state: any) => state.userInfos.token);
  const [name, setNameState] = useState(null);
  const [mail, setMailState] = useState(null);
  const [mailConfirm, setMailConfirm] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);

  const ModifyName = (e: any) => {
    e.preventDefault();
    axios
      .post(
        "/api/udpate/user",
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(setName(name));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const ModifyMail = (e: any) => {
    e.preventDefault();
    if (!(mail === mailConfirm)) {
      return "Les infos ne correspondent pas";
    }

    axios
      .post(
        "/api/udpate/user",
        { email: mail },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(setMail(mail));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const ModifyPassword = (e: any) => {
    e.preventDefault();
    if (!(password === passwordConfirm)) {
      return "Les infos ne correspondent pas";
    }

    axios
      .post(
        "/api/udpate/user",
        { password: password },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section id="general">
      <form className="generalLog">
        <div>
          <p>Nom</p>
          <input
            type="text"
            placeholder="Nom"
            onChange={(e) => {
              setNameState(e.target.value);
            }}
          />
          <button
            className="btn"
            onClick={(e) => {
              ModifyName(e);
            }}
          >
            Modifier le nom
          </button>
        </div>
      </form>
      <form className="generalReinit">
        <div>
          <a>Réinitialiser l'adresse mail</a>
          <input
            type="email"
            onChange={(e) => {
              setMailState(e.target.value);
            }}
          />
          <a>Confirmation</a>
          <input
            type="email"
            onChange={(e) => {
              setMailConfirm(e.target.value);
            }}
          />
          <button
            className="btn"
            onClick={(e) => {
              ModifyMail(e);
            }}
          >
            Modifier l'e-mail
          </button>
        </div>
        <div>
          <a>Réinitialiser le mot de passe</a>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <a>Confirmation</a>
          <input
            type="password"
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
          <button
            className="btn"
            onClick={(e) => {
              ModifyPassword(e);
            }}
          >
            Modifier le mot de passe
          </button>
        </div>
      </form>
    </section>
  );
};

export default General;
