
import { SEND_QUESTION } from '../actions/types';

const initialState = {
  chatHistory: [],
};
const defaultAction = { type: 'default' };

export default function (state = initialState, action = defaultAction) {
  if (action.type === SEND_QUESTION) {
    const updateChatHistory = initialState.chatHistory;
    updateChatHistory.push({ 'from': 'user', 'message': action.userMessage });
    console.log(action.botMessage);
    action.botMessage.map((response) => {
      updateChatHistory.push({ 'from': 'bot', 'message': response.text });
    });
    return { ...state, chatHistory: updateChatHistory };
  }
  else {
    return { ...state };
  }
}

