import { motion } from "framer-motion";

import mozeLogo from "../../../img/logos/MOZE.svg";

import "../../../styles/404.scss";

const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

const QuatreCentQuatre = () => {
  return (
    <motion.section
      id="quatrecentquatre"
      exit={{ opacity: 0 }}
      transition={transition}
    >
      <div className="logo">
        <img src={mozeLogo} alt="logo" />
      </div>
      <div className="img1">
        <img src={"https://destroykeaum.alwaysdata.net/assets/jf.png"} alt="" />
      </div>
      <div className="text">
        <h1>404</h1>
        <h2>C'est bien mal branlé tout ça !</h2>
        <p>
          En sah t'es bien perdu mon pote !<br /> I think there is an impostor
          amogus !
        </p>
      </div>
      <div className="img2">
        <img
          src={"https://destroykeaum.alwaysdata.net/assets/sus.gif"}
          alt=""
        />
      </div>
    </motion.section>
  );
};

export default QuatreCentQuatre;
