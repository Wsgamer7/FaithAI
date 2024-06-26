import React, { useEffect, useState, useRef } from "react";
import SingleMessage from "./SingleMessage";
import { NewMessage } from "./NewInput";
import { get, post } from "../../utilities";
import "./Chat.css";
//todo: change defalut_msgs
const msg0 = {
  sender_id: "user",
  recipient_id: "chatgpt",
  content:
    "I'm having trouble with CSS layouts. fix thisI'm having trouble with CSS layouts. fix thisI'm having trouble with CSS layouts. fix this?",
};
const msg1 = {
  sender_id: "chatgpt",
  recipient_id: "user",
  content:
    "In CSS, when an element's width is set to 哈哈哈哈 a value greater than its parent's width, it can cause the element to overflow its parent container, potentially leading to layout issues and disrupting the visual appearance of the page. To handle such situations, you can employ various techniques to ensure a consistent and well-structured layout.",
};
const defalut_msgs = [msg0, msg1, msg1, msg0, msg1, msg1];

/**
 * @param {string} userId
 */
const Chat = ({ userId }) => {
  /**
   * @typedef MessageObject
   * @property {string} sender_id
   * @property {string} recipient_id
   * @property {string} content
   */
  const [msgs, setMsgs] = useState([]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    console.log("userId:" + userId);
    if (userId == undefined) {
      setMsgs(defalut_msgs);
    } else {
      get("/api/messages").then((messages) => {
        setMsgs(messages);
      });
    }
  }, [userId]);
  const addNewMessage = (newMessage) => {
    setMsgs((prevMsgs) => [...prevMsgs, newMessage]);
  };
  // Scroll to bottom when msgs change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      duration: 500,
    });
  }, [msgs]);

  return (
    <div className="u-flexColumn Chat-warpper">
      <div className=" Chat-historyContainer u-flexColumn">
        {msgs.map((msg, index) => (
          <SingleMessage key={index} userId={userId} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="Chat-input ">
        <NewMessage userId={userId} addNewMessage={addNewMessage} />
      </div>
    </div>
  );
};

export default Chat;
