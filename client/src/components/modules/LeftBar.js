import React from "react";

import "./LeftBar.css";
import Doc from "./Doc";

/**
 * @param {string} userId
 */
const LeftBar = ({ userId }) => {
  return (
    <div className="LeftBar-container">
      <Doc userId={userId} />
    </div>
  );
};
export default LeftBar;
