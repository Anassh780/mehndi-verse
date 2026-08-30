import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Paperclip, CheckCheck, Crown, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useMehndiAuth } from '@/context/MehndiAuthContext';
import { bookingStorage } from '@/services/bookingStorage';
import { ChatConversation } from '@/types/mehndi';

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
            text: `Hello! I am ${artistName}. Please share your event date, venue location, and any custom design requests!`,
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

    // Simulate realistic artist reply after 1.5s
    if (senderRole === 'customer') {
      setTimeout(() => {
        const replyMsg = {
          id: `msg-reply-${Date.now()}`,
          senderId: artistId,
          senderName: artistName,
          senderAvatar: artistAvatar,
          senderRole: 'artist' as const,
          text: `Thank you for your message! I would love to create this bespoke bridal henna for you. Would you like to review our available dates or proceed with the deposit?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: true,
        };
        setMessages(prev => [...prev, replyMsg]);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FDFBF7] dark:bg-[#07100D] border border-[#C59B27]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px] max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-[#EFE7DA] dark:border-[#1F362E] bg-white dark:bg-[#0E1A16] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={artistAvatar}
                alt={artistName}
                className="w-10 h-10 rounded-full object-cover border border-[#C59B27]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A2421] dark:text-[#F8F5EE] flex items-center gap-1.5">
                <span>{artistName}</span>
                <Crown className="w-3.5 h-3.5 text-[#C59B27]" />
              </p>
              <p className="text-[11px] text-[#5C6763] dark:text-[#B2C2BC]">
                Active now • Typical response: 15 mins
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FDFBF7] dark:bg-[#07100D]">
          <div className="text-center my-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A7516] bg-[#FEF9EE] dark:bg-[#282010] px-3 py-1 rounded-full border border-[#C59B27]/30">
              🔒 End-to-End Verified Bridal Inquiries
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
                    className="w-6 h-6 rounded-full object-cover mb-1 border border-[#C59B27]/30"
                  />
                )}
                <div
                  className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-[#064E3B] text-white rounded-br-none shadow-sm'
                      : 'bg-white dark:bg-[#0E1A16] text-[#1A2421] dark:text-[#F8F5EE] border border-[#EFE7DA] dark:border-[#1F362E] rounded-bl-none shadow-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${isMe ? 'text-emerald-200' : 'text-gray-400'}`}>
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-emerald-300" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-[#EFE7DA] dark:border-[#1F362E] bg-white dark:bg-[#0E1A16] flex items-center gap-2">
          <button
            type="button"
            className="p-2 rounded-full text-gray-400 hover:text-[#C59B27] hover:bg-black/5"
            title="Attach design inspiration"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Type your message or ask about dates..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-full bg-[#F8F4EB] dark:bg-[#07100D] border border-transparent focus:border-[#C59B27] focus:outline-none text-xs text-[#1A2421] dark:text-[#F8F5EE]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-full bg-[#064E3B] text-white hover:bg-[#022C22] disabled:opacity-40 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
