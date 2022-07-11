import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setMail, setName, setUserId } from "../redux/slices/userInfosSlice";

const dispatch = useDispatch();
const bearerToken = useSelector((state: any) => state.userInfos.token);
const config = {
  headers: {
    Authorization: `Bearer ${bearerToken}`,
  },
};

export const userInfos = () => {
  axios
    .get("/api/getUserInfos", config)
    .then(async (res) => {
      dispatch(setName(res.data.user.name));
      dispatch(setMail(res.data.user.email));
      dispatch(setUserId(res.data.user.id));
      console.log("userinfos", res.data);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
};
