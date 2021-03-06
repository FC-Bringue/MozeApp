import { useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { setTmpLights } from "../../../../helpers/redux/slices/tempSlice";

const RegisterLightsIp = ({ NmbOfLights }: any) => {
  const dispatch = useDispatch();
  const oldLights = useSelector((state: any) => state.tempSlice.tmpLights);

  const [lightsDuplicate, setLightsDuplicate] = useState([]);

  useEffect(() => {
    console.log("oldLights", oldLights);
    console.log("lightsDuplicate", lightsDuplicate);
    if (oldLights != null) {
      setLightsDuplicate(oldLights);
    }
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
        {Array(NmbOfLights)
          .fill({ ip: 0, color: "#000000", flow: [] })
          .map((item: any, index: number) => (
            <div className="cell" key={index}>
              <p className="stp1P">Adresse IP {index + 1}</p>
              <input
                type={"text"}
                placeholder={"192.168.X.XX"}
                onChange={(e) => {
                  console.log("oldLights", oldLights);
                  /* const newLights = [...lightsDuplicate];
                  newLights[index].ip = e.target.value;
                  setLightsDuplicate(newLights);
                  dispatch(setTmpLights(newLights)); */
                }}
                onBlur={(e) => {
                  console.log(e.target.value);
                  var newLights = [...lightsDuplicate];
                  //If the index is already inside a Json inside the array, update the ip value of the Json, else create a new Json with the ip value
                  if (
                    newLights.map((item: any) => item.index).includes(index)
                  ) {
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
      </div>
    </>
  );
};

export default RegisterLightsIp;
