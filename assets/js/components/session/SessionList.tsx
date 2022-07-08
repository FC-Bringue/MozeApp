const smplSess = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
import SessionCards from "./SessionCards";
import SessionAdd from "./SessionAdd";

const ListIt = () => {
  return (
    <section id="sessions">
      <h4>SESSIONS</h4>
      <h1>LISTE DES SESSIONS</h1>
      <section className="session-list">
        {smplSess.map((number, index) => (
          <>
            {console.log(number, index)}
            <SessionCards number={number} />
            {index + 1 === smplSess.length && <SessionAdd />}
          </>
        ))}
      </section>
    </section>
  );
};

export default ListIt;
