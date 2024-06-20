import React, { useContext } from "react";
import SingleMessage from "./SingleMessage";
import "./Chat.css";
const msg0 = {
  sender: {
    _id: "user",
    name: "User",
  },
  content:
    "I'm having trouble with CSS layouts. fix thisI'm having trouble with CSS layouts. fix thisI'm having trouble with CSS layouts. fix this?",
};
const msg1 = {
  sender: {
    _id: "chatgpt",
    name: "chatgpt",
  },
  content:
    "In CSS, when an element's width is set to 哈哈哈哈 a value greater than its parent's width, it can cause the element to overflow its parent container, potentially leading to layout issues and disrupting the visual appearance of the page. To handle such situations, you can employ various techniques to ensure a consistent and well-structured layout.",
};
const msgs = [msg0, msg1, msg1, msg0, msg1, msg1, msg1, msg1];

const Chat = () => {
  /**
   * @typedef UserObject
   * @property {string} _id
   * @property {string} name
   *
   */
  /**
   * @typedef MessageObject
   * @property {UserObject} sender
   * @property {string} content
   */
  return (
    <div className="u-flexColumn Chat-warpper">
      <div className=" Chat-historyContainer u-flexColumn">
        {msgs.map((msg, index) => (
          <SingleMessage key={index} userId="user" message={msg} />
        ))}
      </div>
      <div className="u-flex u-flex-justifyCenter">
        <div className="Chat-input"> input here </div>
      </div>
    </div>
  );
};

export default Chat;
