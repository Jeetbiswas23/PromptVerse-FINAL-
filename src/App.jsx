import React from 'react';
import { Command, Share2, GitBranch, Star, DollarSign, Trophy, Beaker, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Enhanced animated background with multiple layers */}
      <div className="fixed inset-0 z-0">
        {/* Updated base gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-violet-900/20 to-[#0f1625] opacity-90" />
        
        {/* Add Stars component */}
        <Stars />
        
        {/* Noise texture */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
        
        {/* Updated gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
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

      {/* Hero Section with Framer Motion */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <motion.h1
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-8xl font-bold mb-6 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent cursor-default animate-shine"
            >
              PromptVerse
            </motion.h1>
            <h2 className="text-5xl font-bold mb-4 leading-tight">
              Create
              <span className="bg-gradient-to-r from-violet-200 to-purple-300 bg-clip-text text-transparent px-4">
                powerful
              </span>
              <br />
              <span className="text-violet-100">
                AI prompts
              </span>
            </h2>

            {/* Animated Get Started Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="futuristic-button group relative my-8 px-14 py-4 overflow-hidden rounded-xl bg-violet-950/30 backdrop-blur-md"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-50" />
              </div>
              <div className="absolute inset-[1px] rounded-xl bg-gradient-to-b from-violet-950/50 to-violet-900/50 backdrop-blur-sm" />
              <div className="absolute inset-0 rounded-xl border border-violet-500/20 group-hover:border-violet-400/40 transition-colors duration-500" />
              <div className="relative flex items-center space-x-2">
                <span className="font-bold text-lg bg-gradient-to-r from-violet-200 via-white to-violet-200 bg-clip-text text-transparent group-hover:text-white transition-all duration-300">
                  Get Started
                </span>
                <svg className="w-4 h-4 text-violet-300 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="absolute -inset-1/2 group-hover:opacity-100 opacity-0 transition-opacity duration-500">
                <div className="absolute inset-0 blur-2xl bg-violet-600/20" />
              </div>
            </motion.button>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-violet-200/70 px-6 py-3 rounded-full border border-violet-500/10 hover:border-violet-500/20 transition-all duration-300"
            >
              Next Generation AI Platform
            </motion.span>
          </motion.div>

          {/* Animated Features Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                className="feature-card group p-6 bg-violet-900/10 rounded-xl border border-violet-500/10 hover:bg-violet-800/20 backdrop-blur-sm"
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="text-violet-300 mb-4 block"
                >
                  {feature.icon}
                </motion.span>
                <h3 className="text-lg font-semibold mb-2 text-violet-100">
                  {feature.title}
                </h3>
                <p className="text-violet-300/70 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default App;