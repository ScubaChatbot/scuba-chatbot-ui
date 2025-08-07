import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 text-white px-8 h-20 flex items-center justify-center shadow-lg relative overflow-hidden">
        {/* Background wave SVG */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="#3B82F6" fillOpacity="0.3" d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,128C672,117,768,107,864,117.3C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
        </svg>
        <div className="bg-blue-700 rounded-full p-3 flex items-center justify-center shadow-md z-10 mr-4">
          {/* Diving mask icon SVG */}
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="z-10">
            <path d="M2 12h20M12 2v20M7 7h10v10H7z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <span className="font-semibold text-2xl tracking-wide z-10">Scuba Chatbot</span>
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
