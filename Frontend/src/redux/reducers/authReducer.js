import {
  LOGIN_FALIED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_USER,
  LOG_OUT,
  GET_FLEXERS,
  GET_FRIENDREQUEST,
  GET_CURRENT_USER,
  SET_NUM_MESSAGE,
  SET_NUM_NOTIFICATION,
} from "../actionTypes";

const initialState = {
  currentUser: {},
  
  profile: {},
  isLoggedin: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        currentUser: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedin: true,
        currentUser: action.payload,
      };
    case LOGIN_FALIED:
      return {
        ...state,
        isLoggedin: false,
        currentUser: null,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

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
    case SET_NUM_MESSAGE:
      return {
        ...state,
        numMessages: action.payload,
      };
    case SET_NUM_NOTIFICATION:
      return {
        ...state,
        numNotification: action.payload,
      };
    case LOG_OUT:
      return {
        initialState,
      };
    default:
      return state;
  }
};
