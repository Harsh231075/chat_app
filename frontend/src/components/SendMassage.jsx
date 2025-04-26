import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../redux/features/messageSlice';
import axios from 'axios';
import { setOnlineUsers } from '../redux/features/onlineSlice';

export default function SendMessage() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const selectedUser = useSelector((state) => state.selectedUser.selectedUser);
  const socket = useSelector((state) => state.socket.socket);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
  
    const token = localStorage.getItem('token');
  
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_FRONTEND_URL}/api/message/send`,
        {
          receiverId: selectedUser?._id,
          content: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const data = res.data.message;
  
      const formattedData = {
        ...data,
        senderId: { _id: data.senderId },
        receiverId: { _id: data.receiverId }
      };
  
      // Dispatch to Redux store (Optional, because socket will again send it)
      dispatch(addMessage(formattedData));
  
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  

  // Listen for incoming messages
  // Inside useEffect
React.useEffect(() => {
  if (socket) {
    socket.on('newMessage', (data) => {  // listen on 'newMessage'
    
      const formattedData = {
        ...data,
        senderId: { _id: data.senderId },
        receiverId: { _id: data.receiverId }
      };
      console.log('Received message:',formattedData);
      dispatch(addMessage(formattedData));
    });
    socket.on('getOnlineUsers', (data) => { 
      // console.log('Received online users:', data);
      dispatch(setOnlineUsers(data));
    })
    return () => {
      socket.off('newMessage');  // cleanup 'newMessage'
    };
  }
}, [socket, dispatch]);


  return (
    <div className="w-full px-4 py-3 bg-white border-t">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Send
        </button>
      </form>
    </div>
  );
}