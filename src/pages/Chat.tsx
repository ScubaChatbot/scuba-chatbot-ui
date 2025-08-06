import { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../hooks/useChat';

const Chat = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { messages, sendMessage, loading, error } = useChat();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, error]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full" style={{ background: 'linear-gradient(135deg, #fff7e6 0%, #ffeaf4 50%, #e6f7ff 100%)' }}>
        <div className="rounded-2xl shadow-2xl p-10 max-w-md mx-auto flex flex-col gap-6" style={{ background: 'linear-gradient(135deg, #ffe5b4 0%, #ffd6e0 50%, #c2e9fb 100%)' }}>
          <h2 className="text-2xl font-bold text-orange-700 text-center">Please login</h2>
          <button className="bg-orange-400 text-white px-6 py-3 rounded font-semibold hover:bg-orange-500 transition cursor-pointer" onClick={() => navigate('/')}>Go to Login</button>
        </div>
      </div>
    );
  }

  const handleSend = () => {
    if (!input) return;
    sendMessage(input);
    setInput('');
  };
  return (
    <div className="p-8 w-[70%] mx-auto flex flex-col h-[calc(100vh-7rem)]">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">Chat with AI Assistant</h2>
      <div className="flex-1 rounded p-4 mb-4 overflow-y-auto" style={{ background: 'linear-gradient(135deg, #fff7e6 0%, #ffeaf4 50%, #e6f7ff 100%)' }}>
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={msg.role === 'user' ? 'text-blue-600' : 'text-gray-700'}>{msg.text}</span>
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm">Bot is typing...</div>}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2 mt-auto">
        <div className="relative flex-1">
          <input
            className="peer border border-orange-300 focus:border-2 focus:border-orange-500 rounded-lg px-2 h-12 w-full shadow-md focus:shadow-lg transition placeholder-transparent"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about tours..."
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <label htmlFor="chat-input" className="absolute left-2 -top-2 text-blue-600 text-xs font-medium transition-all bg-white px-1 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600">Ask about tours...</label>
        </div>
        <button className="bg-orange-400 text-white px-4 py-1 rounded font-semibold hover:bg-orange-500 transition cursor-pointer" onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
};
export default Chat;
