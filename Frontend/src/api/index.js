import axios from "axios";
import { useDispatch } from "react-redux";
import {
  API_REQUEST,
  ERROR_RESPONSE,
  LOGIN_FALIED,
  SET_COMMON_STATUS,
  SUCCESS_RESPONSE,
} from "../redux/actionTypes";
import { storage } from "../utils/storage";
import { store } from "../redux/store";

// export const SERVER_URL = "https://dev.api.fitnest.app"
export const SERVER_URL = "http://localhost:5000";

const jwtInterceoptor = axios.create({});

jwtInterceoptor.interceptors.request.use(async (config) => {
  store.dispatch({ type: API_REQUEST });

  let tokens = await storage.getItem("tokens");
  // console.log("token------------->",tokens);
  if (tokens && tokens.accessToken)
    config.headers.set("Authorization", `Bearer ${tokens.accessToken}`);
  return config;
});

jwtInterceoptor.interceptors.response.use(
  (response) => {
    store.dispatch({ type: SUCCESS_RESPONSE, payload: "success" });
    return response;
  },
  async (error) => {
    console.log("error-------", error.response.status);
    console.log(error.response.data.message);
    store.dispatch({ type: ERROR_RESPONSE, payload: "error" });
    try {
      if (error.response.status === 401) {
        const tokens = await storage.getItem("tokens");

        if (tokens && tokens.accessToken && tokens.refreshToken) {
          const payload = {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          };
          let apiResponse = await axios.post(
            `${SERVER_URL}/api/auth/refreshtoken`,
            payload
          );
          await storage.setItem("tokens", apiResponse.data.tokens);
          error.config.headers.set(
            "Authorization",
            `Bearer ${apiResponse.data.tokens.accessToken}`
          );
        }
        return axios(error.config);
      } else {
        // await storage.removeItem("tokens");
        return Promise.reject(error);
      }
    } catch (e) {
      if (error.response.status == 401) store.dispatch({ type: LOGIN_FALIED });
      console.log(e);
    }
  }
);


const login = (data) => axios.post(`${SERVER_URL}/api/auth/login`, data);
const loginGoogle = (data) => axios.post(`${SERVER_URL}/api/auth/loginGoogle`, data);
const signup = (data) => {
  console.log("singup_process");
  return jwtInterceoptor.post(`${SERVER_URL}/api/auth/register`, data);
}
const signupGoogle = (data) => jwtInterceoptor.post(`${SERVER_URL}/api/auth/registerGoogle`, data);
const verifyOtp = (otpCode) => jwtInterceoptor.put(`${SERVER_URL}/api/auth/verify-otp/${otpCode}`);
const resendOtpEmail = (email) => axios.put(`${SERVER_URL}/api/auth/resend-otp-email/${email}`);
const updateUser = (id, data) => jwtInterceoptor.post(`${SERVER_URL}/api/user/${id}`, data);
const updateProfile = (data) => jwtInterceoptor.post(`${SERVER_URL}/api/user/update`, data, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});


const createProfile = (data) => jwtInterceoptor.post(`${SERVER_URL}/api/profile/`, data);
const getQuestions = () => jwtInterceoptor.get(`${SERVER_URL}/api/question`);
const getUser = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/user/${id}/get`);
const getUsers = () => jwtInterceoptor.get(`${SERVER_URL}/api/user/all`);
const getProfile = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/profile/${id}`);

// Chat

const createGroup = (data) => jwtInterceoptor.post(`${SERVER_URL}/api/chat/createGroup`, data);
const removeFromGroup = (data) => jwtInterceoptor.post(`${SERVER_URL}/api/chat/removeFromGroup`, data);
const renameGroup = (data) => jwtInterceoptor.post(`${SERVER_URL}/api/chat/renameGroup`, data);
const addUserToGroup = (data) => jwtInterceoptor.post(`${SERVER_URL}/api/chat/addUserToGroup`, data);

const getChats = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/chat/chats/${id}`);
const getChat = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/chat/${id}`);

const getMessage = (data) => jwtInterceoptor.post(`${SERVER_URL}/api/message/getmessage`, data);
const unreadNumMessage = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/message/unread/${id}`);
const sendMessage = (data) => jwtInterceoptor.post(`${SERVER_URL}/api/message/`, data);
const getAllChat = () => jwtInterceoptor.get(`${SERVER_URL}/api/message/all`);

// Friend
const sendfriendrequest = (id) => jwtInterceoptor.post(`${SERVER_URL}/api/user/sendfriendrequest/${id}`);
const getfriendrequest = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/user/getfriendrequest/${id}`);
const getfriendrequests = () => jwtInterceoptor.get(`${SERVER_URL}/api/user/getfriendrequests`);
const acceptfriendrequest = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/user/acceptfriendrequest/${id}`);
const rejectfriendrequest = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/user/rejectfriendrequest/${id}`);
const unfriend = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/user/unfriend/${id}`);

// Gym
const getGymDetail = () => {
  return jwtInterceoptor.get(`${SERVER_URL}/api/gym/getallgym`)
}

const getGymDetailByID = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/gym/${id}`)
const registerLocalgym = (data) => jwtInterceoptor.post(`${SERVER_URL}/api/localgymRegister/`, data)
const sendRequestToLocalGymAdmin = (id) => jwtInterceoptor.post(`${SERVER_URL}/api/gym/registerlocalgym/${id}`)
const deposite = (data) => jwtInterceoptor.post(`${SERVER_URL}/api/payment/`, data);

const payToLocalGym = (data) => jwtInterceoptor.post(`${SERVER_URL}/api/payment/payforservice`, data);

const getActivities = () => jwtInterceoptor.get(`${SERVER_URL}/api/activity`);


export const api = {
  login,
  loginGoogle,
  signup,
  signupGoogle,
  verifyOtp,
  resendOtpEmail,
  updateProfile,
  updateUser,
  getQuestions,
  getUser,
  getUsers,
  getProfile,
  createProfile,

  createGroup,
  removeFromGroup,
  renameGroup,
  addUserToGroup,

  getChats,
  getChat,

  getMessage,
  sendMessage,
  unreadNumMessage,

  sendfriendrequest,
  getfriendrequest,
  getfriendrequests,
  acceptfriendrequest,
  rejectfriendrequest,
  unfriend,
  getGymDetail,
  getGymDetailByID,
  registerLocalgym,


  sendRequestToLocalGymAdmin,
  deposite,
  payToLocalGym,

  getActivities,
  getAllChat
};
