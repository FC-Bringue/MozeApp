import axios from "axios";

export const createSession = () => {
  const createSessionJSON = {
    SessionName: "",
    SessionHashtag: "",
    idPlaylist: "",
    lights: "",
  };

  axios
    .post("/api/create/session", createSessionJSON)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
