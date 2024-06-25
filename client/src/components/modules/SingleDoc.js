import React from "react";
import { PopUpInput } from "./NewInput";
import "./SingleDoc.css";

/**
 * @param aDoc
 * @param updateADoc
 * @param deleteADoc
 */
const SingleDoc = ({ aDoc, updateADoc, deleteADoc }) => {
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
    <div className="SingleDoc-container u-flex">
      <div className="SingleDoc-docIcon" />
      <p className="SingleDoc-content">{aDoc.content}</p>
      <PopUpInput onSubmit={updateTheDoc} defaultText={aDoc.content} />
      <button className="SingleDoc-deleteButton" onClick={deleteTheDoc}>
        X
      </button>
      {/* <div className="SingleDoc-moreIcon" /> */}
    </div>
  );
};

export default SingleDoc;
