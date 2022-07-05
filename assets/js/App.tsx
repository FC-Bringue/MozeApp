import { Routes, Route, Link } from "react-router-dom";

import Login from "./components/auth/Login";
import PssdForget from "./components/auth/PssdForget";
import Signup from "./components/auth/Signup";
import AuthedUsers from "./components/AuthedUsers/AuthedUsers";
import SessionUtil from "./components/session/SessionUtil";
import Parametres from "./components/settings/Parametres";
import Navigation from "./Navigation";
import Index from "./components/landing/index";
import Appuser from "./components/Application/Appuser";





const App = () => {
  return (
    <div id="App">
      <Routes>
        <Route path="dashboard" element={<AuthedUsers />}>
          <Route path=":tab" element={<AuthedUsers />}>
            <Route path=":subTab" element={<AuthedUsers />} />
          </Route>
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="App" element={<Appuser />} />
        <Route path="register" element={<Signup />} />
        <Route path="/" element={<Index />} />
        
      </Routes>
      
    </div>
  );
};
export default App;
