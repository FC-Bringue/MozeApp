import { AiOutlineHeart } from "react-icons/ai";

const TracksData = ({ track, index }: any) => {
  return (
    <div className="trackCellule">
      <div className="tracksData">
        <img src={track.cover} alt="" />
        <div className="trackArtist">
          <p>{track.name}</p>
          <p>{track.artist}</p>
        </div>
      </div>

      <div className="likes">
        <p>{track.nbrLike}</p>
        <AiOutlineHeart size={"1.5em"} />
      </div>
    </div>
  );
};
export default TracksData;
