import { api } from "../../api";
import jwtDecode from "jwt-decode";
import {
  GET_CURRENT_USER,
  GET_FLEXERS,
  GET_FRIENDREQUEST,
  SET_COMMON_STATUS,
  SET_NUM_FRIENDS,
  SET_NUM_MESSAGES,
  SET_NUM_MESSAGE_NOTIFICATION,
  SET_GYMDETAIL,
  GET_GYM_BY_ID,
  SET_GYMDETAIL_BY_ID
} from "../actionTypes";
import { storage } from "../../utils/storage";
import Toast from "react-native-toast-message";



export const getUser = (id) => async (dispatch) => {
  try {
    const res = await api.getUser(id);
    dispatch({ type: GET_CURRENT_USER, payload: res.data.user });
  } catch (err) {
    Toast.show({
      type: "error",
      text1: "Server error",
      text2: err.response.data.message,
    });
    dispatch({
      type: SET_COMMON_STATUS,
      payload: [false, true, err.response.data.message],
    });
  }
};

export const getFlexers = (id) => async (dispatch) => {
  try {
    const res = await api.getUsers();
    const arr = res.data.users.filter((item) => item._id !== id);
    dispatch({ type: GET_FLEXERS, payload: arr });
  } catch (err) {
    dispatch({
      type: SET_COMMON_STATUS,
      payload: [false, true, err.response.data.message],
    });
  }
};

export const getfriendrequests = () => async (dispatch) => {
  try {

    const res = await api.getfriendrequests()
    dispatch({ type: GET_FRIENDREQUEST, payload: res.data.data });

  } catch (err) {
    console.log('getFriendRequests Dispatch Error->', err)
    dispatch({
      type: SET_COMMON_STATUS,
      payload: [false, true, err.response.data.message],
    });
  }
};

export const setNumMessages = (data) => async (dispatch) => {
  try {
    // console.log('Current Message Num->', numMessages)
    let numMessages = 0;
    for await (let numMessage of data) {
      numMessages += numMessage.num
    }
    dispatch({ type: SET_NUM_MESSAGES, payload: { numMessages: numMessages, unReadMessages: data } });
    // dispatch({ type: SET_NUM_MESSAGES, payload: { numMessages: numMessages, unReadMessages: data } });
  } catch (err) {
    console.log(err)
  }
};

export const setNumFriends = (friendRequests) => async (dispatch) => {
  try {
    let numNotification = friendRequests.length;
    dispatch({ type: SET_NUM_FRIENDS, payload: numNotification });
  } catch (err) {
    console.log(err)
  }
};

export const setMessageNotification = (numMessages) => async (dispatch) => {
  try {
    let numNotification = 0;
    for await (let numMessage of numMessages) {
      numNotification += numMessage.num
    }
    dispatch({ type: SET_NUM_MESSAGE_NOTIFICATION, payload: numNotification });
  } catch (err) {
    console.log(err)
  }
};

export const getGymAction = () => async (dispatch) => {
  const res = await api.getGymDetail();
  dispatch({ type: SET_GYMDETAIL, payload: res.data.gyms });
}

export const getGymByID = (id) => async (dispatch) => {
  const res = await api.getGymDetailByID(id);
  dispatch({ type: SET_GYMDETAIL_BY_ID, payload: res.data.gym });
}