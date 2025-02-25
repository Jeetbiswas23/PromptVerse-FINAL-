import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Copy, Check, Terminal, MessageSquare, Image, Code, User } from 'lucide-react';
import { Navigation } from '../App';

export default function LivePrompt() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [promptType, setPromptType] = useState('chat');
  const [chatCategory, setChatCategory] = useState('casual');
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const promptTypes = [
    { id: 'chat', icon: MessageSquare, label: 'Chat Prompt' },
    { id: 'image', icon: Image, label: 'Image Prompt' },
    { id: 'code', icon: Code, label: 'Programming Prompt' },
  ];

  const chatCategories = [
    { id: 'casual', label: 'Casual Chat' },
    { id: 'professional', label: 'Professional' },
    { id: 'creative', label: 'Creative Writing' },
  ];

  // Add system message templates
  const systemMessages = {
    chat: {
      casual: "You are a friendly, casual chatbot having a conversation.",
      professional: "You are a professional assistant providing formal guidance.",
      creative: "You are a creative writing assistant helping with storytelling and ideas."
    },
    image: "You are an image generation assistant. Describe images in detail.",
    code: "You are a programming assistant helping with code and technical questions."
  };

  // Initialize chat with context message
  useEffect(() => {
    const getContextMessage = () => {
      if (promptType === 'chat') {
        return systemMessages.chat[chatCategory];
      }
      return systemMessages[promptType];
    };

    setMessages([{
      type: 'system',
      content: getContextMessage()
    }]);
  }, [promptType, chatCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    const newMessage = { 
      type: 'user', 
      content: prompt,
      category: promptType === 'chat' ? chatCategory : promptType
    };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);
    setPrompt('');
    
    // Simulate API call with context-aware response
    setTimeout(() => {
      const aiResponse = { 
        type: 'ai', 
        content: `[${promptType.toUpperCase()}${promptType === 'chat' ? ` - ${chatCategory}` : ''}] Response: ${newMessage.content}`,
        category: promptType === 'chat' ? chatCategory : promptType
      };
      setMessages(prev => [...prev, aiResponse]);
      setResponse(aiResponse.content);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Add click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <Navigation />
      
      <div className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent mb-4">
            Live Prompt Testing
          </h1>
        </motion.div>

        {/* Chat Container - directly after header */}
        <div className="flex-1 flex flex-col min-h-[600px] bg-violet-900/10 rounded-xl border border-violet-500/20">
          {/* Messages Area */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-6"
          >
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.type === 'system' 
                    ? 'justify-center' 
                    : message.type === 'user' 
                    ? 'justify-end' 
                    : 'justify-start'
                }`}
              >
                <div className={`flex ${
                  message.type === 'system' 
                    ? 'flex-col items-center'
                    : message.type === 'user' 
                    ? 'flex-row-reverse' 
                    : 'flex-row'
                } items-start gap-3 ${
                  message.type === 'system' ? 'max-w-md' : 'max-w-[80%]'
                }`}>
                  {message.type !== 'system' && (
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-violet-500/20' 
                        : message.category === 'image'
                        ? 'bg-emerald-500/20'
                        : message.category === 'code'
                        ? 'bg-blue-500/20'
                        : 'bg-fuchsia-500/20'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-5 h-5 text-violet-300" />
                      ) : message.category === 'image' ? (
                        <Image className="w-5 h-5 text-emerald-300" />
                      ) : message.category === 'code' ? (
                        <Code className="w-5 h-5 text-blue-300" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-fuchsia-300" />
                      )}
                    </div>
                  )}
                  <div className={`rounded-xl p-4 ${
                    message.type === 'system'
                      ? 'bg-gray-900/40 text-gray-300 text-sm text-center'
                      : message.type === 'user'
                      ? 'bg-violet-500/20 text-violet-100'
                      : message.category === 'image'
                      ? 'bg-emerald-900/40 text-emerald-100'
                      : message.category === 'code'
                      ? 'bg-blue-900/40 text-blue-100'
                      : 'bg-black/40 text-fuchsia-100'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-violet-300"
              >
                <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce delay-200" />
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-violet-500/20">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your prompt here..."
                className="flex-1 bg-black/40 rounded-xl border border-violet-500/30 p-4 text-violet-100 placeholder-violet-400/50 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30 text-lg min-h-[60px] max-h-32 resize-none"
                rows="1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <div className="flex gap-2">
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="h-full px-4 bg-violet-500/20 hover:bg-violet-500/30 rounded-xl border border-violet-500/40 text-violet-200 flex items-center justify-center gap-2"
                  >
                    {promptType === 'chat' ? (
                      <MessageSquare className="w-5 h-5" />
                    ) : promptType === 'image' ? (
                      <Image className="w-5 h-5" />
                    ) : (
                      <Code className="w-5 h-5" />
                    )}
                    <span className="hidden sm:inline text-sm">{
                      promptType === 'chat' ? chatCategory : promptType
                    }</span>
                  </motion.button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full mb-2 right-0 w-48 bg-black/90 rounded-xl border border-violet-500/20 overflow-hidden backdrop-blur-xl"
                    >
                      {promptTypes.map(({ id, icon: Icon, label }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => {
                            setPromptType(id);
                            if (id !== 'chat') setIsDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 flex items-center gap-2 ${
                            promptType === id
                              ? 'bg-violet-500/20 text-violet-200'
                              : 'text-violet-300 hover:bg-violet-500/10'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{label}</span>
                        </button>
                      ))}
                      
                      {/* Chat Categories Submenu */}
                      {promptType === 'chat' && (
                        <>
                          <div className="w-full h-px bg-violet-500/20 my-1" />
                          {chatCategories.map(({ id, label }) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() => {
                                setChatCategory(id);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-2 flex items-center gap-2 ${
                                chatCategory === id
                                  ? 'bg-violet-500/20 text-violet-200'
                                  : 'text-violet-300 hover:bg-violet-500/10'
                              }`}
                            >
                              <span className="w-4" />
                              <span>{label}</span>
                            </button>
                          ))}
                        </>
                      )}
                    </motion.div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="px-6 bg-violet-500/20 hover:bg-violet-500/30 rounded-xl border border-violet-500/40 text-violet-200 flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
