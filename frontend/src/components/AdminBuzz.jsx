import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getBuzzRooms } from '../services/buzzServices';
import './Buzz.css';

const DialogBox = ({ title, items, highlightFirstThree = false }) => {
  return (
    <div className="bg-gray-800 bg-opacity-70 rounded-xl shadow-lg p-4 w-full md:w-64 h-48 flex flex-col border border-gray-700 backdrop-blur-sm">
      <h3 
        className="text-lg font-semibold mb-2 text-white"
        style={{ fontFamily: "'Fredoka', sans-serif" }}
      >
        {title}
      </h3>
      <div className="overflow-y-auto flex-grow">
        {items.length === 0 ? (
          <p 
            className="text-gray-400 italic"
            style={{ fontFamily: "'Baloo 2', sans-serif" }}
          >
            No users yet
          </p>
        ) : (
          <ul className="space-y-1">
            {items.map((item, index) => (
              <li 
                key={index} 
                className={`px-2 py-1 rounded transition-all duration-200 ${
                  highlightFirstThree && index < 3 
                    ? 'font-bold text-lg bg-cyan-900 bg-opacity-50 animate-pulse text-cyan-100' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                style={{ fontFamily: "'Baloo 2', sans-serif" }}
              >
                {highlightFirstThree && index < 3 ? `${index + 1}. ${item.name}` : item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div 
        className="text-sm text-gray-400 mt-1"
        style={{ fontFamily: "'Baloo 2', sans-serif" }}
      >
        {items.length} total
      </div>
    </div>
  );
};

const AdminBuzz = () => {
  const { roomId } = useParams();
  const name = "Admin";
  const [isValidRoom, setIsValidRoom] = useState(null);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [buzzOrder, setBuzzOrder] = useState([]);
  const [buzzEnabled, setBuzzEnabled] = useState(false);
  const socketRef = useRef(null);

  const ENDPOINT = "https://buzz-in.onrender.com";

  useEffect(() => {
    let isMounted = true;
    const fetchRooms = async () => {
      try {
        const rooms = await getBuzzRooms();
        const match = rooms.find((room) => room.roomId === roomId);
        setIsValidRoom(!!match);
        if (match && name && isMounted) {
          const newSocket = io(ENDPOINT, {
            transports: ["websocket"],
            withCredentials: true,
          });
          
          newSocket.on("connect", () => {
            console.log("Socket connected:", newSocket.id);
            newSocket.emit('join-room', { name, roomId, isAdmin: true });
          });

          newSocket.on("room-users", (users) => {
            if (isMounted) setUsersInRoom(users);
          });

          newSocket.on("buzz-order", (order) => {
            if (isMounted) setBuzzOrder(order);
          });

          newSocket.on("buzz-status", ({ enabled }) => {
            if (isMounted) setBuzzEnabled(enabled);
          });

          socketRef.current = newSocket;
        }
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
        setIsValidRoom(false);
      }
    };

    fetchRooms();

    return () => {
      isMounted = false;
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId, name]);

  const handleEnableBuzz = () => {
    if (socketRef.current) {
      socketRef.current.emit('enable-buzz', { roomId });
      socketRef.current.emit('reset-buzz', { roomId });
    }
  };

  const handleDisableBuzz = () => {
    if (socketRef.current) {
      socketRef.current.emit('disable-buzz', { roomId });
    }
  };

  const handleResetBuzz = () => {
    if (socketRef.current) {
      socketRef.current.emit('reset-buzz', { roomId });
    }
  };

  if (isValidRoom === null) {
    return (
      <div 
        className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white"
        style={{ fontFamily: "'Fredoka', sans-serif" }}
      >
        Loading...
      </div>
    );
  }

  if (!isValidRoom) {
    return (
      <div 
        className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-rose-400 text-2xl"
        style={{ fontFamily: "'Fredoka', sans-serif" }}
      >
        Invalid Room ID
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 p-4 md:p-6 gap-4">
      {/* Left sidebar */}
      <div className="w-full md:w-1/4 md:pr-4 flex flex-col order-1 md:order-1">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-4 rounded-xl mb-4 shadow-lg animate-fade-in">
          <h1 
            className="text-xl font-bold"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            Room: {roomId}
          </h1>
          <p 
            className="text-blue-100"
            style={{ fontFamily: "'Baloo 2', sans-serif" }}
          >
            Admin: {name}
          </p>
        </div>
        <DialogBox 
          title="Participants" 
          items={usersInRoom} 
        />
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center order-3 md:order-2">
        <div className="flex flex-col items-center space-y-6 w-full max-w-md">
          <div className="flex space-x-4">
            <button
              onClick={handleEnableBuzz}
              className={`px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
                buzzEnabled 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105'
              }`}
              style={{ fontFamily: "'Fredoka', sans-serif" }}
              disabled={buzzEnabled}
            >
              Enable Buzz
            </button>
            <button
              onClick={handleDisableBuzz}
              className={`px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
                !buzzEnabled 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-rose-500 to-pink-600 hover:shadow-lg hover:shadow-rose-500/30 hover:scale-105'
              }`}
              style={{ fontFamily: "'Fredoka', sans-serif" }}
              disabled={!buzzEnabled}
            >
              Disable Buzz
            </button>
          </div>
          
          <button
            onClick={handleResetBuzz}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:shadow-lg hover:shadow-amber-500/30 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            Reset Buzz Order
          </button>
          
          <div className="w-full bg-gray-800 bg-opacity-70 p-4 rounded-xl shadow-md text-center border border-gray-700">
            <p 
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Buzz Status:
            </p>
            <p 
              className={`text-2xl font-bold ${
                buzzEnabled ? 'text-emerald-400' : 'text-rose-400'
              }`}
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              {buzzEnabled ? 'ACTIVE' : 'INACTIVE'}
            </p>
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-full md:w-1/4 md:pl-4 order-2 md:order-3">
        <DialogBox 
          title="Buzz Order" 
          items={buzzOrder} 
          highlightFirstThree={true}
        />
      </div>
    </div>
  );
};

export default AdminBuzz;