import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";
import {
  loginSuccess,
  logoutSuccess,
  oauthFail,
  badUsername,
  signupSuccess,
  alreadyLoggedin,
  userValidated,
  userNotValidated,
  forgotPasswordSuccess,
  resetPasswordSuccess,
  deleteSuccess,
  userNotFound,
  profileNotCompleted,
  userBlockedYou,
  accessDenied,
  passwordReset,
} from "./toaster-container";

const Toaster = ({ getParams }) => {
  const [toastDebounced] = useDebouncedCallback((getParams) => {
    switch (getParams.message) {
      case "login_success":
        loginSuccess();
        break;
      case "logout_success":
        logoutSuccess();
        break;
      case "bad_username":
        badUsername();
        break;
      case "oauth_fail":
        oauthFail();
        break;
      case "delete_success":
        deleteSuccess();
        break;
      case "signup_success":
        signupSuccess();
        break;
      case "already_loggedin":
        alreadyLoggedin();
        break;
      case "user_validated":
        userValidated();
        break;
      case "user_not_validated":
        userNotValidated();
        break;
      case "forgotPassword_success":
        forgotPasswordSuccess();
        break;
      case "reset_password_success":
        resetPasswordSuccess();
        break;
      case "user_not_found":
        userNotFound();
        break;
      case "profile_not_completed":
        profileNotCompleted();
        break;
      case "user_blocked_you":
        userBlockedYou();
        break;
      case "access_denied":
        accessDenied();
        break;
      case "cant_access_chat":
        accessDenied();
        break;
      case "password_reset":
        passwordReset();
        break;
      default:
        break;
    }
  }, 500);

  if (getParams !== undefined && getParams.message !== undefined) {
    toastDebounced(getParams);
  }
  return null;
};

export default Toaster;
