import { api } from "../../api";
import jwtDecode from "jwt-decode";
import {
  GET_CURRENT_USER,
  GET_FLEXERS,
  GET_FRIENDREQUEST,
  LOGIN_FALIED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
  SET_COMMON_STATUS,
  SET_NUM_MESSAGE,
  SET_NUM_NOTIFICATION,
  UPDATE_PROFILE,
  UPDATE_USER,
  GET_WALLET_AMOUNT
} from "../actionTypes";
import { storage } from "../../utils/storage";
import Toast from "react-native-toast-message";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const res = await api.login(data);
    await storage.setItem("tokens", res.data.tokens);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
    dispatch({ type: GET_WALLET_AMOUNT, payload: res.data.user.wallet ? res.data.user.wallet.amount : 0 });
    return res;
  } catch (err) {
    dispatch({ type: LOGIN_FALIED });
    dispatch({
      type: SET_COMMON_STATUS,
      payload: [false, true, err.response.data.message],
    });
  }
};

export const loginGoogle = (data) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const res = await api.loginGoogle(data);
    await storage.setItem("tokens", res.data.tokens);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });

  } catch (err) {
    dispatch({ type: LOGIN_FALIED });
    dispatch({
      type: SET_COMMON_STATUS,
      payload: [false, true, err.response.data.message],
    });
  }
};

export const verifyOtp = (otp, setVisible) => async (dispatch) => {
  try {
    const res = await api.verifyOtp(otp);
    const user = jwtDecode(res.data.tokens.accessToken);
    await storage.setItem("tokens", res.data.tokens);
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    setVisible(true);
  } catch (err) {
    Toast.show({
      type: "error",
      text1: "OTP is incorrect",
      text2: "Please provide correct 4 digits.",
    });
    dispatch({
      type: SET_COMMON_STATUS,
      payload: [false, true, err.response.data.message],
    });
  }
};

export const updateProfile = (id, data, navigation) => async (dispatch) => {
  try {
    const res = await api.updateProfile(id, data);
    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
    navigation.navigate("Home");
  } catch (err) {
    Toast.show({
      type: "error",
      text1: "Server error",
      text2: "Please check your internet connection.",
    });
    dispatch({
      type: SET_COMMON_STATUS,
      payload: [false, true, err.response.data.message],
    });
  }
};

export const createProfile = (data) => async (dispatch) => {
  try {
    const res = await api.createProfile(data);
    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
  } catch (err) {
    dispatch({
      type: SET_COMMON_STATUS,
      payload: [false, true, err.response.data.message],
    });
  }
};

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

export const getFlexers = () => async (dispatch) => {
  try {
    const res = await api.getUsers();

    dispatch({ type: GET_FLEXERS, payload: res.data.users });
  } catch (err) {
    dispatch({
      type: SET_COMMON_STATUS,
      payload: [false, true, err.response.data.message],
    });
  }
};

export const getfriendrequests = (data) => async (dispatch) => {
  try {

    const res = await api.getfriendrequests(data)
    dispatch({ type: GET_FRIENDREQUEST, payload: res.data });

  } catch (err) {
    dispatch({
      type: SET_COMMON_STATUS,
      payload: [false, true, err.response.data.message],
    });
  }
};

export const setNumMessage = (data) => async (dispatch) => {
  try {

    dispatch({ type: SET_NUM_MESSAGE, payload: data });

  } catch (err) {
    dispatch({
      type: SET_COMMON_STATUS,
      payload: [false, true, err.response.data.message],
    });
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  try {
    const res = await api.updateUser(id, data);
    dispatch({ type: UPDATE_USER, payload: res.data.user });
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

export const setNumNotification = (numMessages, friendRequests) => async (dispatch) => {
  try {
    let numNotification = 0;
    for await (let numMessage of numMessages) {
      numNotification += numMessage.num
    }
    numNotification += friendRequests.length
    dispatch({ type: SET_NUM_NOTIFICATION, payload: numNotification });
  } catch (err) {
    console.log(err)
  }
};

export const getProfile = (id) => async (dispatch) => {
  try {
    const res = await api.getProfile(id);
    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
  } catch (err) {
    dispatch({
      type: SET_COMMON_STATUS,
      payload: [false, true, err.response.data.message],
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOG_OUT });
  } catch (err) {
    console.log(err);
  }
};
