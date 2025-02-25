import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Copy, Check, Terminal, Settings, User } from 'lucide-react';
import { Navigation } from '../App';

export default function LivePrompt() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResponse(`Generated response for: ${prompt}`);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Hexagonal Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-fuchsia-900/20"></div>
      
      <Navigation />
      
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent mb-6">
            Live Prompt Testing
          </h1>
          <p className="text-violet-300/70 text-lg">
            Craft and refine your prompts in our futuristic laboratory
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-violet-900/10 to-fuchsia-900/10 backdrop-blur-xl rounded-2xl border border-violet-500/20 p-8 shadow-[0_0_50px_-12px] shadow-violet-500/20 hover:shadow-violet-500/30 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt here..."
                    className="w-full h-56 bg-black/40 rounded-xl border border-violet-500/30 p-6 text-violet-100 placeholder-violet-400/50 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30 transition-all duration-300 text-lg"
                  />
                  <div className="absolute top-3 right-3 text-violet-400/50">
                    <Terminal className="w-5 h-5" />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 hover:from-violet-500/30 hover:to-fuchsia-500/30 rounded-xl border border-violet-500/40 text-violet-200 flex items-center justify-center space-x-3 text-lg font-medium transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Test Prompt</span>
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-bl from-violet-900/10 to-fuchsia-900/10 backdrop-blur-xl rounded-2xl border border-violet-500/20 p-8 shadow-[0_0_50px_-12px] shadow-violet-500/20 hover:shadow-violet-500/30 transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-violet-200 flex items-center gap-2">
                <Terminal className="w-5 h-5" /> Response
              </h3>
              {response && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="flex items-center space-x-2 text-violet-400 text-sm bg-violet-500/10 px-4 py-2 rounded-lg border border-violet-500/30"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied!" : "Copy Response"}</span>
                </motion.button>
              )}
            </div>
            <div className="min-h-[16rem] bg-black/40 rounded-xl border border-violet-500/30 p-6">
              <pre className="text-violet-300 whitespace-pre-wrap text-lg">
                {response || 'Your response will materialize here...'}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
