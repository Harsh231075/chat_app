import React, { useEffect, useRef } from 'react';
import SendMessage from './SendMassage';
import { useSelector } from 'react-redux';

export default function Massage() {
  const messages = useSelector((state) => state.sendMessage.messages);
  const user = useSelector((store) => store.user.user);
  const selectedUser = useSelector((state) => state.selectedUser.selectedUser);
  // console.log("user:", user);
  // console.log("selectedUser:", selectedUser);
  // Scroll to bottom refx
  const bottomRef = useRef(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!user || !selectedUser) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-180px)] bg-gray-50">
        <div className="animate-pulse text-lg font-medium text-gray-600">
          {user ? 'Waiting for a user to be selected...' : 'Loading user data...'}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-[#f0f2f5]">
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages && messages.length > 0 ? (
         <div className="space-y-6">
         {messages.map((message, index) => {
           if (!message?.senderId?._id) return null;
           const isCurrentUserMessage = message.senderId._id === user._id;
           
           return (
             <div
               key={message._id || index}
               className={`flex w-full ${isCurrentUserMessage ? 'justify-end' : 'justify-start'}`}
             >
               <div className={`flex items-end gap-2 max-w-[70%] ${isCurrentUserMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                 <img
                   src={isCurrentUserMessage ? user.profilePhoto : selectedUser.profilePhoto}
                   alt={isCurrentUserMessage ? 'You' : selectedUser.name}
                   className="w-8 h-8 rounded-full object-cover"
                   onError={(e) => {
                     e.target.src = 'https://via.placeholder.com/32';
                   }}
                 />
                 <div
                   className={`relative px-4 py-3 rounded-2xl shadow-sm ${
                     isCurrentUserMessage
                       ? 'bg-[#dcf8c6] text-gray-800'
                       : 'bg-white text-gray-800'
                   }`}
                 >
                   <p className="text-[15px] leading-tight">{message.content}</p>
                   <span className="block text-[11px] text-gray-500 mt-1 text-right">
                     {message.createdAt
                       ? new Date(message.createdAt).toLocaleTimeString([], {
                           hour: '2-digit',
                           minute: '2-digit',
                         })
                       : 'Time not available'}
                   </span>
                 </div>
               </div>
             </div>
           );
         })}
         <div ref={bottomRef}></div>
       </div>
       
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="text-xl font-medium text-gray-700">No messages yet</div>
            <p className="text-gray-500 mt-2">Start a conversation with {selectedUser.name}</p>
          </div>
        )}
      </div>
      <div className="border-t border-gray-200">
        <SendMessage />
      </div>
    </div>
  );
}
