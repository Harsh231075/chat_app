import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/features/userSlice';
import fetchUserReducer from '../redux/features/fectUserSlice';
import selectedUserReducer from '../redux/features/selectedUserSlice';
import sendMessageReducer from '../redux/features/messageSlice';
import socketReducer from '../redux/features/socketSlice';
import onlineUsersReducer from '../redux/features/onlineSlice';
const store = configureStore({
    reducer: {
        user: userReducer,
        fetchUser: fetchUserReducer,
        selectedUser:selectedUserReducer,
        sendMessage:sendMessageReducer,
        socket:socketReducer,
        onlineUsers:onlineUsersReducer,
    },
});

export default store;
