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
    if (value) {
      sendMessage(value);
    }
    setValue("");
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };
  let defaultText = "少年，说出你的疑问";
  if (!userId) {
    defaultText = "请登录";
  }
  return (
    <div className="u-flex u-flex-justifyCenter .u-relative">
      <input
        type="text"
        placeholder={defaultText}
        value={value}
        onKeyDown={handleKeyPress}
        onChange={handleChange}
        disabled={!userId}
        className="NewInput-messageContext"
      />
      <div className="NewPostInput-sender" onClick={handleSubmit}></div>
    </div>
  );
};

const PopUpButton = ({ onSubmit, defaultText, isAddDoc }) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleOpenPopup = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div>
      {isAddDoc ? (
        <div onClick={handleOpenPopup} className="NewInput-addButton">
          + 新文档
        </div>
      ) : (
        <div onClick={handleOpenPopup} className="NewInput-renameButton" />
      )}
      {showPopup && (
        <PopUpInput
          onSubmit={onSubmit}
          defaultText={defaultText}
          handleClosePopup={handleClosePopup}
        />
      )}
    </div>
  );
};

/**
 * @param {(string) => {}} onSubmit
 * @param {string} defaultText
 */
const PopUpInput = ({ onSubmit, defaultText, handleClosePopup }) => {
  const [value, setValue] = useState(defaultText);
  // called whenever the user types in the new post input box
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
    <div className="NewInput-popup">
      <div className="NewInput-popup-inner">
        <textarea type="text" value={value} onChange={handleChange} />
        <div className="NewInput-buttonContainer">
          <button onClick={handleSubmit}>提交</button>
          <button onClick={handleClosePopup}>关闭</button>
        </div>
      </div>
    </div>
  );
};
export { NewMessage, PopUpButton };
