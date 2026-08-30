import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCheck } from 'lucide-react';
import { useMehndiAuth } from '@/context/MehndiAuthContext';
import { bookingStorage } from '@/services/bookingStorage';

interface ChatModalProps {
  isOpen: boolean;
  artistId?: string;
  artistName?: string;
  artistAvatar?: string;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  artistId = 'artist-ayesha-khan',
  artistName = 'Ayesha Noor Khan',
  artistAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  onClose,
}) => {
  const { user } = useMehndiAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const chats = bookingStorage.getChats();
      const currentChat = chats.find(c => c.artistId === artistId || c.id === 'chat-1');
      if (currentChat) {
        setMessages(currentChat.messages);
      } else {
        setMessages([
          {
            id: 'welcome-1',
            senderId: artistId,
            senderName: artistName,
            senderAvatar: artistAvatar,
            senderRole: 'artist',
            text: `Welcome! I am ${artistName}. Please share your ceremony date, venue location, and any custom design requests.`,
            timestamp: 'Just now',
            isRead: true,
          }
        ]);
      }
    }
  }, [isOpen, artistId, artistName, artistAvatar]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const senderRole: 'customer' | 'artist' = user?.role === 'artist' ? 'artist' : 'customer';
    const senderName = user?.name || 'Suhana Patel';
    const senderAvatar = user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80';

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || 'cust-demo-1',
      senderName,
      senderAvatar,
      senderRole,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };

    setMessages(prev => [...prev, newMsg]);
    bookingStorage.sendMessage('chat-1', inputText, senderRole, senderName, senderAvatar);
    setInputText('');

    if (senderRole === 'customer') {
      setTimeout(() => {
        const replyMsg = {
          id: `msg-reply-${Date.now()}`,
          senderId: artistId,
          senderName: artistName,
          senderAvatar: artistAvatar,
          senderRole: 'artist' as const,
          text: `Thank you for sharing your details! I would be delighted to work with you on your bridal henna. Would you like to review dates or reserve your slot?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: true,
        };
        setMessages(prev => [...prev, replyMsg]);
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9] dark:border-[#2A2724] rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-[#E8E2D9] dark:border-[#2A2724] bg-white dark:bg-[#1C1A18] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={artistAvatar}
              alt={artistName}
              className="w-10 h-10 rounded-full object-cover border border-[#E8E2D9]"
            />
            <div>
              <p className="text-xs font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{artistName}</p>
              <p className="text-[10px] text-[#385648] dark:text-[#5E8C75] font-semibold">Verified Master Artisan</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-[#6B665F] hover:text-[#1C1A18]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5] dark:bg-[#141312]">
          <div className="text-center my-2">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#6B665F] bg-[#F4EFEB] dark:bg-[#1C1A18] px-3 py-1 rounded-full border border-[#E8E2D9]">
              Verified Bridal Inquiry Channel
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.senderRole === (user?.role || 'customer');
            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-6 h-6 rounded-full object-cover mb-1 border border-[#E8E2D9]"
                  />
                )}
                <div
                  className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-[#1C1A18] text-white rounded-br-none'
                      : 'bg-white dark:bg-[#1C1A18] text-[#1C1A18] dark:text-[#F7F5F0] border border-[#E8E2D9] dark:border-[#2A2724] rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${isMe ? 'text-gray-300' : 'text-gray-400'}`}>
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-[#E8E2D9] dark:border-[#2A2724] bg-white dark:bg-[#1C1A18] flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9] text-xs text-[#1C1A18] dark:text-[#F7F5F0] focus:outline-none focus:border-[#1C1A18]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="btn-primary !p-2.5 !rounded-full shrink-0 disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
