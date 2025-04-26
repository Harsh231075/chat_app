import React, { useState } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Massage from "./components/Massage";
import useFetchUser from "./hooks/useFetchUser";

const ChatRoom = () => {
  useFetchUser();
  const [showChat, setShowChat] = useState(false);

  const handleUserClick = () => {
    setShowChat(true);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`${showChat ? 'hidden' : 'block'} md:block md:w-1/4`}>
        <SideBar onUserClick={handleUserClick} />
      </div>

      {/* Chat Area */}
      <div className={`${showChat ? 'block' : 'hidden'} md:flex flex-col w-full md:w-3/4`}>
        {/* Header */}
        <div className="">
          <Header />
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto  bg-gray-100">
          <Massage />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
