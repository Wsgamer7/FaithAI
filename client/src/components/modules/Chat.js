import React from "react";
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
const msgs = [msg0, msg1, msg1, msg1, msg1, msg1, msg1, msg1];

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
    <div className="Chat-container u-flexColumn">
      <div className="Chat-historyContainer u-flexColumn">
        {msgs.map((msg, index) => (
          <SingleMessage key={index} user_id="user" message={msg} />
        ))}
      </div>
      {/* {todo: "add input field here"} */}
      <h1>Input here</h1>
    </div>
  );
};

export default Chat;
