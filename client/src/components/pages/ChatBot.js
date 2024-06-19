import React from "react";

import "./ChatBot.css";
import LeftNar from "../modules/LeftBar";
import Chat from "../modules/Chat";

const ChatBot = () => {
  return (
    <div className="u-flex ChatBot-container">
      <div className="ChatBot-leftBar">
        <LeftNar />
      </div>
      <div className="ChatBot-chat u-flex">
        <Chat />
      </div>
    </div>
  );
};
export default ChatBot;
