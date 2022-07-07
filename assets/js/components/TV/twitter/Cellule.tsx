import {
  DataEntity,
  UsersEntity,
} from "../../../../helpers/propsType/TwitterResponse";
import "../../../../styles/TV/Tv.css";
import "../../../../styles/TV/Twitter.css";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
type AppProps = {
  tweetData: any;
  userData: any;
  setCelluleHeight: any;
};

const Cellule = ({ tweetData, userData, setCelluleHeight }: AppProps) => {
  const celluleRef = useRef<HTMLDivElement>(null);
  /* console.log("Cellule", tweetData);
  console.log("Cellule", userData); */

  const getMinutesSinceNow = (created_at: string) => {
    //Get the number of minutes since the tweet was created
    const date = new Date(created_at);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    return minutes;
  };

  useEffect(() => {
    console.log("celluleHeightTwi");
    setCelluleHeight(celluleRef.current!.clientHeight);
  }, []);

  return (
    <>
      <motion.div
        className="celluleTwitter text-white d-flex flex-column"
        style={{
          width: "45%",
          margin: "0.5em",
          padding: "0.5em",
          minHeight: "20%",
          backgroundColor: "#232932",
          translateY: "-2100px",
        }}
        animate={{ y: 12 }}
        transition={{
          /* repeat: Infinity, ease: "easeInOut", */ duration: 10,
          ease: "easeInOut",
        }}
        ref={celluleRef}
      >
        {userData && tweetData && (
          <>
            <div className="header-cellule d-flex justify-content-between">
              <div className="cellule-name d-flex justify-content-around">
                <div>
                  <img
                    src={userData.profile_image_url}
                    alt={"PDP"}
                    className="rounded-circle"
                  />
                </div>
                <div>
                  <p
                    style={{
                      margin: "auto",
                      marginLeft: "0.5em",
                      fontFamily: "Segoe UI",
                      fontSize: "16px",
                    }}
                  >
                    {userData.name}
                  </p>
                  <p
                    style={{
                      margin: "auto",
                      marginLeft: "0.5em",
                      fontFamily: "Segoe UI",
                      fontSize: "14px",
                      color: "#b1b1b1",
                    }}
                  >
                    @{userData.username}
                  </p>
                </div>
              </div>
              <p>{getMinutesSinceNow(userData.created_at)}min</p>
            </div>
            <p style={{ paddingTop: "0.5em", paddingBottom: "0.5em" }}>
              {tweetData.text}
            </p>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Cellule;
