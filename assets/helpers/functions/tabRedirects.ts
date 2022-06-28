import { useNavigate } from "react-router-dom";

export const tabRedirects = (tab: string) => {
  console.log("TAB REDIRECT TROUVER UN FIX AU USENAVIGATE");

  /* const navigate = useNavigate();
  navigate(`/dashboard/${tab}`); */

  window.location.href = `/dashboard/${tab}`;
};
