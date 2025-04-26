import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

export default function Header() {
  const navigate = useNavigate();
  const selectedUser = useSelector((state) => state.selectedUser.selectedUser);
  const onlineUsers = useSelector((state) => state.onlineUsers.onlineUsers);

  const isUserOnline = onlineUsers?.includes(selectedUser?._id);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="bg-white shadow-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200">
            <img 
              src={selectedUser?.profilePhoto || "https://avatar.iran.liara.run/public/boy"} 
              alt={selectedUser?.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          {isUserOnline && (
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg">{selectedUser?.fullName || "Select a user"}</h2>
            {isUserOnline && (
              <span className="text-xs text-green-500 font-medium">online</span>
            )}
          </div>
          <p className="text-gray-600 text-sm">{selectedUser?.userName}</p>
        </div>
      </div>
      
      <button 
        onClick={handleLogout}
        className="md:hidden flex items-center gap-2 px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        <FiLogOut className="w-5 h-5" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  )
}
