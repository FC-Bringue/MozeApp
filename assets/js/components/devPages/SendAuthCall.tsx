import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SendAuthCall = () => {
  const bearerToken = useSelector((state: any) => state.userInfos.token);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    axios
      .get(`/api/instagram/getHashtag`, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>AUTH CALL API</h1>
    </div>
  );
};

export default SendAuthCall;
