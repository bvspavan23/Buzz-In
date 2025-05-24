import React from 'react';
import { Link } from 'react-router-dom';
const Card = ({ sno, name, roomId }) => {
  return (
    <div className="bg-gray-800 bg-opacity-70 rounded-xl shadow-lg overflow-hidden border border-gray-700 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-cyan-400 font-bold text-lg" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            #{sno}
          </span>
          <span className="px-3 py-1 bg-cyan-900 bg-opacity-50 text-cyan-100 text-xs font-semibold rounded-full">
            Active
          </span>
        </div>
        
        <h3 
          className="text-xl font-bold text-white mb-2 truncate"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
          title={name}
        >
          {name}
        </h3>
        
        <div className="mt-4">
          <p className="text-gray-400 text-sm mb-1" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
            Room ID:
          </p>
          <div className="flex items-center bg-gray-900 bg-opacity-50 rounded-lg p-3">
            <span className="text-cyan-300 font-mono text-sm truncate" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              {roomId}
            </span>
            <button 
              className="ml-auto text-cyan-400 hover:text-cyan-300 transition-colors"
              onClick={() => {
                navigator.clipboard.writeText(roomId);
                // You might want to add a toast notification here
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-3">
          <Link 
            to={`/buzzer/admin/${roomId}`}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            Manage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;