import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

const modeFixe = ({ color, setColor }: any) => {
  return (
    <>
      <HexColorPicker color={color} onChange={setColor} />
    </>
  );
};
const modeFlow = ({ color, setColor }: any) => {
  const ittr = [1, 2, 3, 4];
  return (
    <>
      <div className="flowContainer">
        {ittr.map((item: any, index: number) => (
          <HexColorPicker color={color} onChange={setColor} />
        ))}
      </div>
    </>
  );
};

const Step4Lights = ({ dataLights, lightsList }: any) => {
  const [color, setColor] = useState<any>("#000000");
  const [mode, setMode] = useState<any>("fixe");
  useEffect(() => {}, []);

  return (
    <div className="stp4">
      <div className="config">
        <div>
          <h5>Mode de l'ambiance :</h5>
          <select
            name="ambiance"
            id="ambiance"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="fixe">FIXE</option>
            <option value="flow">FLOW</option>
          </select>
        </div>
        <div>
          <h5>Couleur de l'ambiance:</h5>
          {mode === "fixe"
            ? modeFixe({ color, setColor })
            : modeFlow({ color, setColor })}
        </div>
      </div>
      <div className="separator"></div>
      <div className="note">
        <h5>Note</h5>
        <p>
          Pensez bien a lancer l'application Moze Yeelight Control
          <br /> et de la laisser tourner en arriere plan!
        </p>
      </div>
    </div>
  );
};
export default Step4Lights;
