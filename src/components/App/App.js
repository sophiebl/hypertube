import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import Signup from '../signup';
import Login from '../login';
import Register from '../register';
// import Profile from '../profile';
// import ProfileShow from '../profileshow';
// import Search from '../search';
// import Suggestions from '../suggestions';
// import Visit from '../visit';
// import Like from '../like';
import Home from '../home';
// import { AuthProvider } from './AuthContext';
// import SecureRoute from './SecureRoute';
// import NotLoggedRoute from './NotLoggedRoute';
import 'react-toastify/dist/ReactToastify.css';
// import Nav from '../nav';
// import Toaster from '../toaster';
// import UserValidation from '../uservalidation';
// import ResetForgotPassword from '../ResetforgotPassword';
// import ForgotPassword from '../forgotpassword';
// import Chat from '../chat';
// import ChatRoom from '../chatroom';

function App() {
  axios.get('/api')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });


  return (
    <div className="App">
      {/* <AuthProvider> */}
        <Router>
          {/* <Nav /> */}
          <Switch>
            {/* <NotLoggedRoute path="/signup" component={Signup} /> */}
            {/* <NotLoggedRoute path="/login" component={Login} /> */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {/* <NotLoggedRoute
              path="/validation/newaccount/:token"
              component={UserValidation}
            />
            <NotLoggedRoute path="/forgotpassword" component={ForgotPassword} />
            <NotLoggedRoute
              path="/validation/forgotpassword/:token"
              component={ResetForgotPassword}
            />
            <SecureRoute path="/search" component={Search} />
            <SecureRoute path="/suggestions" component={Suggestions} />
            <SecureRoute path="/profile/:username" component={ProfileShow} />
            <SecureRoute path="/profile" component={Profile} />
            <SecureRoute path="/visits" component={Visit} />
            <SecureRoute path="/likes" component={Like} />
            <SecureRoute path="/chat" component={Chat} />
            <SecureRoute path="/chatroom/:matchId" component={ChatRoom} /> */}
            <Route path="/" component={Home} />
          </Switch>
        </Router>
        {/* <Toaster /> */}
        <ToastContainer />
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
