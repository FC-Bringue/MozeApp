import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const InstagramRedirect = () => {
  const navigate = useNavigate();
  const bearerToken = useSelector((state: any) => state.userInfos.token);

  useEffect(() => {
    //get the code value from the url
    const code = new URLSearchParams(window.location.search).get("code");
    console.log("code", code);
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    axios
      .get("/api/instagram/setAccessToken?code=" + code, config)
      .then((res) => {
        console.log(res);
        navigate("/dashboard/settings/linked-apps");
      })
      .catch((err) => {
        navigate("/dashboard/settings/linked-apps");
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Instagram Redirect</h1>
    </div>
  );
};

export default InstagramRedirect;
