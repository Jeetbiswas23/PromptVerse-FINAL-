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
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent mb-4">
            Live Prompt Testing
          </h1>
          <p className="text-violet-300/70">
            Test and refine your prompts in real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-violet-900/10 backdrop-blur-xl rounded-xl border border-violet-500/20 p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt here..."
                  className="w-full h-48 bg-black/30 rounded-lg border border-violet-500/20 p-4 text-violet-100 placeholder-violet-400/50 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-violet-500/20 hover:bg-violet-500/30 rounded-lg border border-violet-500/40 text-violet-200 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Test Prompt</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-violet-900/10 backdrop-blur-xl rounded-xl border border-violet-500/20 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-violet-200">Response</h3>
              {response && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="flex items-center space-x-2 text-violet-400 text-sm"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </motion.button>
              )}
            </div>
            <div className="min-h-[12rem] bg-black/30 rounded-lg border border-violet-500/20 p-4">
              <pre className="text-violet-300 whitespace-pre-wrap">
                {response || 'Response will appear here...'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
