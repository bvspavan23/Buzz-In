import React from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    const handlejoin = () => {
        navigate('/join-room');        
    }

    const handlecreate = () => {
        navigate('/create-buzz');
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-4">
      {/* Main content */}
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-[1000] tracking-tight" style={{ fontFamily: "'Fredoka', sans-serif" }}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 cursor-pointer inline-block scale-100 transition-transform duration-300 ease-in-out hover:scale-150">
            B
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 cursor-pointer inline-block scale-100 transition-transform duration-300 ease-in-out hover:scale-150">
            U
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 cursor-pointer inline-block scale-100 transition-transform duration-300 ease-in-out hover:scale-150">
            Z
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 cursor-pointer inline-block scale-100 transition-transform duration-300 ease-in-out hover:scale-150">
            Z
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r text-white cursor-pointer inline-block scale-100 transition-transform duration-300 ease-in-out hover:scale-150">
             IN
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
          Real-time buzzing for quizzes, games, and competitions. 
          <br />
          Be the first to buzz with lightning-fast response.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95" onClick={handlejoin} style={{ fontFamily: "'Fredoka', sans-serif" }}>
            Join Buzz
          </button>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95" onClick={handlecreate} style={{ fontFamily: "'Fredoka', sans-serif" }}>
            Create Buzz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;