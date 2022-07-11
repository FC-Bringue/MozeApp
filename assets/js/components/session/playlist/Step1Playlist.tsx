import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewSessionIdPlaylist,
  setTmpPlaylist,
} from "../../../../helpers/redux/slices/tempSlice";
import { Bars } from "react-loader-spinner";

const Step1Lights = () => {
  const getBearer = useSelector((state: any) => state.userInfos.token);
  const getTmpPlaylist = useSelector(
    (state: any) => state.tempSlice.newSessionIdPLaylist
  );
  const [listPlaylist, setListPlaylist] = useState<any>([]);
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    axios
      .get("/api/get/spotify/userplaylist", {
        headers: {
          Authorization: `Bearer ${getBearer}`,
        },
      })
      .then((res) => {
        console.log(res.data.playlists);
        setListPlaylist(res.data.playlists);
        setDisplay(!display);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="explications">
        <p>
          Voici vos playlists : (Cliquez sur celle que vous désirez mettre en
          place)
        </p>
      </div>

      {display ? (
        <div className="playlistContainer">
          {listPlaylist.map((playlist: any) => {
            return (
              <div
                className={
                  (getTmpPlaylist === playlist.id ? "playlistSelected" : "") +
                  " playlist"
                }
                key={playlist.id}
                onClick={() => {
                  dispatch(setTmpPlaylist(playlist));
                  dispatch(setNewSessionIdPlaylist(playlist.id));
                }}
              >
                {playlist.images[0] && (
                  <img src={playlist.images[0].url} alt="logo" />
                )}

                <p>{playlist.name}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={"loaderContainer"}>
          <Bars color="#595251" height={200} width={200} />
        </div>
      )}
    </>
  );
};

export default Step1Lights;
