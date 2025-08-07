import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <header className="bg-[linear-gradient(135deg,_#ffe5b4_0%,_#ffd6e0_50%,_#c2e9fb_100%)] text-orange-700 px-8 h-20 flex items-center justify-end shadow-lg">
        <div className="w-full flex justify-end">
          <span className="font-semibold text-2xl tracking-wide text-right">Scuba Chatbot</span>
        </div>
      </header>
      <main className="w-full min-h-[calc(100vh-5rem)] flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
