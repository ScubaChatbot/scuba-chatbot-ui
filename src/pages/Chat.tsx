import { useState, useContext, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
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
          <h2 className="text-2xl font-bold text-orange-700 text-center">Por favor, inicie sesión</h2>
          <button className="bg-orange-400 text-white px-6 py-3 rounded font-semibold hover:bg-orange-500 transition cursor-pointer" onClick={() => navigate('/')}>Ir a iniciar sesión</button>
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Chat container */}
      <div className="flex flex-col w-full max-w-2xl flex-1 bg-white rounded-3xl shadow-2xl px-6 py-4 mb-6" style={{ minHeight: "60vh" }}>
        <div className="flex-1 overflow-y-auto space-y-4 pb-2" style={{ maxHeight: "60vh" }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={
                msg.role === 'user'
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <div
                className={
                  msg.role === 'user'
                    ? "bg-blue-500 text-white rounded-2xl px-4 py-2 max-w-[70%] shadow-md"
                    : "bg-gray-100 text-gray-800 rounded-2xl px-4 py-2 max-w-[70%] shadow"
                }
                style={{
                  borderBottomRightRadius: msg.role === 'user' ? "0.5rem" : "1rem",
                  borderBottomLeftRadius: msg.role === 'user' ? "1rem" : "0.5rem"
                }}
              >
                {msg.role === 'user' ? (
                  <span>{msg.text}</span>
                ) : (
                  <div>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-400 text-sm pl-2">El bot está escribiendo...</div>}
          {error && <div className="text-red-500 text-sm pl-2">{error}</div>}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <form
          className="flex items-center gap-3 mt-4"
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
        >
          <div className="relative flex-1">
            <input
              className="border border-gray-300 focus:border-blue-500 rounded-full px-5 h-14 w-full shadow focus:shadow-lg transition text-gray-800 bg-gray-50 placeholder-gray-400"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              autoComplete="off"
              id="chat-input"
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition text-white rounded-full p-3 shadow-md flex items-center justify-center disabled:opacity-50"
            disabled={loading || !input.trim()}
            aria-label="Enviar"
          >
            {/* Send icon */}
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M3 20L21 12L3 4V10L17 12L3 14V20Z" fill="white"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
export default Chat;
