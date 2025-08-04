import { useState } from 'react';
import { sendChatMessage } from '../services/chatApi';

export function useChat() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; text: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setLoading(true);
    setError(null);
    const result = await sendChatMessage(text);
    setLoading(false);
    if (result.response) {
      setMessages((prev) => [...prev, { role: 'bot', text: result.response! }]);
    } else {
      setError(result.error || 'Unknown error');
    }
  };

  return { messages, sendMessage, loading, error };
}
