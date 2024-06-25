import React, { useEffect, useState } from "react";
import SingleDoc from "./SingleDoc";
import { PopUpInput } from "./NewInput";

import "./Doc.css";
import { get, post } from "../../utilities";

const doc1 = {
  _id: "doc1",
  content: "This is the first document哈哈哈哈哈哈哈哈哈",
};
const doc2 = {
  _id: "doc2",
  content: "second document",
};
const docs_default = [doc1, doc2];
const findIndexInDocs = (docs, aDoc) => {
  return docs.findIndex((doc) => doc._id === aDoc._id);
};
/**
 * @param {string} userId
 */
const Doc = ({ userId }) => {
  const [docs, setDocs] = useState(docs_default);

  useEffect(() => {
    // fetch docs from server
    if (!userId) {
      setDocs(docs_default);
      return;
    }
    get("/api/documents").then((alldocs) => {
      console.log(alldocs);
      setDocs(alldocs);
    });
  }, [userId]);

  const updateADoc = (aDoc, content) => {
    if (!userId) {
      return;
    }
    const body = { document_id: aDoc._id, content: content };
    post("/api/updateDocument", body).then(() => {
      const aDocId = findIndexInDocs(docs, aDoc);
      if (aDocId === -1) {
        return;
      }
      const updatedDoc = { ...docs[aDocId], content: content };
      setDocs([...docs.slice(0, aDocId), updatedDoc, ...docs.slice(aDocId + 1)]);
    });
  };

  const addADoc = (content) => {
    if (!userId) {
      return;
    }
    const body = { content: content };
    post("/api/document", body).then((newDoc) => {
      setDocs([...docs, newDoc]);
    });
  };
  const deleteADoc = (aDoc) => {
    if (!userId) {
      return;
    }
    const body = { document_id: aDoc._id };
    post("/api/deleteDocument", body).then(() => {
      const aDocId = findIndexInDocs(docs, aDoc);
      if (aDocId === -1) {
        return;
      }
      setDocs([...docs.slice(0, aDocId), ...docs.slice(aDocId + 1)]);
    });
  };
  return (
    <div>
      <p className="Doc-title">文档</p>
      <p>SerchBar</p>
      <div className="u-flexColumn">
        <PopUpInput onSubmit={addADoc} defaultText={"11"} />
        {docs.map((aDoc, index) => (
          <SingleDoc key={index} aDoc={aDoc} updateADoc={updateADoc} deleteADoc={deleteADoc} />
        ))}
      </div>
    </div>
  );
};

export default Doc;
