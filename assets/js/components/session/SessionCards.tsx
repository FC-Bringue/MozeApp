import party from "../../../img/icons/party.svg";
import music from "../../../img/icons/music-solid.svg";
import light from "../../../img/icons/lightbulb-solid.svg";

type SessionCardsProps = {
  number: number;
};

const SessionCards = ({ number }: SessionCardsProps) => {
  return (
    <div className="session-item">
      <div>
        <p>SESSION {number}</p>
      </div>
      <div>
        <p>Nom de playlist</p>
        <div className="icons-fnct">
          <div>
            <img src={music} title="music" />
          </div>
          <div>
            <img src={party} title="party" />
          </div>
          <div>
            <img src={light} title="light" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCards;
