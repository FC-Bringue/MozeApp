import { Routes, Route, Link } from "react-router-dom";

import Login from "./components/auth/Login";
import PssdForget from "./components/auth/PssdForget";
import Signup from "./components/auth/Signup";
import AuthedUsers from "./components/AuthedUsers/AuthedUsers";
import SessionUtil from "./components/session/SessionUtil";
import Parametres from "./components/settings/Parametres";
import Navigation from "./Navigation";

const App = () => {
  return (
    <div id="App">
      <Routes>
        <Route path="dashboard" element={<AuthedUsers />}>
          <Route path=":tab" element={<AuthedUsers />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
      </Routes>
    </div>
  );
};
export default App;
