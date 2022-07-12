import { useState } from "react";
import { motion } from "framer-motion";
import { ImCross, ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setNewSessionName,
  setNewSessionHashtag,
  setTmpPlaylist,
  setNewSessionLights,
  setTmpLights,
} from "../../../helpers/redux/slices/tempSlice";

const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

const StepOne = ({ setSessionName, setSessionHashtag, setStep }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <h1>Créer une nouvelle session</h1>
      <div className="newSession">
        <p>Merci de donner un nom à la nouvelle session :</p>
        <input
          type="text"
          placeholder="Nom de la session"
          onChange={(e) => dispatch(setNewSessionName(e.target.value))}
        />
        <p>Souhaitez vous y spécifier un hashtag pour les réseaux sociaux ?</p>
        <input
          type="text"
          placeholder="Hashtag (sans #)"
          onChange={(e) => dispatch(setNewSessionHashtag(e.target.value))}
        />
        <div className="containerBtn">
          <motion.div
            style={{
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={transition}
            className="passTo"
            onClick={() => navigate("/dashboard/sessions")}
          >
            <ImArrowLeft2 size={"2em"} />
            <p>RETOUR</p>
          </motion.div>

          <motion.div
            style={{
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={transition}
            className="passTo "
            onClick={() => {
              dispatch(setTmpPlaylist(null));
              dispatch(setNewSessionLights(null));
              dispatch(setTmpLights(null));
              navigate("config");
            }}
          >
            <p>SUIVANT</p>
            <ImArrowRight2 size={"2em"} />
          </motion.div>
        </div>
      </div>
    </>
  );
};

const NewSession = () => {
  const [step, setStep] = useState(1);
  const [sessionName, setSessionName] = useState(null);
  const [sessionHashtag, setSessionHashtag] = useState(null);

  return (
    <motion.section id="sessions" exit={{ opacity: 0 }} transition={transition}>
      <h4>SESSIONS</h4>
      <StepOne
        setSessionHashtag={setSessionHashtag}
        setSessionName={setSessionName}
        setStep={setStep}
      />
    </motion.section>
  );
};

export default NewSession;
