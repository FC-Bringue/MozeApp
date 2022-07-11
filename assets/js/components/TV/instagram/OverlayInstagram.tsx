import { useEffect, useState } from "react";
import Cellule from "./Cellule";
import axios from "axios";
import { iteratorSymbol } from "immer/dist/internal";

function Instapp(){

}

const OverlayInstagram = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
      'https://moze-api-instagram.herokuapp.com/getHashtag?api_key=TEST&hashtag=concours',
      ).then((res) => 
        {
          let tmp = res.data[0];
          tmp = JSON.parse(tmp);
          tmp = tmp.sections;
          console.log("tout",tmp);
          setData(tmp)
        }
      ).catch((err) =>
        {
          console.log(err);
        }
      );
    };

    fetchData();

  },[]);

  return(
    <>
      <section
        className="instagram-embedded"
        style={{
          display: "flex",
          flexWrap: "wrap",
          height: "65vh",
          overflowY: "hidden",
          margin: "auto",
          width: "40%",
          justifyContent: "space-between",
          background: "linear-gradient(180deg, rgba(7,9,17,1) 0%, rgba(50,70,89,1) 60%, rgba(52,73,93,1) 100%)",
          borderRadius: "25px",
          position: "relative",
        }}
      >
        <div
          className="head_twibox"
          style={{
            display: "flex",
            flexWrap: "wrap",
            height: "3em",
            width: "100%",
            background: "#000C19",
            padding: "0.5em",
          }}
        >
          <img
            className="instagram_logo"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png"
            width="35"
            height="35"
          ></img>
          <p className="head_twibox" style={{ color: "white", margin: "5px" }}> Current Feed : </p>
          <p className="head_twibox">#DYING</p>
        </div>

        {data &&
          data.map((ligne: any, index: any) => (
              <Cellule key={index} ligne={ligne} />
          ))}
  </section>
  </>)};
export default OverlayInstagram;