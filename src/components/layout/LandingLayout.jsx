import React, { useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

export default function LandingPage() {
const accessToken = useSelector((state) => state.auth.accessToken);
  let persistedToken = null;
  try {
    const persistedState = localStorage.getItem('persist:root');
    if (persistedState) {
      const parsedState = JSON.parse(persistedState);
      const authState = JSON.parse(parsedState.auth);
      persistedToken = authState?.accessToken;
    }
  } catch (err) {
    console.error("Failed to parse persisted auth token", err);
  }

  const isLoggedIn = accessToken || persistedToken;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-indigo-400/30 rotate-45 animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-purple-400/30 rotate-12 animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-blue-400/30 rotate-45 animate-float-slow"></div>
      </div>

      <nav className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center h-16">

            <div className="text-2xl mr-96 font-bold text-white hover:text-indigo-400 transition-all duration-300 transform hover:scale-110 hover:drop-shadow-glow">

              <Link to="/">Network</Link>
            </div>

        

            <div className="flex items-center space-x-4">

              {
                isLoggedIn?  <Link
                to="/home"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 text-sm font-medium rounded-md transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 hover:shadow-2xl"
              >
                Get Started
              </Link> :<Link
                to="/login"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Link>
              }
             
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800/50 backdrop-blur-sm">
            <Link
              to="/explore"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-all duration-300"
            >
              Explore
            </Link>
            <Link
              to="/top-ideas"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-all duration-300"
            >
              Top Ideas
            </Link>
            <Link
              to="/community"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-all duration-300"
            >
              Join Community
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
          <div className="max-w-4xl mx-auto">
            <div className="absolute -top-20  w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-indigo-500/20 transform rotate-12 hover:rotate-6 transition-transform duration-700 animate-float hidden lg:block"></div>
            <div className="absolute -top-10 -right-32 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-purple-500/20 transform -rotate-12 hover:rotate-6 transition-transform duration-700 animate-float-delayed hidden lg:block"></div>
            <div className="absolute -bottom-16 left-10 w-28 h-28 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl backdrop-blur-sm border border-blue-500/20 transform rotate-45 hover:rotate-12 transition-transform duration-700 animate-float-slow hidden lg:block"></div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transform-gpu hover:scale-105 transition-transform duration-500">
              <span className="inline-block hover:text-indigo-400 transition-colors duration-300 drop-shadow-2xl">
                Connect.
              </span>{" "}
              <span className="inline-block hover:text-purple-400 transition-colors duration-300 drop-shadow-2xl">
                Collaborate.
              </span>{" "}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hover:from-indigo-300 hover:via-purple-300 hover:to-pink-300 transition-all duration-300 drop-shadow-glow animate-gradient">
                Create
              </span>{" "}
              <span className="inline-block hover:text-blue-400 transition-colors duration-300 drop-shadow-2xl">
                on Network
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed transform-gpu hover:text-gray-200 transition-all duration-300 drop-shadow-lg">
              Discover top ideas, join thriving communities, and share your vision with the world.
            </p>

            {/* CTA */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur-lg opacity-75 animate-pulse"></div>
              <Link
                to="/home"
                className="relative inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-2xl hover:shadow-indigo-500/50 border border-indigo-500/50 backdrop-blur-sm animate-gradient-x rounded-md"
              >
                Join the Movement
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-indigo-500/20">
                <div className="text-3xl font-bold text-indigo-400 mb-2">10K+</div>
                <div className="text-gray-300">Active Users</div>
              </div>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-purple-500/20 delay-100">
                <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-gray-300">Communities</div>
              </div>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-blue-500/20 delay-200">
                <div className="text-3xl font-bold text-blue-400 mb-2">1M+</div>
                <div className="text-gray-300">Ideas Shared</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}