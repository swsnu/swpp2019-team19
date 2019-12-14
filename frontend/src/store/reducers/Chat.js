
import {
  SEND_QUESTION, RCV_QUESTION, CLEAR_CHAT_HISTORY, CHAT_CATEGORY,
} from '../actions/types';

const initialState = {
  chatHistory: [],
  engCategory: [],
  korCategory: [],
};
const defaultAction = { type: 'default' };

export default function (state = initialState, action = defaultAction) {
  switch (action.type) {
    case RCV_QUESTION: {
      const rcv = action.message.map((response) => ({
        from: 'bot',
        message: response.text === undefined
          ? { image: response.image } : { text: response.text },
      }));
      return { ...state, chatHistory: state.chatHistory.concat(rcv) };
    }
    case SEND_QUESTION: {
      const updateChatHistory = JSON.parse(JSON.stringify(state.chatHistory));
      updateChatHistory.push({ from: 'user', message: action.message });
      return { ...state, chatHistory: updateChatHistory };
    }
    case CLEAR_CHAT_HISTORY: {
      const clearChatHistory = [];
      return { ...state, chatHistory: clearChatHistory };
    }
    case CHAT_CATEGORY: {
      return { ...state, engCategory: action.category[0], korCategory: action.category[1] };
    }
    default:
      return state;
  }
}
