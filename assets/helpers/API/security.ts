import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import store from "../redux/Store";

const bearerToken = useSelector((state: any) => state.userInfos.token);
const config = {
  headers: {
    Authorization: `Bearer ${bearerToken}`,
  },
};

export const checkToken = () => {
  axios
    .get("/api/checkPermission", config)
    .then((res) => {
      console.log("checkPermission", res);
      if (res.data.result != true) {
        persistStore(store).purge();
        window.location.replace("/login");
      }
    })
    .catch((err) => {
      console.log("checkPermission", err);
      persistStore(store).purge();
      window.location.replace("/login");
    });
};
