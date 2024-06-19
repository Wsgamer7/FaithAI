import React from "react";
import "./SingleDoc.css";
const SingleDoc = (props) => {
  return (
    <div className="SingleDoc-container u-flex">
      <div className="SingleDoc-docIcon" />
      <p className="SingleDoc-content">{props.aDoc.content}</p>
      <div className="SingleDoc-moreIcon" />
    </div>
  );
};

export default SingleDoc;
