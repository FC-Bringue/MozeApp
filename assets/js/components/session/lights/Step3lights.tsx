import { useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";

import { setNewSessionLights } from "../../../../helpers/redux/slices/tempSlice";

const Step3Lights = ({ NmbOfLights, dataLights, setDataLights }: any) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>(
    Array(NmbOfLights).fill({ ip: 0, color: "#000000", flow: [] })
  );

  useEffect(() => {
    setDataLights(data);
  }, [data]);

  return (
    <>
      <div className="infosLigne">
        <p className="stp1P">
          Merci d'indiquer les adresses IPs de vos appareil :
        </p>
        <AiFillInfoCircle size={"2em"} />
      </div>

      <div className="IPListContainer">
        {data.map((item: any, index: number) => (
          <div className="cell" key={index}>
            <p className="stp1P">Adresse IP {index + 1}</p>
            <input
              type={"text"}
              placeholder={"192.168.X.XX"}
              onBlur={(e) => {
                console.log(data);
                let newData = data;
                newData[index] = {
                  ip: e.target.value,
                  color: "#00000",
                  flow: [],
                };
                setData(newData);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Step3Lights;
