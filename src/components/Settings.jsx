import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Sun, Key, Save, Settings as SettingsIcon, ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

// Remove Stars component

function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: {
      promptUpdates: true,
      newFeatures: true,
      communityHighlights: false,
      marketplaceAlerts: true
    },
    appearance: {
      theme: 'dark',
      reduceMotion: false,
      fontSize: 'medium'
    },
    apiKeys: {
      openAI: '',
      anthropic: '',
      stability: ''
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSave = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('userSettings', JSON.stringify(settings));
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#EAEAEA] overflow-hidden">
      {/* Updated background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#6C63FF]/20 to-[#121212] opacity-90" />
        
        {/* Noise texture */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
        
        {/* Updated gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C63FF]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[#FF6B6B]/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#4ADE80]/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5" />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-[#6C63FF] hover:text-[#FF6B6B] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back</span>
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4"
          >
            <SettingsIcon className="w-8 h-8 text-[#6C63FF]" />
            <h1 className="text-4xl font-bold text-[#6C63FF]">
              Settings
            </h1>
          </motion.div>
          
          {/* Empty div for flex spacing */}
          <div className="w-24"></div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Appearance Section */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#121212]/80 border border-[#6C63FF]/20 rounded-2xl overflow-hidden"
            >
              <div className="p-6 backdrop-blur-xl border-b border-[#6C63FF]/20">
                <div className="flex items-center space-x-3">
                  {settings.appearance.theme === 'dark' ? (
                    <Moon className="w-6 h-6 text-[#6C63FF]" />
                  ) : (
                    <Sun className="w-6 h-6 text-[#6C63FF]" />
                  )}
                  <h2 className="text-2xl font-semibold theme-text">Appearance</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {/* Theme Selector */}
                <div className="grid grid-cols-3 gap-4">
                  {['light', 'dark', 'system'].map((themeOption) => (
                    <motion.button
                      key={themeOption}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSettingChange('appearance', 'theme', themeOption)}
                      className={`p-4 rounded-xl border ${
                        settings.appearance.theme === themeOption
                          ? 'border-[#6C63FF] bg-[#6C63FF]/20'
                          : 'border-[#6C63FF]/20 hover:bg-[#6C63FF]/10'
                      } transition-all duration-200`}
                    >
                      <span className="capitalize theme-text">{themeOption}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Font Size Selector */}
                <div className="space-y-2">
                  <label className="text-sm theme-text-secondary">Font Size</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['small', 'medium', 'large'].map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSettingChange('appearance', 'fontSize', size)}
                        className={`p-4 rounded-xl border ${
                          settings.appearance.fontSize === size
                            ? 'border-[#6C63FF] bg-[#6C63FF]/20'
                            : 'border-[#6C63FF]/20 hover:bg-[#6C63FF]/10'
                        } transition-all duration-200`}
                      >
                        <span className="capitalize theme-text">{size}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* API Keys Section */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#121212]/80 border border-[#6C63FF]/20 rounded-2xl overflow-hidden"
            >
              <div className="p-6 backdrop-blur-xl border-b border-[#6C63FF]/20">
                <div className="flex items-center space-x-3">
                  <Key className="w-6 h-6 text-[#6C63FF]" />
                  <h2 className="text-2xl font-semibold theme-text">API Keys</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {Object.entries(settings.apiKeys).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm theme-text-secondary capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()} API Key
                    </label>
                    <div className="relative group">
                      <input
                        type="password"
                        value={value}
                        onChange={(e) => handleSettingChange('apiKeys', key, e.target.value)}
                        placeholder={`Enter your ${key} API key`}
                        className="w-full bg-[#121212]/80 border border-[#6C63FF]/20 rounded-xl px-4 py-3 text-[#EAEAEA] placeholder:text-[#6C63FF]/50 focus:outline-none focus:border-[#6C63FF] transition-all duration-200"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6C63FF]/10 to-[#FF6B6B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Notifications Section */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#121212]/80 border border-[#6C63FF]/20 rounded-2xl overflow-hidden"
            >
              <div className="p-6 backdrop-blur-xl border-b border-[#6C63FF]/20">
                <div className="flex items-center space-x-3">
                  <Bell className="w-6 h-6 text-[#6C63FF]" />
                  <h2 className="text-2xl font-semibold theme-text">Notifications</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="theme-text capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSettingChange('notifications', key, !value)}
                      className={`w-14 h-7 rounded-full relative transition-colors duration-300 ${
                        value ? 'bg-[#6C63FF]/70' : 'bg-[#121212]'
                      }`}
                    >
                      <motion.div
                        animate={{ x: value ? 28 : 4 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="w-5 h-5 rounded-full bg-white absolute top-1"
                      />
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="fixed bottom-8 right-8 px-8 py-4 bg-[#6C63FF] hover:bg-[#FF6B6B] rounded-xl flex items-center space-x-3 shadow-lg shadow-[#6C63FF]/20"
        >
          <Save className="w-5 h-5" />
          <span className="font-semibold">Save Changes</span>
        </motion.button>
      </div>
    </div>
  );
}

export default Settings;