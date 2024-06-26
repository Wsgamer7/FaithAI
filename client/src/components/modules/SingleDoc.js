import React, { useState } from "react";
import { PopUpButton } from "./NewInput";
import "./SingleDoc.css";

/**
 * @param aDoc
 * @param updateADoc
 * @param deleteADoc
 */
const SingleDoc = ({ aDoc, updateADoc, deleteADoc }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  console.log(updateADoc);
  const updateTheDoc = (content) => {
    console.log("updating", aDoc.content);
    updateADoc(aDoc, content);
  };
  const deleteTheDoc = () => {
    console.log("deleting", aDoc.content);
    deleteADoc(aDoc);
  };
  return (
    <div
      className="SingleDoc-container u-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="u-flex">
        <div className="SingleDoc-docIcon" />
        <p className="SingleDoc-content">{aDoc.content}</p>
      </div>
      {isHovering && (
        <div className="u-flex SingleDoc-buttonContainer">
          <PopUpButton onSubmit={updateTheDoc} defaultText={aDoc.content} isAddDoc={false} />
          <div className="SingleDoc-deleteButton" onClick={deleteTheDoc} />
        </div>
      )}
      {/* <div className="SingleDoc-moreIcon" /> */}
    </div>
  );
};

export default SingleDoc;
