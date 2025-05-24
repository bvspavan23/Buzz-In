import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createBuzzAPI } from '../services/buzzServices';
import AlertMessage from '../components/AlertMessage';

const Create= () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createBuzzAPI,
    onSuccess: (data) => {
      setTimeout(() => {
        navigate(`/manage-buzz`);
      }, 1500);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    mutation.mutate({ name });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              CREATE
            </span>
            <span className="text-white">BUZZ</span>
          </h1>
          <p 
            className="text-gray-300"
            style={{ fontFamily: "'Baloo 2', sans-serif" }}
          >
            Start a new buzzing session
          </p>
        </div>

        {/* Alert messages */}
        {mutation.isPending && (
          <AlertMessage type="loading" message="Creating your buzz session..." />
        )}
        {mutation.isSuccess && (
          <AlertMessage type="success" message="Buzz created successfully! Redirecting..." />
        )}
        {mutation.isError && (
          <AlertMessage type="error" message={mutation.error.message} />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-300 mb-2"
              style={{ fontFamily: "'Baloo 2', sans-serif" }}
            >
              Buzzer Name
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 bg-gray-800 bg-opacity-70 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                placeholder="Enter a creative name"
                style={{ fontFamily: "'Baloo 2', sans-serif" }}
                maxLength={50}
              />
              <div className="absolute right-3 top-4 text-xs text-gray-400">
                {name.length}/50
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={mutation.isPending || !name.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:transform-none"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Create Buzzer
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors duration-300"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p 
            className="text-gray-400 text-sm"
            style={{ fontFamily: "'Baloo 2', sans-serif" }}
          >
            Pro Tip: Use a descriptive name like "Friday Quiz Night" or "Science Trivia"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Create;