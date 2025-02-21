import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Export these components so they can be shared
export const Stars = () => {
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

export const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.55-1.42-1.27-1.7-1.27-1.7-1.03-.7.09-.7.09-.7 1.15.09 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.24 3.33.94.09-.76.4-1.24.73-1.52-2.57-.28-5.27-1.27-5.27-5.67 0-1.24.45-2.27 1.18-3.06-.12-.28-.52-1.46.12-3.03 0 0 .97-.3 3.18 1.18a11.02 11.02 0 015.85 0c2.21-1.48 3.18-1.18 3.18-1.18.64 1.57.24 2.75.12 3.03.73.79 1.18 1.82 1.18 3.06 0 4.4-2.7 5.39-5.27 5.67.4.36.79 1.09.79 2.21v3.27c0 .29.18.62.73.53A11 11 0 0012 1.27" />
  </svg>
);

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
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-violet-900/20 to-[#0f1625] opacity-90" />
        <Stars />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
        {/* ...existing background effects... */}
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

        <div className="space-y-6">
          {/* Title section */}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              {/* Email field */}
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

              {/* Password field */}
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

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 rounded border-violet-500/30 text-violet-500 focus:ring-violet-500/50 bg-violet-950/50" />
                <span className="ml-2 text-violet-300">Remember me</span>
              </label>
              <button 
                onClick={() => navigate('/forgot-password')}
                className="text-violet-400 hover:text-violet-300"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In button */}
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

            {/* Create account link */}
            <p className="text-center text-sm text-violet-300">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/signup')}
                className="text-violet-400 hover:text-violet-300 font-medium"
              >
                Create account
              </button>
            </p>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-violet-500/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-violet-950 text-violet-400">Or continue with</span>
              </div>
            </div>

            {/* Social buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-violet-950/50 rounded-lg border border-violet-500/30 text-violet-200 hover:bg-violet-900/50 transition-colors"
              >
                <GoogleIcon />
                <span>Google</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-violet-950/50 rounded-lg border border-violet-500/30 text-violet-200 hover:bg-violet-900/50 transition-colors"
              >
                <GithubIcon />
                <span>Github</span>
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;