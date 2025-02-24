import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Sun, Key, Save } from 'lucide-react';

const Settings = () => {
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
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent mb-8">
          Settings
        </h1>

        {/* Notifications Section */}
        <section className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-semibold text-violet-100">Notifications</h2>
          </div>
          <div className="space-y-4 bg-violet-900/10 rounded-xl p-6 backdrop-blur-sm border border-violet-500/20">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-violet-200 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSettingChange('notifications', key, !value)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    value ? 'bg-violet-500' : 'bg-violet-900'
                  }`}
                >
                  <motion.div
                    animate={{ x: value ? 24 : 2 }}
                    className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                  />
                </motion.button>
              </div>
            ))}
          </div>
        </section>

        {/* Appearance Section */}
        <section className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            {settings.appearance.theme === 'dark' ? (
              <Moon className="w-6 h-6 text-violet-400" />
            ) : (
              <Sun className="w-6 h-6 text-violet-400" />
            )}
            <h2 className="text-2xl font-semibold text-violet-100">Appearance</h2>
          </div>
          <div className="space-y-6 bg-violet-900/10 rounded-xl p-6 backdrop-blur-sm border border-violet-500/20">
            <div className="flex items-center justify-between">
              <label className="text-violet-200">Theme</label>
              <select
                value={settings.appearance.theme}
                onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                className="bg-violet-950/50 border border-violet-500/20 rounded-lg px-4 py-2 text-violet-300"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-violet-200">Font Size</label>
              <select
                value={settings.appearance.fontSize}
                onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                className="bg-violet-950/50 border border-violet-500/20 rounded-lg px-4 py-2 text-violet-300"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </section>

        {/* API Keys Section */}
        <section className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Key className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-semibold text-violet-100">API Keys</h2>
          </div>
          <div className="space-y-6 bg-violet-900/10 rounded-xl p-6 backdrop-blur-sm border border-violet-500/20">
            {Object.entries(settings.apiKeys).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="text-violet-200 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()} API Key
                </label>
                <input
                  type="password"
                  value={value}
                  onChange={(e) => handleSettingChange('apiKeys', key, e.target.value)}
                  placeholder={`Enter your ${key} API key`}
                  className="w-full bg-violet-950/50 border border-violet-500/20 rounded-lg px-4 py-2 text-violet-300 focus:outline-none focus:border-violet-400"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="fixed bottom-8 right-8 px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg flex items-center space-x-2 shadow-lg"
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Settings;