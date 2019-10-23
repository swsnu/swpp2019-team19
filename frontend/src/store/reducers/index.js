import { combineReducers } from "redux";
import articleReducer from "./Article";
import chatReducer from "./Chat";
import userReducer from "./User";

export default combineReducers({
  article: articleReducer,
  chat: chatReducer,
  user: userReducer
});
