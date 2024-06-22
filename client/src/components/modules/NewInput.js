import React, { useState } from "react";
import { post } from "../../utilities";

import "./NewInput.css";

/**
 * New message input
 * @param {string} userId
 * @param {({sender_id: string, recipient_id: string, content: string})=> void} addNewMessage
 */
const NewMessage = ({ userId, addNewMessage }) => {
  const recipient_id = "chatgpt";
  const sendMessage = (value) => {
    const body = { recipient_id: recipient_id, content: value };
    post("/api/message", body).then((message) => {
      addNewMessage(message);
    });
  };

  const [value, setValue] = useState("");
  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(value);
    setValue("");
  };
  let defaultText = "少年，说出你的疑问";
  if (!userId) {
    defaultText = "请登录";
  }
  return (
    <div className="u-flex u-flex-justifyCenter">
      <input
        type="text"
        placeholder={defaultText}
        value={value}
        onChange={handleChange}
        disabled={!userId}
        className="NewInput-messageContext"
      />
      <button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export { NewMessage };
