import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillInfoCircle } from "react-icons/ai";
import { ImPlus } from "react-icons/im";

import { setTmpLights } from "../../../../helpers/redux/slices/tempSlice";

const UpdatesLightsIp = () => {
  const dispatch = useDispatch();
  const oldLights = useSelector((state: any) => state.tempSlice.tmpLights);

  const [lightsDuplicate, setLightsDuplicate] = useState([]);

  useEffect(() => {
    setLightsDuplicate(oldLights);
  }, [oldLights]);

  return (
    <>
      <div className="infosLigne">
        <p className="stp1P">
          Merci d'indiquer les adresses IPs de vos appareil :
        </p>
        <AiFillInfoCircle size={"2em"} />
      </div>

      <div className="IPListContainer">
        {/* Genere le nombre d'input text indique par nmBofLights  */}
        {oldLights.map((item: any, index: number) => (
          <div className="cell" key={index}>
            <p className="stp1P">Adresse IP {index + 1}</p>
            <input
              type={"text"}
              placeholder={item.ip}
              onChange={(e) => {
                console.log("oldLights", oldLights);
                /* const newLights = [...lightsDuplicate];
                  newLights[index].ip = e.target.value;
                  setLightsDuplicate(newLights);
                  dispatch(setTmpLights(newLights)); */
              }}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value === "") return;
                var newLights = [...lightsDuplicate];
                //If the index is already inside a Json inside the array, update the ip value of the Json, else create a new Json with the ip value
                if (newLights.map((item: any) => item.index).includes(index)) {
                  newLights = [
                    ...newLights.filter((item: any) => item.index !== index),
                    {
                      index: index,
                      ip: e.target.value,
                      color: "#000000",
                      flow: [],
                    },
                  ];
                } else {
                  newLights.push({
                    ip: e.target.value,
                    color: "#000000",
                    flow: [],
                    index: index,
                  });
                }
                setLightsDuplicate(newLights);
                console.log("newLights", newLights);
                dispatch(setTmpLights(newLights));
              }}
            />
          </div>
        ))}

        <div className="cell">
          <p className="stp1P">Une nouvelle lumiere ?</p>
          <div
            className="plsBtn"
            onClick={() => {
              var newLights = [...lightsDuplicate];
              newLights.push({
                ip: "192.168.X.XX",
                color: "#000000",
                flow: [],
                index: newLights.length,
              });

              setLightsDuplicate(newLights);
              console.log("newLights", newLights);
              dispatch(setTmpLights(newLights));
            }}
          >
            <ImPlus className="iconsPlus" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatesLightsIp;
