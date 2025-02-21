import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowLeft, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Stars, GoogleIcon, GithubIcon } from './SignIn';
import { AuthContext } from '../App';

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Create the credentials object
        const credentials = new PasswordCredential({
          id: formData.email,
          password: formData.password,
          name: formData.name
        });

        // Store credentials if supported
        if (navigator.credentials) {
          await navigator.credentials.store(credentials);
        }

        // Store user data
        localStorage.setItem('tempUser', JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }));

        navigate('/signin');
      } catch (error) {
        console.error('Error storing credentials:', error);
        // Continue with normal flow even if credential storage fails
        localStorage.setItem('tempUser', JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }));
        navigate('/signin');
      }
    }
  };

  // Back button should now go to signin
  const handleBack = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
      {/* Background effects - same as SignIn */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-violet-900/20 to-[#0f1625] opacity-90" />
        <Stars />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md p-8">
        {/* Back button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={handleBack}
          className="flex items-center space-x-2 text-violet-300 mb-8 hover:text-violet-100 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to sign in</span>
        </motion.button>

        <div className="space-y-6">
          {/* Title */}
          <div className="text-center">
            <motion.h2 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-3xl font-bold bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent"
            >
              Create Account
            </motion.h2>
            <p className="text-violet-300/70 mt-2">Join PromptVerse today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-violet-400" />
              </div>
              <input
                type="text"
                placeholder="Full name"
                className={`w-full pl-10 pr-4 py-3 bg-violet-950/50 border ${
                  errors.name ? 'border-red-500/50' : 'border-violet-500/30'
                } rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name ? 'ring-red-500/50' : 'ring-violet-500/50'
                } text-violet-100 placeholder-violet-400`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                name="name"
                autoComplete="name"
              />
              {errors.name && (
                <p className="text-sm text-red-400 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-violet-400" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className={`w-full pl-10 pr-4 py-3 bg-violet-950/50 border ${
                  errors.email ? 'border-red-500/50' : 'border-violet-500/30'
                } rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? 'ring-red-500/50' : 'ring-violet-500/50'
                } text-violet-100 placeholder-violet-400`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                name="username"
                autoComplete="username"
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password fields */}
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-violet-400" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full pl-10 pr-4 py-3 bg-violet-950/50 border ${
                    errors.password ? 'border-red-500/50' : 'border-violet-500/30'
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password ? 'ring-red-500/50' : 'ring-violet-500/50'
                  } text-violet-100 placeholder-violet-400`}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  name="new-password"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="text-sm text-red-400 mt-1">{errors.password}</p>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-violet-400" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className={`w-full pl-10 pr-4 py-3 bg-violet-950/50 border ${
                    errors.confirmPassword ? 'border-red-500/50' : 'border-violet-500/30'
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? 'ring-red-500/50' : 'ring-violet-500/50'
                  } text-violet-100 placeholder-violet-400`}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  name="confirm-password"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-400 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full relative overflow-hidden py-3 px-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-medium shadow-lg group"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
              <span className="relative">Create Account</span>
            </motion.button>

            {/* Social signup */}
            <div className="relative text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-violet-500/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-violet-950 text-violet-400">Or sign up with</span>
              </div>
            </div>

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

export default SignUp;