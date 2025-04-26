
import React, { useEffect } from 'react';
import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom';
import ChatRoom from './ChatRoom';
import Login from './pages/Login';
import Signup from './pages/Sigup';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from'./redux/features/socketSlice';
import MekoLandingPage from'./pages/MekoLandingPage';

function App() {
  const user = useSelector((store) => store.user.user);
console.log("app=",user);
const dispatch=useDispatch();

useEffect(() => {
  if (user._id==='') return ()=>{'nahi hoya call'}; // jab tak user nahi login, tab tak wait karo

  const newSocket = io(`${import.meta.env.VITE_FRONTEND_URL}`, {
    query: {
      userId: user._id, // <-- user ki id bhej rahe ho connection ke time
    },

  });
  console.log('call ho gya')
  dispatch(setSocket(newSocket));
  return () => newSocket.disconnect();
},[user, dispatch]);



  return (
      <div>
        <Routes>
        <Route path="/" element={<MekoLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
      </div>
  );
}

export default App;
