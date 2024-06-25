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
    const newMsgLocal = {
      sender_id: userId,
      recipient_id: recipient_id,
      content: value,
    };
    addNewMessage(newMsgLocal);
    const body = { recipient_id: recipient_id, content: value };
    post("/api/message", body).then((bot_res_message) => {
      addNewMessage(bot_res_message);
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

/**
 * @param {(string) => {}} onSubmit
 * @param {string} defaultText
 */
const PopUpInput = ({ onSubmit, defaultText }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [value, setValue] = useState(defaultText);
  // called whenever the user types in the new post input box
  const handleOpenPopup = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting", value);
    onSubmit(value);
    setValue("");
    handleClosePopup();
  };
  return (
    <div>
      <button onClick={handleOpenPopup}>Popup</button>
      {showPopup && (
        <div className="NewInput-popup">
          <div className="NewInput-popup-inner">
            <input type="text" value={value} onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
export { NewMessage, PopUpInput };
