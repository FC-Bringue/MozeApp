import { useRef } from "react";

const RegisterLightNmb = ({ setNmbOfLights }: any) => {
  const inputRef = useRef(document.createElement("input"));

  const checkValidity = (e: any) => {
    var value = e.target.value;

    console.log("'" + value + "'");

    if (isNaN(value)) {
      alert("Please enter a number");
      return false;
    }

    if (value == "") {
      inputRef.current.value = "1";
      setNmbOfLights(1);
      return true;
    }

    value = parseInt(value);
    if (value < 1) {
      e.target.value = 1;
    }

    setNmbOfLights(value);

    return true;
  };

  return (
    <>
      <p className="stp1P">Combien d'ampoules comptez vous mettre en place ?</p>
      <div>
        <input
          className="inputText"
          type={"text"}
          onBlur={(e) => checkValidity(e)}
          onChange={(e) => console.log("onChange")}
          placeholder={"min. 1"}
          ref={inputRef}
        />
      </div>
    </>
  );
};

export default RegisterLightNmb;
