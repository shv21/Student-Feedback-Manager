import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AllFeedbackPage from './pages/AllFeedbackPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feedback" element={<AllFeedbackPage />} />
          {/* Catch-all redirect to Home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Simple Educational Project Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
          <p>
            Student Feedback Manager &bull; Full-Stack Major Project (React + Express + MongoDB + Mongoose)
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
