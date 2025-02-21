import React from 'react';
import { Command, Share2, GitBranch, Star, DollarSign, Trophy, Beaker, MessageSquare } from 'lucide-react';

const Stars = () => {
  return (
    <div className="stars-container animate-float">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}
    </div>
  );
};

const App = () => {
  const features = [
    { icon: <Share2 className="w-6 h-6" />, title: "Prompt Marketplace", description: "Share and discover high-quality AI prompts across multiple categories" },
    { icon: <Command className="w-6 h-6" />, title: "Live Prompt Testing", description: "Test prompts in real-time and optimize outputs directly on platform" },
    { icon: <Beaker className="w-6 h-6" />, title: "Prompt Optimization Lab", description: "AI-powered suggestions & analytics to enhance effectiveness" },
    { icon: <Star className="w-6 h-6" />, title: "Community Reviews", description: "Rate, review, and comment on prompts to highlight the best ones" },
    { icon: <GitBranch className="w-6 h-6" />, title: "Version Control", description: "Iterate on prompts with a Git-like versioning system" },
    { icon: <MessageSquare className="w-6 h-6" />, title: "Collaborative Building", description: "Work together to refine prompts for better outputs" },
    { icon: <DollarSign className="w-6 h-6" />, title: "Prompt Monetization", description: "Sell premium prompts or offer exclusive access" },
    { icon: <Trophy className="w-6 h-6" />, title: "Challenge Mode", description: "Compete to create the most effective prompts" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Enhanced animated background with multiple layers */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#0a0a1a] to-[#0f1625] opacity-90" />
        
        {/* Add Stars component */}
        <Stars />
        
        {/* Noise texture */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5" />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
      </div>

      {/* Navigation with lighter hover effects */}
      <nav className="relative z-10 backdrop-blur-sm border-b border-white/5 sticky top-0">
        <div className="max-w-7xl mx-auto flex justify-end items-center p-4">
          <div className="flex space-x-6">
            <button className="px-4 py-2 text-gray-300 hover:text-white transition-all duration-300">Blog</button>
            <button className="px-4 py-2 text-gray-300 hover:text-white transition-all duration-300">Get in touch</button>
            <button className="px-6 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10">
              Book a call
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with refined gradients */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-32">
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="hero-text text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default animate-shine">
              PromptVerse
            </h1>
            <h2 className="text-5xl font-bold mb-4 leading-tight">
              Create
              <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent px-4">
                powerful
              </span>
              <br />
              <span className="text-gray-200">
                AI prompts
              </span>
            </h2>
            <span className="text-sm text-gray-400 px-6 py-3 rounded-full border border-white/5 hover:border-white/10 transition-all duration-300">
              Next Generation AI Platform
            </span>
          </div>

          {/* Features Grid with subtle effects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-[#0f1625]/30 rounded-xl border border-white/5 hover:bg-[#0f1625]/50 transition-all duration-300"
              >
                <div className="text-gray-300 mb-4 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-200">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;