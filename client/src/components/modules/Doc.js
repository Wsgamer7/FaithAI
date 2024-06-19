import React from "react";
import SingleDoc from "./SingleDoc";

import "./Doc.css";

const doc1 = {
  content: "This is the first document哈哈哈哈哈哈哈哈哈",
};
const doc2 = {
  content: "second document",
};
const docs = [doc1, doc2];

const Doc = () => {
  return (
    <div>
      <p className="Doc-title">文档</p>
      <p>SerchBar</p>
      <div className="u-flexColumn">
        {docs.map((aDoc, index) => (
          <SingleDoc key={index} aDoc={aDoc} />
        ))}
      </div>
    </div>
  );
};

export default Doc;
