import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/userInfosSlice";
import { createUserProps, loginUserProps } from "../types/login_signup";

export const createUser = async (infos: createUserProps) => {
  var restmp = await axios
    .post("/api/users", {
      email: infos.email,
      password: infos.password,
      name: infos.name,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });

  return restmp;
};

export const loginUser = async (infos: loginUserProps) => {
  var restmp = await axios
    .post("api/login_check", {
      email: infos.email,
      password: infos.password,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });

  return restmp;
};
