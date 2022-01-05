import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { useDataContext } from "../context/data_context";
import { Alert } from "./Alert";
import { Loading } from "./Loading";
import { Table } from "./Table";

export const Documents = () => {
  const { id } = useParams();
  const { fetchDocuments, docs, sendEmail, msg, loading, send } =
    useDataContext();

  const [emailId, setEmailId] = useState("");
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    sendEmail(emailId, files, fileName);
  };

  const attachingFile = (file, name) => {
    setFiles((files) => [...files, file]);
    setFileName((names) => [...names, name]);
  };

  const clearFields = () => {
    setEmailId("");
    setFiles([]);
    setFileName([]);
  };

  useEffect(() => {
    fetchDocuments(id);
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="row">
          <div className="col-md-4">
            <Table
              name="Material Safty Data Sheet"
              file={docs.msds}
              attachingFile={attachingFile}
            />
          </div>
          <div className="col-md-4">
            <Table
              name="Technical Document"
              file={docs.tc}
              attachingFile={attachingFile}
            />
          </div>
          <div className="col-md-4">
            <Table
              name="Standard Operating Procedure"
              file={docs.sop}
              attachingFile={attachingFile}
            />
          </div>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              {msg && <Alert clearFields={clearFields} />}
              <form onSubmit={handleSubmit} style={{ marginTop: 30 }}>
                <label className="form-label">To Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.currentTarget.value)}
                  required
                />
                <label className="form-label">Files</label>
                <input
                  type="text"
                  className="form-control"
                  name="files"
                  value={fileName}
                  disabled
                />
                <button className="btn btn-primary my-3">
                  {send ? "sending...." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
