import axios from "axios";
import { createUserProps, loginUserProps } from "../types/login_signup";

export const createUser = (infos: createUserProps) => {
  axios
    .post("/api/users", {
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

const loginUser = (infos: loginUserProps) => {};
