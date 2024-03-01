import { FRIEND_REQUEST_FROM_OTHERS } from '../actionTypes'

const initialState = {
    f_request_from: []
}

export const friendReducer = (state = initialState, action) => {
    switch (action.type) {
        case FRIEND_REQUEST_FROM_OTHERS:
            return {
                ...state,
                f_request_from: action.payload
            }
        default:
            return state;
    }
}