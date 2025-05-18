import React, { useState } from 'react';
import { Search, MoreVertical, Send, Paperclip, Image } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const Messages: React.FC = () => {
  const [messages] = useState<Message[]>([
    {
      id: 1,
      sender: "Support Team",
      content: "Hello! How can we help you today?",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "I need help with connecting my Instagram account",
      timestamp: "10:31 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Support Team",
      content: "I'll guide you through the process. First, go to the Platforms page and click on 'Connect Platform'.",
      timestamp: "10:32 AM",
      isOwn: false
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex-1 flex">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r border-dark-800 flex flex-col">
          <div className="p-4 border-b border-dark-800">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg focus:outline-none focus:border-primary-600"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {["Support Team", "Marketing Team", "Sales Team"].map((contact, index) => (
              <div
                key={index}
                className={`p-4 hover:bg-dark-800 cursor-pointer ${
                  index === 0 ? "bg-dark-800" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {contact.split(" ").map(word => word[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">{contact}</h3>
                      <p className="text-sm text-dark-400">Online</p>
                    </div>
                  </div>
                  <MoreVertical size={16} className="text-dark-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-dark-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-white font-medium">ST</span>
              </div>
              <div>
                <h3 className="font-medium">Support Team</h3>
                <p className="text-sm text-dark-400">Online</p>
              </div>
            </div>
            <button className="p-2 hover:bg-dark-800 rounded-lg">
              <MoreVertical size={20} className="text-dark-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.isOwn
                      ? "bg-primary-600 text-white"
                      : "bg-dark-800"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-dark-800">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-dark-800 rounded-lg">
                <Paperclip size={20} className="text-dark-400" />
              </button>
              <button className="p-2 hover:bg-dark-800 rounded-lg">
                <Image size={20} className="text-dark-400" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-600"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-primary-600 hover:bg-primary-700 rounded-lg"
              >
                <Send size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;