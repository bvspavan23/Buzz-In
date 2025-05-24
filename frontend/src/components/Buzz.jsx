import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { getBuzzRooms } from '../services/buzzServices';
import confetti from 'canvas-confetti';
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
          <p className="text-gray-400 italic" style={{ fontFamily: "'Baloo 2', sans-serif" }}>No users yet</p>
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
      <div className="text-sm text-gray-400 mt-1" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
        {items.length} total
      </div>
    </div>
  );
};

const Buzz = () => {
  const { roomId } = useParams();
  const name = useSelector((state) => state.buzz.name);
  const [buzzed, setBuzzed] = useState(false);
  const [isValidRoom, setIsValidRoom] = useState(null);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [buzzOrder, setBuzzOrder] = useState([]);
  const [buzzEnabled, setBuzzEnabled] = useState(false);
  const [isFirstBuzzer, setIsFirstBuzzer] = useState(false);
  const socketRef = useRef(null);
  const buttonRef = useRef(null);
  const confettiFiredRef = useRef(false);

  const ENDPOINT = "https://buzz-in.onrender.com";

  const launchConfetti = () => {
    if (confettiFiredRef.current) return;  
    confettiFiredRef.current = true;
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
    })
    setTimeout(()=>confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    }), 250);
    setTimeout(()=>confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    }), 400);
  };

  useEffect(()=>{
    if (buzzOrder.length > 0 && buzzOrder[0].name === name && !confettiFiredRef.current) {
      setIsFirstBuzzer(true);
      launchConfetti();
    } else if (buzzOrder.length === 0) {
      confettiFiredRef.current = false;
      setIsFirstBuzzer(false);
    }
  }, [buzzOrder, name]);

  useEffect(()=>{
    let isMounted = true;
    const fetchRooms = async()=>{
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
            newSocket.emit('join-room', { name, roomId });
          });
          newSocket.on("room-users", (users) => {
            if (isMounted) setUsersInRoom(users);
          });
          newSocket.on("buzz-order", (order) => {
            if (isMounted) {
              setBuzzOrder(order);
              console.log('Buzz order updated:', order);
            }
          });
          newSocket.on("buzz-status", ({ enabled }) => {
            if (isMounted) {
              setBuzzEnabled(enabled);
              console.log('Buzz status updated:', enabled);
              if (!enabled) {
                setBuzzed(false);
                setIsFirstBuzzer(false);
                confettiFiredRef.current = false;
              }
            }
          });

          newSocket.on("user-joined", (data) => {
            console.log(`${data.name} joined the room`);
          });
          newSocket.on("user-left", (data) => {
            console.log(`${data.name} left the room`);
          });
          socketRef.current = newSocket;
        }
      }catch(err){
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

  const handleBuzz = () => {
    if (!buzzed && socketRef.current && buzzEnabled) {
      socketRef.current.emit('buzz', { roomId });
      setBuzzed(true);
      
      if (buttonRef.current) {
        buttonRef.current.classList.add('animate-press');
        setTimeout(() => {
          if (buttonRef.current) buttonRef.current.classList.remove('animate-press');
        }, 200);
      }
    }
  };

  const resetBuzz = () => {
    setBuzzed(false);
    setIsFirstBuzzer(false);
    confettiFiredRef.current = false;
    if (socketRef.current) {
      socketRef.current.emit('reset-buzz', { roomId });
    }
  };

  if(isValidRoom === null){
    return (
      <div 
        className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white"
        style={{ fontFamily: "'Fredoka', sans-serif" }}
      >
        Loading...
      </div>
    );
  }

  if(!isValidRoom){
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
            Your name: {name}
          </p>
        </div>
        <DialogBox 
          title="Participants" 
          items={usersInRoom} 
        />
      </div>
      <div className="flex-grow flex flex-col items-center justify-center order-3 md:order-2">
        <button
          ref={buttonRef}
          onClick={handleBuzz}
          className={`text-5xl font-extrabold w-60 h-60 md:w-72 md:h-72 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out mb-8 ${
            !buzzEnabled
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : buzzed
                ? `bg-gradient-to-br from-rose-600 to-rose-800 text-white scale-105 shadow-[0_0_35px_rgba(220,38,38,0.7)] cursor-not-allowed ${isFirstBuzzer?'animate-bounce':'animate-pulse'}`
                : 'bg-gradient-to-br from-emerald-500 to-green-600 text-white hover:scale-105 shadow-lg transform active:scale-95'
          }`}
          style={{ fontFamily: "'Fredoka', sans-serif" }}
          disabled={!buzzEnabled || buzzed}
        >
          {!buzzEnabled?'WAITING...':buzzed?(isFirstBuzzer?'WINNER!':'BUZZED!'):'BUZZ'}
        </button>
      </div>
      <div className="w-full md:w-1/4 md:pl-4 order-2 md:order-3">
        <DialogBox 
          title="Buzz Order" 
          items={buzzOrder} 
          highlightFirstThree={true}
        />
        {isFirstBuzzer && (
          <div className="mt-4 p-3 bg-gradient-to-r from-amber-500 to-yellow-500 border border-yellow-400 rounded-lg animate-fade-in">
            <p 
              className="text-center font-bold text-white"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              🏆 You buzzed first! 🏆
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buzz;