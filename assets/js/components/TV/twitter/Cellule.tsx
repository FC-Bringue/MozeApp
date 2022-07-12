import {
  DataEntity,
  UsersEntity,
} from "../../../../helpers/propsType/TwitterResponse";
import "../../../../styles/TV/Tv.scss";
import "../../../../styles/TV/Twitter.css";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
type AppProps = {
  tweetData: any;
  userData: any;
};

const Cellule = ({ tweetData, userData }: AppProps) => {
  const celluleRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {userData && tweetData && (
        <motion.div
          className="celluleTwitter text-white d-flex flex-column"
          style={{
            width: "45%",
            margin: "0.5em",
            padding: "0.5em",
            minHeight: "20%",
            backgroundColor: "#232932",
            translateY: "-1000px",
          }}
          animate={{ y: 1000 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            duration: 20,
          }}
          ref={celluleRef}
        >
          <>
            <div className="header-cellule d-flex justify-content-between">
              <div className="cellule-name d-flex justify-content-around">
                <div>
                  {userData.profile_image_url && (
                    <img
                      src={userData.profile_image_url}
                      alt={"PDP"}
                      className="rounded-circle"
                    />
                  )}
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
            </div>
            <p style={{ paddingTop: "0.5em", paddingBottom: "0.5em" }}>
              {tweetData.text}
            </p>
          </>
        </motion.div>
      )}
    </>
  );
};

export default Cellule;
