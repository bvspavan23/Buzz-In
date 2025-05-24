import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyBuzzRooms } from '../services/buzzServices';
import Card from './Card';

const Manage = () => {
  const [buzzes, setBuzzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBuzzes = async () => {
      try {
        const buzzData = await getMyBuzzRooms();
        setBuzzes(buzzData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching buzzes:', error);
        setError('Failed to load buzz sessions');
        setLoading(false);
      }
    };

    fetchUserBuzzes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl" style={{ fontFamily: "'Fredoka', sans-serif" }}>
          Loading your buzzes...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl" style={{ fontFamily: "'Fredoka', sans-serif" }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center" style={{ fontFamily: "'Fredoka', sans-serif" }}>
          Your Buzz Sessions
        </h1>

        {buzzes.length === 0 ? (
          <div className="text-center mt-16">
            <div className="text-5xl mb-6">😕</div>
            <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              Oops!! No buzzes yet
            </h2>
            <p className="text-gray-300 mb-8 max-w-md mx-auto" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              You haven't created any buzz sessions yet. Get started by creating your first one!
            </p>
            <button
              onClick={() => navigate('/create-buzz')}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Create a Buzz Instantly
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buzzes.map((buzz, index) => (
              <Card 
                key={buzz._id}
                sno={index + 1}
                name={buzz.name}
                roomId={buzz.roomId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Manage;