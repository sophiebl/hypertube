import React from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "../login";
import Register from "../register";
import Profile from "../profile";
// import ProfileShow from '../profileshow';
import Home from "../home";
import { AuthProvider } from "./AuthContext";
import LoggedRoute from "./LoggedRoute";
import NotLoggedRoute from "./NotLoggedRoute";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../nav";
// import Toaster from '../toaster';
// import UserValidation from '../uservalidation';
// import ResetForgotPassword from '../ResetforgotPassword';
// import ForgotPassword from '../forgotpassword';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
            <Nav />
            <Switch>
              <NotLoggedRoute path="/login" component={Login} />
              <NotLoggedRoute path="/register" component={Register} />
              {/* <NotLoggedRoute
                path="/validation/newaccount/:token"
                component={UserValidation}
              />
              <NotLoggedRoute path="/forgotpassword" component={ForgotPassword} />
              <NotLoggedRoute
                path="/validation/forgotpassword/:token"
                component={ResetForgotPassword}
              />
              <LoggedRoute path="/profile/:username" component={ProfileShow} /> */}
              <LoggedRoute path="/profile" component={Profile} />
              <Route path="/" component={Home} />
            </Switch>
        </Router>
        {/* <Toaster /> */}
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;
