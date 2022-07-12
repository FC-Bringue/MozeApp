import { useEffect, useState } from "react";

import Cellule from "./Cellule";

import { TwitterResponse } from "../../../../helpers/propsType/TwitterResponse";
import { twitterjson } from "../../../../helpers/sample/twitter.json";
import "../../../../styles/TV/Twitter.css";
import axios from "axios";
// import { twi_response } from "../../helpers/sample/twitter.json";

const Overlaytwitter = ({ hashtag }: any) => {
  const [getHashtag, setGetHashtag] = useState<TwitterResponse | any>(null);
  const [refresh, setRefresh] = useState<TwitterResponse | any>(twitterjson);

  useEffect(() => {
    axios
      .get("/api/twitter/getHashtag?hashtag=" + hashtag)
      .then((res: any) => {
        console.log(res.data);
        setGetHashtag(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/twitter/getHashtag?hashtag=" + hashtag)
      .then((res: any) => {
        console.log(res.data);
        setGetHashtag(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });

    setTimeout(() => {
      setRefresh(refresh + 1);
    }, 60000);
  }, [hashtag, refresh]);

  return (
    <>
      <section
        className={(hashtag === "" && "hidden") + " twitter-embedded"}
        style={{
          display: "flex",
          flexWrap: "wrap",
          height: "65vh",
          overflowY: "hidden",
          margin: "auto",
          width: "40%",
          justifyContent: "space-between",
          background:
            "linear-gradient(180deg, rgba(7,9,17,1) 0%, rgba(50,70,89,1) 60%, rgba(52,73,93,1) 100%)",
          borderRadius: "25px",
          position: "relative",
          // padding: "0.5em",
        }}
      >
        <div
          className="head_twibox"
          style={{
            display: "flex",
            flexWrap: "wrap",
            height: "3em",
            // margin: "auto",
            width: "100%",
            // justifyContent: "space-between",
            background: "#000C19",
            // borderRadius: "25px",
            padding: "0.5em",
          }}
        >
          <img
            className="twitter_logo"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png"
            width="35"
            height="35"
            alt=""
          ></img>
          <p className="head_twibox" style={{ color: "white", margin: "5px" }}>
            Current Feed :
          </p>
          <p className="head_twibox">#{hashtag}</p>
        </div>

        {getHashtag &&
          getHashtag.result.data!.map(
            (tweet: TwitterResponse, id: number, item: any) => {
              const userData = getHashtag.result.includes.users![id];
              const test = getHashtag.result.data![id];
              return <Cellule key={id} tweetData={test} userData={userData} />;
            }
          )}
      </section>
    </>
  );
};

export default Overlaytwitter;
