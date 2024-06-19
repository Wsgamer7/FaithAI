import React from "react";
import "./SingleMessage.css";
/**
 * Proptypes
 * @param {string} user_id
 * @param {MessageObject} message
 */
const SingleMessage = (props) => {
  if (props.user_id == props.message.sender._id) {
    return (
      <div className="u-flex SingleMessage-user--container">
        <div className="SingleMessage-content SingleMessage-user--content">
          {props.message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`u-flex`}>
      <div className="SingleMessage-avater--container">
        <div className="SingleMessage-avater" />
      </div>
      <div className="u-flexColumn">
        <div className="SingleMessage-senderName">{props.message.sender.name}</div>
        <div className="SingleMessage-content">{props.message.content}</div>
      </div>
    </div>
  );
};

export default SingleMessage;
