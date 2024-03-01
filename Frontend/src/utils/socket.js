import io from 'socket.io-client';
import { addFriendRequest } from '../redux/actions/friendRequestAction';
import { showToast } from '../components/ShowToast';
import { useDispatch, useSelector } from 'react-redux';
import { FRIEND_REQUEST_FROM_OTHERS, ONLINE_USERS } from '../redux/actionTypes'

const socket = io('http://localhost:5000');

const SocketWrapper = () => {
    const dispatch = useDispatch();
    const { f_request_from } = useSelector((state) => state.friend)

    // Friend Request Socket 
    socket.on('sendFriendRequest', (friendRequest) => {
        showToast(
            'success',
            'Friend Request',
            `You received friend request from ${friendRequest.name}`
        );
        const fr_Arr = [...f_request_from, friendRequest];
        dispatch({ type: FRIEND_REQUEST_FROM_OTHERS, payload: fr_Arr });
    });

    socket.on('acceptedFriendrequest', (data) => {
        showToast('success', 'Friend Request Accepted', `Your friend request already accepted by ${data.name}`)
    })

    socket.on('declinedFriendrequest', (data) => {
        showToast('error', 'Friend Request Declined', `Your friend request  denied by ${data.name}`)
    })

    // End of Friend Request Socket

    // 
    socket.on('onlineusers', (data) => {
        console.log("onlineusers here", data.onlineUsers);
        dispatch({ type: ONLINE_USERS, payload: data.onlineUsers })
    })

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    return null;
};

export { socket, SocketWrapper };