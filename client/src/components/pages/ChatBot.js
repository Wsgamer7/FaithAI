import React from "react";

import "./ChatBot.css";
import LeftNar from "../modules/LeftBar";
import TopBar from "../modules/TopBar";
import Chat from "../modules/Chat";

const ChatBot = () => {
  return (
    <div className="u-flex ChatBot-container">
      <div className="ChatBot-leftBar">
        <LeftNar />
      </div>
      <div className="ChatBot-right u-flexColumn">
        <TopBar />
        <Chat />
      </div>
    </div>
  );
};
export default ChatBot;
