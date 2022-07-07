import { useEffect, useState } from "react";

import Cellule from "./Cellule";

import { TwitterResponse } from "../../../../helpers/propsType/TwitterResponse";
import { twitterjson } from "../../../../helpers/sample/twitter.json";
import "../../../../styles/TV/Twitter.css";
// import { twi_response } from "../../helpers/sample/twitter.json";

const Overlaytwitter = () => {
  const [getHashtag, setGetHashtag] = useState<TwitterResponse | any>(
    twitterjson
  );

  const [celluleHeight, setCelluleHeight] = useState<number | any>(0);

  useEffect(() => {
    setGetHashtag(twitterjson);
    console.log(getHashtag);
  }, []);

  return (
    <>
      <section
        className="twitter-embedded"
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
          padding: "0.5em",
        }}
      >
        <div
          className="head_twibox"
          style={{
            display: "flex",
            flexWrap: "wrap",
            height: "3em",
            overflowY: "hidden",
            margin: "auto",
            width: "100%",
            justifyContent: "space-between",
            background: "#000C19",
            borderRadius: "25px",
            padding: "0.5em",
          }}
        >
          <img
            className="twitter_logo"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png"
            width="35"
            height="35"
          ></img>
          <p className="head_twibox" style={{ color: "white" }}>
            Current Feed:
          </p>
          <p className="head_twibox">#ANTOINELEBG</p>
        </div>

        {getHashtag &&
          getHashtag.result.data!.map(
            (tweet: TwitterResponse, index: number, item: any) => {
              const userData = getHashtag.result.includes.users.username;
              return (
                <Cellule
                  key={index}
                  tweetData={item}
                  userData={userData}
                  setCelluleHeight={setCelluleHeight}
                  // celluleHeight={celluleHeight * (getHashtag.data!.length / 2)}
                />
              );
            }
          )}
      </section>
    </>
  );
};

export default Overlaytwitter;
