import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { useMehndiAuth } from '@/context/MehndiAuthContext';
import { bookingStorage } from '@/services/bookingStorage';

interface ChatModalProps {
  isOpen: boolean;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  artistId,
  artistName,
  artistAvatar,
  onClose,
}) => {
  const { user } = useMehndiAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const chats = bookingStorage.getChats();
      const chat = chats.find(c => c.artistId === artistId) || chats[0];
      if (chat) {
        setMessages(chat.messages);
      }
    }
  }, [isOpen, artistId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || 'cust-demo-1',
      senderName: user?.name || 'Suhana Patel',
      senderAvatar: user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      senderRole: user?.role || 'customer',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulated instant reply from the artist
    setTimeout(() => {
      const replyMsg = {
        id: `msg-reply-${Date.now()}`,
        senderId: artistId,
        senderName: artistName,
        senderAvatar: artistAvatar,
        senderRole: 'artist',
        text: `Thank you for reaching out! I would be delighted to work with you on your bridal henna. I have noted your preferences and will prepare custom sketches for our session.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1b1815]/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-lg bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] rounded-3xl shadow-2xl flex flex-col h-[560px] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-[rgba(27,24,21,0.1)] flex items-center justify-between bg-[#efe6d4]">
          <div className="flex items-center gap-3">
            <img
              src={artistAvatar}
              alt={artistName}
              className="w-10 h-10 rounded-full object-cover border border-[rgba(27,24,21,0.12)]"
            />
            <div>
              <p className="font-serif-editorial font-bold text-sm text-[#1b1815]">{artistName}</p>
              <p className="text-[10px] text-[#6b7752] font-semibold">● Active Atelier Studio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f7f1e6] flex items-center justify-center text-[#1b1815] hover:bg-[rgba(27,24,21,0.15)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          <div className="text-center py-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#2c2620]/60 bg-[#efe6d4] px-3 py-1 rounded-full">
              End-to-End Escrow Protected Thread
            </span>
          </div>

          {messages.map((m) => {
            const isMe = m.senderRole === 'customer' || m.senderId === user?.id;
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <img
                    src={m.senderAvatar}
                    alt={m.senderName}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"
                  />
                )}
                <div
                  className={`max-w-[78%] rounded-2xl p-3.5 text-xs space-y-1 ${
                    isMe
                      ? 'bg-[#9c4221] text-[#f7f1e6] rounded-tr-xs'
                      : 'bg-[#efe6d4] text-[#1b1815] rounded-tl-xs border border-[rgba(27,24,21,0.08)]'
                  }`}
                >
                  <p className="leading-relaxed font-sans">{m.text}</p>
                  <span className={`text-[9px] block text-right ${isMe ? 'text-[#f7f1e6]/70' : 'text-[#2c2620]/60'}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Form Input */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-[rgba(27,24,21,0.1)] bg-[#efe6d4] flex items-center gap-2">
          <input
            type="text"
            placeholder="Discuss design motifs, initials, or travel dates..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] rounded-full px-4 py-2.5 text-xs text-[#1b1815] placeholder-[rgba(27,24,21,0.45)] focus:outline-none focus:border-[#9c4221]"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-[#9c4221] text-[#f7f1e6] flex items-center justify-center hover:bg-[#7a331a] transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
