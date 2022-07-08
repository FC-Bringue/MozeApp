import { ImPlus } from "react-icons/im";

import { useNavigate } from "react-router-dom";

type SessionCardsProps = {
  number: number;
};

const SessionAdd = () => {
  const navigate = useNavigate();

  return (
    <div
      className="session-item newOne"
      onClick={() => navigate("/dashboard/sessions/new")}
    >
      <ImPlus className="iconsPlus" size={"3em"} />
    </div>
  );
};

export default SessionAdd;
