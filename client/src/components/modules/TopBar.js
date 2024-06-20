import React from "react";
import "./TopBar.css";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "691513633601-f8bslcuhavnc8f844g720bk91409vde4.apps.googleusercontent.com";
/**
 * @param
 * handleLogin(credentialResponse): function to handle login
 * handleLogout
 * userAvater:string
 * userId: string
 */
const TopBar = (props) => {
  return (
    <div className="u-flex u-flex-justifyBetween TopBar-container">
      <div>left</div>
      <div>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {props.userId ? (
            <div>
              <img
                src={props.userAvater}
                alt="avatar"
                className="TopBar-avatar"
                title="点击登出"
                onClick={() => {
                  googleLogout();
                  props.handleLogout();
                }}
              />
            </div>
          ) : (
            <GoogleLogin onSuccess={props.handleLogin} onError={(err) => console.log(err)} />
          )}
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default TopBar;
