import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "../login";
import Register from "../register";
import Profile from "../profile";
import ProfileShow from "../profileshow";
import ResetPasswordEmailForm from "../resetPassword/resetPasswordEmail";
import ResetPassword from "../resetPassword";
import ResetPasswordValidation from "../resetPassword/resetPasswordValidation";
import UserValidation from "../userValidation";
import Home from "../home";
import { AuthProvider } from "./AuthContext";
import LoggedRoute from "./LoggedRoute";
import NotLoggedRoute from "./NotLoggedRoute";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../nav";
// import Toaster from '../toaster';
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
            <NotLoggedRoute
              path="/resetPasswordValidation/:token"
              component={ResetPasswordValidation}
            />
            <NotLoggedRoute
              path="/resetPasswordEmail"
              component={ResetPasswordEmailForm}
            />
            <NotLoggedRoute
              path="/resetPassword/:email"
              component={ResetPassword}
            />
            <NotLoggedRoute
              path="/userValidation/:token"
              component={UserValidation}
            />
            {/* <NotLoggedRoute
              path="/validation/newaccount/:token"
              component={UserValidation}
            />
            <NotLoggedRoute path="/forgotpassword" component={ForgotPassword} />
            <NotLoggedRoute
              path="/validation/forgotpassword/:token"
              component={ResetForgotPassword}
            />*/}
            <LoggedRoute path="/profile/:username" component={ProfileShow} />
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
