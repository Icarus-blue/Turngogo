import {
  API_REQUEST,
  ERROR_RESPONSE,
  GET_FLEXERS,
  GET_FRIENDREQUEST,
  SET_COMMON_STATUS,
  SET_NUM_FRIENDS,
  SET_NUM_MESSAGES,
  SKIP_INTRO,
  SUCCESS_RESPONSE,
  SET_GYMDETAIL,
  SET_GYMDETAIL_BY_ID,
  GET_WALLET_AMOUNT,
  SET_LOCALGYM_ID
} from "../actionTypes";

const initialState = {
  isLoading: false,
  error: false,
  message: "",
  skipIntro: false,
  flexers: {},
  friendRequests: {},
  unReadMessages: {},
  numMessages: 0,
  numFriends: 0,
  gymDetail: {},
  gymDetailById: {},
  getwalletamount: 0,
  getlocalgymid: ''
};

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FLEXERS:
      return {
        ...state,
        flexers: action.payload,
      };

    case GET_FRIENDREQUEST:
      return {
        ...state,
        friendRequests: action.payload,
      };
    case SET_NUM_MESSAGES:
      return {
        ...state,
        numMessages: action.payload.numMessages,
        unReadMessages: action.payload.unReadMessages,
      };
    case SET_NUM_FRIENDS:
      return {
        ...state,
        numFriends: action.payload,
      };

    case API_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        message: "",
      };
    case SUCCESS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: false,
        message: action.payload,
      };
    case ERROR_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload,
      };
    case SKIP_INTRO:
      return {
        ...state,
        skipIntro: action.payload,
      };
    case SET_COMMON_STATUS:
      return {
        ...state,
        isLoading: action.payload[0],
        error: action.payload[1],
        message: action.payload[2],
      };
    case SET_GYMDETAIL:
      return {
        ...state,
        gymDetail: action.payload,

      };
    case SET_GYMDETAIL_BY_ID:
      return {
        ...state,
        gymDetailById: action.payload,

      };
    case GET_WALLET_AMOUNT:
      return {
        ...state,
        getwalletamount: action.payload
      }
    case SET_LOCALGYM_ID:
      return {
        ...state,
        getlocalgymid: action.payload
      }
    default:
      return state;
  }
};
