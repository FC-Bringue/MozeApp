import { AiFillInfoCircle } from "react-icons/ai";

const RegisterLightsIp = ({ NmbOfLights }: any) => {
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
                onBlur={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default RegisterLightsIp;
