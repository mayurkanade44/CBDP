import React from "react";
import { useDataContext } from "../context/data_context";

export const Table = ({ name, file, attachingFile }) => {
  const { docs } = useDataContext();
  const doc = file;
  const att = "fl_attachment/";

  const addStr = (str, index, stringToAdd) => {
    return (
      str.substring(0, index) + stringToAdd + str.substring(index, str.length)
    );
  };

  return (
    <table className="table table-bordered border-dark">
      <thead>
        <tr>
          <th className="text-center">{name}</th>
        </tr>
      </thead>
      <tbody>
        {docs.length !== 0 &&
          doc.map((docs) => (
            <tr key={docs.id}>
              <td>
                <div className="row">
                  <div className="col-6">{docs.name}</div>
                  <div className="col-3">
                    <button className="btn btn-dark">
                      <a
                        style={{
                          textDecoration: "none",
                          color: "white",
                        }}
                        href={addStr(docs.file, 45, att)}
                      >
                        Download
                      </a>
                    </button>
                  </div>
                  <div className="col-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => attachingFile(docs.file, docs.name)}
                    >
                      Attach
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
