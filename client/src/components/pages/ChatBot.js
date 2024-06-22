import React from "react";

import "./ChatBot.css";
import LeftNar from "../modules/LeftBar";
import TopBar from "../modules/TopBar";
import Chat from "../modules/Chat";

/**
 * @param
 * handleLogin(credentialResponse): function to handle login
 * handleLogout
 * userAvater: string
 * userId: string
 */
const ChatBot = (props) => {
  return (
    <div className="u-flex ChatBot-container">
      <div className="ChatBot-leftBar">
        <LeftNar />
      </div>
      <div className="ChatBot-right u-flexColumn">
        <TopBar
          userId={props.userId}
          userAvater={props.userAvater}
          handleLogin={props.handleLogin}
          handleLogout={props.handleLogout}
        />
        <Chat userId={props.userId} />
      </div>
    </div>
  );
};
export default ChatBot;
