import {
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import "../../../styles/settings/Parametres.css";
import { useSelector } from "react-redux";

const Parametres = () => {
  const navigate = useNavigate();
  let { subTab } = useParams();
  const barname = useSelector((state: any) => state.userInfos.name);

  console.log("subTab", subTab);

  return (
    <section id="parametres">
      <h4>PARAMETRES</h4>
      <h1>{barname && barname}</h1>
      <div className="navigation">
        <div className={subTab === undefined ? "param-nav-active" : ""}>
          <p>GENERAL</p>
        </div>
        <div
          className={subTab === "linked-apps" ? "param-nav-active" : ""}
          onClick={() => navigate("linked-apps")}
        >
          <p>APPLICATIONS</p>
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default Parametres;
