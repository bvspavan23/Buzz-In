import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeAction } from '../redux/slice/buzzSlice';

const JoinRoom = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJoin = () => {
    if (!name || !roomId) {
      alert("Please enter both name and room ID");
      return;
    }

    dispatch(storeAction({ name, roomId }));
    navigate(`/buzzer/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-2 font-[1000] tracking-tight" style={{ fontFamily: "'Fredoka', sans-serif" }}>
          Join a Buzz Room
        </h1>
        
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-6 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full"
          style={{ fontFamily: "'Baloo 2', sans-serif" }}
        />

        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="px-6 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full"
          style={{ fontFamily: "'Baloo 2', sans-serif" }}
        />

        <button
          onClick={handleJoin}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 w-full"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          Join Buzz
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;