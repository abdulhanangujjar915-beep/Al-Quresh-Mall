import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCheck
} from 'lucide-react';
import { ChatMessage } from '../types/mall';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'agent',
    text: 'Assalam-o-Alaikum! Welcome to Al Quresh Mall Help Desk (Millat Rd, Faisalabad). Aap ko cosmetics (whitening creams, powders), suits, perfumes, passenger lifts, ya online order tracking mein kya madad chahiye?',
    time: 'Just now',
    quickReplies: [
      'Cosmetics & Creams kis shop par hain?',
      'Mall mein lift kidhar hai?',
      'Men Suits & Ladies Suits Floor?',
      'Track my delivery order'
    ]
  }
];

export const LiveChatSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateReply = (query: string): { text: string; quickReplies?: string[] } => {
    const q = query.toLowerCase();

    if (q.includes('cream') || q.includes('powder') || q.includes('cosmetic') || q.includes('makeup') || q.includes('whitening') || q.includes('skincare')) {
      return {
        text: 'Glow & Glamour Cosmetics (Ground Floor Unit G-10) aur Paris Cosmetics (1st Floor Unit 1-10) par authentic Glutathione whitening creams, SPF sunblocks, aur flawless silk compact powders available hain 100% original quality guarantee ke sath!',
        quickReplies: ['Browse Cosmetics in Shop', 'Whitening Cream Price', 'Store timings']
      };
    }

    if (q.includes('lift') || q.includes('elevator') || q.includes('stairs') || q.includes('chath')) {
      return {
        text: 'Al Quresh Mall mein high-speed passenger elevators (Lift A & Lift B) operational hain jo Ground Floor se 1st, 2nd, aur 3rd Floor (Masjid) tak direct jati hain. Elderly parents aur families ke liye fully accessible hain!',
        quickReplies: ['View Floor & Lift Map', 'Ground floor shops', 'Call Mall Reception']
      };
    }

    if (q.includes('suit') || q.includes('clothes') || q.includes('kapray') || q.includes('sherwani') || q.includes('lawn')) {
      return {
        text: 'Men’s 3-piece bespoke suits & sherwanis Royal Al-Quresh (Unit G-01) aur Al-Faisal Studio par hain. Ladies designer lawn & party wear Shehnai Boutique (1st Floor Unit 1-02) aur Noor-e-Kashmir Shawls (Unit G-04) par hain. Rates bilkul wholesale aur munasib hain!',
        quickReplies: ['Browse Men Suits', 'Browse Ladies Suits', 'Show discounts']
      };
    }

    if (q.includes('perfume') || q.includes('oud') || q.includes('attar') || q.includes('fragrance')) {
      return {
        text: 'Al-Haramain Oud & French Perfumery Ground Floor (Unit G-07) par waqia hai. Pure Dehn al Oud aur long-lasting non-alcoholic attars available hain!',
        quickReplies: ['Browse Perfumes', 'Oud prices']
      };
    }

    if (q.includes('timing') || q.includes('time') || q.includes('open') || q.includes('friday') || q.includes('jumma')) {
      return {
        text: 'Al Quresh Mall rozana subha 11:00 AM se raat 11:30 PM tak open rehta hai. Friday ko Jumma prayer break 1:00 PM se 2:30 PM tak hoti hai.',
        quickReplies: ['Location on Millat Rd', 'Contact Number']
      };
    }

    if (q.includes('track') || q.includes('order') || q.includes('delivery')) {
      return {
        text: 'Online order track karne ke liye upar "Track Order" button click karein aur apna Order ID (maslan AQM-8921) enter karein. Faisalabad mein 2 se 4 ghantay mein express doorstep delivery ki jati hai!',
        quickReplies: ['Open Order Tracker', 'Delivery charges?']
      };
    }

    if (q.includes('price') || q.includes('discount') || q.includes('munasib') || q.includes('rate') || q.includes('offer')) {
      return {
        text: 'Hamare mall ke tamaam retail outlets par rates bohot munasib aur fixed hain. Checkout par code "ALQURESH20" use karke aap flat 20% discount hasil kar sakte hain!',
        quickReplies: ['Use ALQURESH20', 'Shop now']
      };
    }

    return {
      text: 'Shukriya rabta karne ka! Al Quresh Mall management aur sales desk Millat Road par aap ki khidmat ke liye hazir hai. Mazeed maloomat ke liye aap hamare WhatsApp +92 300 7654321 par bhi direct rabta kar sakte hain.',
      quickReplies: ['Where is lift?', 'Explore Cosmetics', 'Mall Timings']
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const replyData = generateReply(text);
      const agentMsg: ChatMessage = {
        id: `agt-${Date.now()}`,
        sender: 'agent',
        text: replyData.text,
        time: 'Just now',
        quickReplies: replyData.quickReplies
      };
      setMessages(prev => [...prev, agentMsg]);
    }, 800);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-full shadow-2xl shadow-emerald-900/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          aria-label="Open live chat support"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white stroke-[2.5]" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 text-white fill-white" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] max-h-[80vh]">
          {/* Chat Header */}
          <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white text-emerald-800 flex items-center justify-center font-bold text-xs shadow-xs">
                  AQ
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-300 rounded-full border-2 border-emerald-800" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Al Quresh Mall Live Desk</span>
                </h4>
                <div className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span>Online</span>
                  <span>·</span>
                  <span>Millat Rd, Faisalabad</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-emerald-200 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white font-medium rounded-br-none shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>

                {/* Quick reply suggestion buttons */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(reply)}
                        className="text-[11px] bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer shadow-xs"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white px-3 py-2 rounded-xl w-24 border border-slate-200">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce delay-200" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Contact Direct Link Strip */}
          <div className="px-4 py-1.5 bg-slate-100 border-t border-slate-200 text-[10px] text-slate-600 flex items-center justify-between">
            <span>Direct Call: <strong>+92 41 876 2200</strong></span>
            <a
              href="https://wa.me/923007654321"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 font-bold hover:underline"
            >
              Open WhatsApp
            </a>
          </div>

          {/* Input field */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about cosmetics, lifts, suits, tracking..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
