import "../../../styles/session/Session.css";
import SessionCards from "./SessionCards";

const smplSess = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const SessionUtil = () => {
  return (
    <section id="sessions">
      <h4>SESSION</h4>
      <h1>LISTE DES SESSIONS</h1>
      <section className="session-list">
        {smplSess.map((number) => (
          <SessionCards number={number} />
        ))}
      </section>
    </section>
  );
};

export default SessionUtil;
