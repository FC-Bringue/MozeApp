import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/userInfosSlice";
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

export const loginUser = async (infos: loginUserProps) => {
  var restmp = await axios
    .post("api/login_check", {
      email: infos.email,
      password: infos.password,
    })
    .then((res) => {
      console.log(res);
      return res.data.token;
    })
    .catch((err) => {
      console.log(err);
      return;
    });

  return restmp;
};
