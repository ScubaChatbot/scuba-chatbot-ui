import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../hooks/useChat';

const Chat = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { messages, sendMessage, loading, error } = useChat();
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md mx-auto flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-red-600 text-center">Please login</h2>
          <button className="bg-blue-700 text-white px-6 py-3 rounded font-semibold hover:bg-blue-800 transition" onClick={() => navigate('/')}>Go to Login</button>
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
    <div className="p-8 w-[70%] mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chat with AI Assistant</h2>
      <div className="border rounded p-4 mb-4 h-64 overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={msg.role === 'user' ? 'text-blue-600' : 'text-gray-700'}>{msg.text}</span>
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm">Bot is typing...</div>}
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="border rounded-lg px-2 py-1 flex-1"
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
        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
};
export default Chat;
