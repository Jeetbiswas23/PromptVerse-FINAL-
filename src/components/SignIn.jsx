import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowLeft, Github, Google } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0">
        {/* Copy the background effects from App.jsx */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-violet-900/20 to-[#0f1625] opacity-90" />
        <Stars />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
        {/* ...other background effects... */}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md p-8">
        {/* Back button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-violet-300 mb-8 hover:text-violet-100 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to home</span>
        </motion.button>

        {/* Rest of your existing SignIn content */}
        <div className="space-y-6">
          <div className="text-center">
            <motion.h2 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-3xl font-bold bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent"
            >
              Welcome to PromptVerse
            </motion.h2>
            <p className="text-violet-300/70 mt-2">Sign in to continue your journey</p>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-violet-950/50 rounded-lg border border-violet-500/30 text-violet-200 hover:bg-violet-900/50 transition-colors"
            >
              <Google size={20} />
              <span>Google</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-violet-950/50 rounded-lg border border-violet-500/30 text-violet-200 hover:bg-violet-900/50 transition-colors"
            >
              <Github size={20} />
              <span>Github</span>
            </motion.button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-violet-500/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-violet-950 text-violet-400">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-violet-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3 bg-violet-950/50 border border-violet-500/30 rounded-lg focus:outline-none focus:ring-2 ring-violet-500/50 text-violet-100 placeholder-violet-400"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <div className="absolute inset-0 rounded-lg bg-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-violet-400" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 bg-violet-950/50 border border-violet-500/30 rounded-lg focus:outline-none focus:ring-2 ring-violet-500/50 text-violet-100 placeholder-violet-400"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <div className="absolute inset-0 rounded-lg bg-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 rounded border-violet-500/30 text-violet-500 focus:ring-violet-500/50 bg-violet-950/50" />
                <span className="ml-2 text-violet-300">Remember me</span>
              </label>
              <button className="text-violet-400 hover:text-violet-300">Forgot password?</button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full relative overflow-hidden py-3 px-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-medium shadow-lg group"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
              <span className="relative">Sign In</span>
            </motion.button>

            <p className="text-center text-sm text-violet-300">
              Don't have an account?{' '}
              <button className="text-violet-400 hover:text-violet-300 font-medium">
                Create account
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;