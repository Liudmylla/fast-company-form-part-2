import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/ui/navbar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ProfessionProvider } from "./hooks/use-profession";
import { QualitiesProvider } from "./hooks/use-qualities";
import { AuthProvider } from "./hooks/use-auth";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <QualitiesProvider>
          <ProfessionProvider>
            <Switch>
              <Route path="/users/:userId?/:edit?" component={Users} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/" exact component={Main} />
              <Redirect to="/" />
            </Switch>
          </ProfessionProvider>
        </QualitiesProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
