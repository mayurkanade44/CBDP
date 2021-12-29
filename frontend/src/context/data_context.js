import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import reducer from "./data_reducer";

const DataContext = createContext();

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: localStorage.getItem("user"),
  data: [],
  docs: [],
  loading: false,
  msg: "",
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const url = "https://cbdpapi.herokuapp.com";

  const login = async (username, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${url}/api/login/`,
        { username: username, password: password },
        config
      );
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: error.response.data.detail,
      });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.get(`${url}/api/services/`, config);
      dispatch({
        type: "DATA_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "DATA_FAIL",
        payload: error.response.data.detail,
      });
    }
  };

  const fetchDocuments = async (id) => {
    dispatch({ type: "LOADING" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`${url}/api/services/${id}/`, config);
      dispatch({
        type: "DOCUMENTS_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmail = async (email, files, names) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.post(
        `${url}/api/email/`,
        {
          email: email,
          files: files,
          names: names,
        },
        config
      );
      dispatch({
        type: "EMAIL",
        payload: res.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const clearMessage = () => {
    dispatch({
      type: "CLEAR MESSAGE",
    });
  };

  return (
    <DataContext.Provider
      value={{ ...state, fetchData, fetchDocuments, login, logout, sendEmail, clearMessage }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
