import React, { useEffect } from "react";
import { useDataContext } from "../context/data_context";

export const Alert = ({ clearFields }) => {
  const { clearMessage, msg } = useDataContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      clearMessage();
      clearFields();
    }, 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="alert alert-success" role="alert">
      {msg}
    </div>
  );
};
