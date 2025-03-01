import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Copy, Trash2, Save, MessageSquare, Image, Code, User } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Navigation } from '../App';
import { useNavigate } from 'react-router-dom';

export default function LivePrompt() {
  const navigate = useNavigate();
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
  const textareaRef = useRef(null);
  const [characterCount, setCharacterCount] = useState(0);

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

  // Add route protection
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

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
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = '60px';  // Reset to minimum height
    }
    
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

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const messageVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const loadingVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Update textarea onChange handler
  const handlePromptChange = (e) => {
    const value = e.target.value;
    setPrompt(value);
    setCharacterCount(value.length);
    adjustTextareaHeight();
  };

  // Add save conversation handler
  const handleSaveConversation = () => {
    const conversation = {
      messages,
      timestamp: new Date().toISOString(),
      type: promptType,
      category: chatCategory
    };
    
    const savedConversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    localStorage.setItem('conversations', JSON.stringify([...savedConversations, conversation]));
  };

  // Add message action handlers
  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
    // Show temporary success message
  };

  const handleDeleteMessage = (index) => {
    setMessages(prev => prev.filter((_, i) => i !== index));
  };

  // Update message rendering to include code highlighting and actions
  const renderMessageContent = (content, category) => {
    if (category === 'code') {
      return (
        <SyntaxHighlighter 
          language="javascript" 
          style={atomDark}
          className="rounded-lg"
        >
          {content}
        </SyntaxHighlighter>
      );
    }
    return <p className="whitespace-pre-wrap">{content}</p>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1f] via-[#1a1a3f] to-[#0a0a2f] flex flex-col relative overflow-hidden">
      {/* Add animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] -top-20 -right-20 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[500px] h-[500px] -bottom-40 -left-20 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Navigation />
      
      <div className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full flex flex-col relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent mb-4 tracking-tight">
            Live Prompt Testing
          </h1>
          <div className="w-32 h-1 mx-auto bg-gradient-to-r from-violet-500 via-cyan-500 to-fuchsia-500 rounded-full blur-sm" />
        </motion.div>

        <div className="absolute top-4 right-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveConversation}
            className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10"
          >
            <Save className="w-5 h-5 text-violet-300" />
          </motion.button>
        </div>

        <div className="flex-1 flex flex-col min-h-[600px] bg-black/30 backdrop-blur-2xl rounded-2xl border border-white/10 relative shadow-[0_0_50px_-12px] shadow-violet-500/20 before:absolute before:inset-0 before:rounded-2xl before:border before:border-violet-500/20 before:p-[1px] before:bg-gradient-to-b before:from-violet-500/20 before:to-transparent before:-z-10">
          {/* Messages area with updated styling */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 absolute inset-0 bottom-[80px] scroll-smooth"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  variants={messageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                  className={`flex ${message.type === 'system' ? 'justify-center' : message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="group relative">
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
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-sm ${
                          message.type === 'user' 
                            ? 'bg-violet-500/30 border border-violet-400/20' 
                            : message.category === 'image'
                            ? 'bg-emerald-500/30 border border-emerald-400/20'
                            : message.category === 'code'
                            ? 'bg-blue-500/30 border border-blue-400/20'
                            : 'bg-fuchsia-500/30 border border-fuchsia-400/20'
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
                      <div className={`rounded-2xl p-4 backdrop-blur-sm shadow-lg ${
                        message.type === 'system'
                          ? 'bg-gray-900/40 text-gray-300 text-sm text-center border border-gray-700/30'
                          : message.type === 'user'
                          ? 'bg-violet-500/20 text-violet-100 border border-violet-500/30'
                          : message.category === 'image'
                          ? 'bg-emerald-900/30 text-emerald-100 border border-emerald-500/30'
                          : message.category === 'code'
                          ? 'bg-blue-900/30 text-blue-100 border border-blue-500/30'
                          : 'bg-black/30 text-fuchsia-100 border border-fuchsia-500/30'
                      }`}>
                        {renderMessageContent(message.content, message.category)}
                      </div>
                    </div>
                    {message.type !== 'system' && (
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleCopyMessage(message.content)} className="p-1 rounded-lg bg-black/20 hover:bg-black/40 text-violet-300">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteMessage(index)} className="p-1 rounded-lg bg-black/20 hover:bg-black/40 text-rose-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  variants={loadingVariants}
                  initial="initial"
                  animate="animate"
                  className="flex items-center gap-3"
                >
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="flex gap-3"
                  >
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={false}
            animate={{
              height: textareaRef.current ? Math.min(textareaRef.current.scrollHeight + 32, 300) : 80
            }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/60 backdrop-blur-2xl before:absolute before:inset-0 before:border-t before:border-violet-500/20 before:bg-gradient-to-t before:from-violet-500/5 before:to-transparent"
          >
            <form onSubmit={handleSubmit} className="flex gap-4 items-start p-4 relative z-10">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={handlePromptChange}
                  placeholder="Type your prompt here..."
                  className="w-full bg-black/40 rounded-xl border border-violet-500/30 p-4 pr-16 text-violet-100 placeholder-violet-400/50 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30 text-lg min-h-[60px] max-h-[300px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="absolute bottom-2 right-2 text-violet-400/50 text-sm">
                  <span>{characterCount}/1000</span>
                </div>
              </div>
              <div className="flex gap-2 h-[60px]">
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-full px-4 bg-violet-500/20 hover:bg-violet-500/30 rounded-xl border border-violet-500/40 text-violet-200 flex items-center justify-center gap-2 transition-colors duration-200 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                  className="px-6 bg-violet-500/20 hover:bg-violet-500/30 rounded-xl border border-violet-400/20 text-violet-200 flex items-center justify-center transition-all duration-200 backdrop-blur-sm relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Send className="w-5 h-5 relative z-10" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
