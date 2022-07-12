import { ImPlus } from "react-icons/im";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

type SessionCardsProps = {
  number: number;
};

const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

const SessionAdd = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={transition}
      className="session-item newOne"
      onClick={() => navigate("/dashboard/sessions/new")}
      style={{
        cursor: "pointer",
      }}
    >
      <ImPlus className="iconsPlus" size={"3em"} />
    </motion.div>
  );
};

export default SessionAdd;
