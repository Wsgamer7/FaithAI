import React from "react";
import "./SingleMessage.css";
/**
 * Proptypes
 * @param {string} userId
 * @param {MessageObject} message
 */
const SingleMessage = (props) => {
  const userMsgField = (
    <div className="u-flex u-flex-justifyCenter">
      <div className="SingleMessage-container">
        <div className="u-flex SingleMessage-user--container">
          <div className="SingleMessage-content SingleMessage-user--content">
            {props.message.content}
          </div>
        </div>
      </div>
    </div>
  );
  const botMsgField = (
    <div className="u-flex u-flex-justifyCenter">
      <div className="u-flex SingleMessage-container">
        <div className="SingleMessage-avater--container">
          <div className="SingleMessage-avater" />
        </div>
        <div className="u-flexColumn">
          {/* _id of bot is its name */}
          <div className="SingleMessage-senderName">{props.message.sender_id}</div>
          <div className="SingleMessage-content">{props.message.content}</div>
        </div>
      </div>
    </div>
  );
  if (props.message.sender_id == "chatgpt") {
    return botMsgField;
  }
  return userMsgField;
};

export default SingleMessage;
