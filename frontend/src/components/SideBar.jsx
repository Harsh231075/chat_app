import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from '../redux/features/selectedUserSlice'; 
import useFetchMassage from '../hooks/useFetchMassage';

export default function SideBar({ onUserClick }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchUser.users);
  const onlineUsers = useSelector((state) => state.onlineUsers.onlineUsers);
  const { fetchMessages } = useFetchMassage();
  // console.log("onlineUsers=",onlineUsers);
  const handleUserSelect = (user) => {
    dispatch(setSelectedUser(user));
    fetchMessages(user._id);
    if (onUserClick) onUserClick(); 
  };

  const isUserOnline = (userId) => {
    if(onlineUsers === null) return false;
    else return onlineUsers.includes(userId);
  };

  return (
    <div className="fixed md:relative inset-0 md:inset-auto z-50 md:z-0 bg-white w-full md:w-[300px] h-full overflow-y-auto border-r border-gray-200 shadow-lg">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
      </div>

      {/* User List */}
      <div className="h-[calc(100vh-64px)] overflow-y-auto">
        {data && data.map((user) => (
          <div
            key={user._id}
            className="flex items-center px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all border-b border-gray-100 last:border-b-0"
            onClick={() => handleUserSelect(user)}
          >
            <div className="relative">
              <img 
                src={user.profilePhoto} 
                alt={user.fullName}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              {isUserOnline(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              )}
            </div>

            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{user.fullName}</h3>
                <span className="text-xs text-gray-500">12:45 PM</span>
              </div>
              <div className="flex items-center mt-1">
                <p className="text-sm text-gray-500 truncate">@{user.userName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
