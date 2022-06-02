import axios from "axios";
import { useSelector } from "react-redux";

import { createUserProps, loginUserProps } from "../types/login_signup";

export const createUser = (infos: createUserProps) => {
  axios
    .post("/api/users", {
      email: infos.email,
      password: infos.password,
    })
    .then((res) => {
      console.log(res);
      return { message: "successful connexion", infos: "[PLACEHOLDR]" };
    })
    .catch((err) => {
      console.log(err);
      return { message: "successful connexion", infos: "[PLACEHOLDR]" };
    });
};

const loginUser = (infos: loginUserProps) => {
  axios
    .post("api/login_check", {
      email: infos.email,
      password: infos.password,
    })
    .then((res) => {
      console.log(res);
      return;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};
