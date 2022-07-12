import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import General from "./General";
import "../../../styles/settings/Parametres.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { motion } from "framer-motion";

const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

const Parametres = () => {
  const location = useLocation();

  console.log("hash", location.hash);
  console.log("pathname", location.pathname);
  console.log("search", location.search);
  const navigate = useNavigate();
  let { subTab } = useParams();
  const barname = useSelector((state: any) => state.userInfos.name);

  console.log("subTab", subTab);

  useEffect(() => {
    if (location.pathname === "/dashboard/settings") {
      navigate(`/dashboard/settings/general`);
    }
  }, []);

  return (
    <motion.section
      id="parametres"
      exit={{ opacity: 0 }}
      transition={transition}
    >
      <h4>PARAMETRES</h4>
      <h1>{barname && barname}</h1>
      <div className="navigation">
        <div
          className={
            location.pathname === "/dashboard/settings/general"
              ? "param-nav-active"
              : ""
          }
          onClick={() => navigate("general")}
        >
          <p>GENERAL</p>
        </div>
        <div
          className={
            location.pathname === "/dashboard/settings/linked-apps"
              ? "param-nav-active"
              : ""
          }
          onClick={() => navigate("linked-apps")}
        >
          <p>APPLICATIONS</p>
        </div>
      </div>
      <Outlet />
    </motion.section>
  );
};

export default Parametres;
