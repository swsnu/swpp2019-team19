import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  VALIDATE_USERNAME,
  VALIDATE_USER_ID,
  CHANGE_INFO
} from "./types";
import axios from "axios";

const remote_url = "http://localhost:8000";

// TODO
export const signin = (username, password) => dispatch => {
  axios.post(remote_url + "/signin").then(res => {});
};
export const signout = () => dispatch => {};
export const signup = (email, username, password) => dispatch => {};
export const validateUsername = username => dispatch => {};
export const validateUserID = email => dispatch => {};
export const changeInfo = (username, password) => dispatch => {};
