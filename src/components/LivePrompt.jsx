import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Copy, Trash2, Save, MessageSquare, Image, Code, User, Plus, MessagesSquare, MoreVertical, Trash, Calendar, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Navigation } from '../App';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

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
  const [conversations, setConversations] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);

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

  // Add new useEffect to load conversations
  useEffect(() => {
    const savedConversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    setConversations(savedConversations);
  }, []);

  // Add helper function to create title from prompt
  const createTitleFromPrompt = (prompt) => {
    return prompt
      .split(/\s+/)
      .slice(0, 7)
      .join(' ')
      .trim() + (prompt.split(/\s+/).length > 7 ? '...' : '');
  };

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    const newMessage = { 
      type: 'user', 
      content: prompt,
      category: promptType === 'chat' ? chatCategory : promptType
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Create new chat if this is the first message
    if (messages.length === 1) { // Only system message exists
      const conversation = {
        id: Date.now(),
        title: createTitleFromPrompt(prompt),
        messages: [...messages, newMessage],
        timestamp: new Date().toISOString(),
        type: promptType, 
        category: chatCategory
      };
      
      setConversations(prev => [conversation, ...prev]);
      setCurrentConversationId(conversation.id);
      localStorage.setItem('conversations', JSON.stringify([conversation, ...conversations]));
    }

    setIsLoading(true);
    setPrompt('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = '60px';  // Reset to minimum height
    }
    
    try {
      const response = await axios({
        method: 'post',
        url: `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }
      });

      const aiResponse = { 
        type: 'ai', 
        content: response.data.candidates[0].content.parts[0].text,
        category: promptType === 'chat' ? chatCategory : promptType
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setResponse(aiResponse.content);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage = { 
        type: 'ai', 
        content: 'Sorry, there was an error processing your request. Please try again later.',
        category: promptType === 'chat' ? chatCategory : promptType
      };
      setMessages(prev => [...prev, errorMessage]);
      setResponse(errorMessage.content);
    } finally {
      setIsLoading(false);
    }
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
      id: currentConversationId || Date.now(),
      title: messages[1]?.content.slice(0, 30) || 'New Chat',
      messages,
      timestamp: new Date().toISOString(),
      type: promptType,
      category: chatCategory
    };
    
    const updatedConversations = currentConversationId 
      ? conversations.map(conv => conv.id === currentConversationId ? conversation : conv)
      : [conversation, ...conversations];
    
    setConversations(updatedConversations);
    setCurrentConversationId(conversation.id);
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));
  };

  // Add message action handlers
  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
    // Show temporary success message
  };

  const handleDeleteMessage = (index) => {
    setMessages(prev => prev.filter((_, i) => i !== index));
  };

  // Add handler for creating new chat
  const handleNewChat = () => {
    const systemMessage = {
      type: 'system',
      content: promptType === 'chat' 
        ? systemMessages.chat[chatCategory]
        : systemMessages[promptType]
    };
    
    setMessages([systemMessage]);
    setCurrentConversationId(null);
    setPrompt('');
  };

  // Add handler for loading conversation
  const handleLoadConversation = (conversation) => {
    setMessages(conversation.messages);
    setPromptType(conversation.type);
    setChatCategory(conversation.category);
    setCurrentConversationId(conversation.id);
  };

  // Add formatted date helper
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return `Today at ${date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit'
      })}`;
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  // Add delete conversation handler
  const handleDeleteConversation = (convId, e) => {
    e.stopPropagation();
    const updatedConversations = conversations.filter(conv => conv.id !== convId);
    setConversations(updatedConversations);
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));
    if (currentConversationId === convId) {
      handleNewChat();
    }
    setActiveDropdown(null);
  };

  // Add click outside handler for action dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.action-dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  // Update resize handler with smooth animation and prevent text selection
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      e.preventDefault();
      document.body.style.userSelect = 'none';
      
      // Add smooth animation with RAF and easing
      const targetWidth = Math.min(Math.max(180, e.clientX), 480);
      const ease = 0.1; // Lower value = smoother animation
      
      requestAnimationFrame(() => {
        const currentWidth = sidebarWidth;
        const diff = targetWidth - currentWidth;
        const newWidth = currentWidth + diff * ease;
        
        setSidebarWidth(newWidth);
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.userSelect = '';
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isResizing, sidebarWidth]);

  // Update message rendering to include code highlighting and actions
  const renderMessageContent = (message) => {
    if (message.type === 'system') {
      return (
        <p className="text-center text-sm text-gray-400">
          {message.content}
        </p>
      );
    }

    return (
      <ReactMarkdown
        components={{
          code: ({node, inline, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                style={atomDark}
                PreTag="div"
                className="rounded-md my-2"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-black/30 rounded px-1" {...props}>
                {children}
              </code>
            );
          },
          p: ({children}) => <p className="mb-4 last:mb-0">{children}</p>
        }}
      >
        {message.content}
      </ReactMarkdown>
    );
  };

  const messageContainerClass = (message) => `
    group relative flex ${
      message.type === 'system' 
        ? 'justify-center' 
        : message.type === 'user' 
          ? 'justify-end' // Changed to end for user messages
          : 'justify-start' // Changed to start for AI messages
    } px-4 py-3
  `;

  const messageContentClass = (message) => `
    max-w-2xl flex items-start gap-4 ${
      message.type === 'system' 
        ? 'justify-center' 
        : message.type === 'user'
          ? 'flex-row-reverse' // Reverse flex direction for user messages
          : 'flex-row'
    }
  `;

  return (
    <div className="min-h-screen bg-[#121212] flex">
      <motion.div // Sidebar
        ref={sidebarRef}
        initial={false}
        animate={{ width: showSidebar ? sidebarWidth : 0 }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 0.1, 0.25, 1], // Custom bezier curve
          dampingRatio: 1
        }}
        className="h-screen bg-[#1a1a1a] border-r border-[#2a2a2a] overflow-hidden relative flex"
      >
        <div className="flex-1 flex flex-col h-full">
          {/* Updated Sidebar Header with dynamic width */}
          <div className="p-4 border-b border-[#2a2a2a] bg-[#181818]">
            <motion.div
              animate={{ 
                width: showSidebar ? Math.max(sidebarWidth - 32, 180) : 0 
              }}
              transition={{ 
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
                dampingRatio: 1
              }}
            >
              <motion.button
                onClick={handleNewChat}
                className="w-full p-3 flex items-center justify-center gap-2 rounded-xl bg-[#6C63FF]/10 hover:bg-[#6C63FF]/20 border border-[#6C63FF]/20 transition-all duration-200 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-5 h-5 text-[#6C63FF] group-hover:scale-110 transition-transform" />
                <span className="text-[#EAEAEA] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  New Chat
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Update conversation list styling */}
          <div className="flex-1 overflow-y-auto py-2 space-y-1">
            {conversations.map((conv) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-2"
              >
                <div // Changed from button to div
                  onClick={() => handleLoadConversation(conv)}
                  className={`w-full p-3 text-left rounded-lg flex items-start gap-3 hover:bg-white/5 transition-colors group relative cursor-pointer ${
                    currentConversationId === conv.id ? 'bg-white/10' : ''
                  }`}
                >
                  {/* Chat Icon with Category Indicator */}
                  <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                    conv.type === 'chat'
                      ? 'bg-violet-500/20 text-violet-300'
                      : conv.type === 'image'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {conv.type === 'chat' ? (
                      <MessageSquare className="w-5 h-5" />
                    ) : conv.type === 'image' ? (
                      <Image className="w-5 h-5" />
                    ) : (
                      <Code className="w-5 h-5" />
                    )}
                  </div>

                  {/* Chat Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-medium text-white truncate">
                        {conv.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-400 truncate flex-1">
                        {conv.messages[conv.messages.length - 1]?.content.slice(0, 40) || 'No messages'}...
                      </p>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {formatDate(conv.timestamp)}
                      </span>
                    </div>
                  </div>

                  {/* Updated Action Buttons */}
                  <div className="absolute right-2 top-2 flex items-center">
                    <div className="relative action-dropdown">
                      <div // Changed from button to div
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === conv.id ? null : conv.id);
                        }}
                        className="p-1 rounded-lg hover:bg-white/10 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </div>
                      
                      {activeDropdown === conv.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-0 top-full mt-1 w-36 py-1 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg z-50"
                        >
                          <div // Changed from button to div
                            onClick={(e) => handleDeleteConversation(conv.id, e)}
                            className="w-full px-3 py-2 text-sm text-rose-400 hover:bg-white/10 flex items-center gap-2 cursor-pointer"
                          >
                            <Trash className="w-4 h-4" />
                            Delete Chat
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Resize Handle */}
        <div
          className="w-1 h-full cursor-ew-resize hover:bg-[#6C63FF]/20 absolute right-0 top-0 group"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsResizing(true);
          }}
        >
          <div className="absolute inset-y-0 right-0 w-4 translate-x-1/2" />
        </div>
      </motion.div>

      {/* Toggle Button Container */}
      <div className="fixed top-4 z-20">
        <motion.button
          onClick={() => setShowSidebar(prev => !prev)}
          animate={{
            left: showSidebar ? `${sidebarWidth + 16}px` : "16px",
          }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="flex items-center gap-2 p-2 rounded-lg bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 transition-colors"
        >
          {showSidebar ? (
            <ChevronRight className="w-5 h-5 text-violet-300" />
          ) : (
            <>
              <ChevronRight className="w-5 h-5 text-violet-300" />
              <span className="text-violet-300">History</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col max-w-[1200px] mx-auto w-full">
        {/* Updated Header */}
        <div className="flex items-center h-14 px-4 border-b border-[#2a2a2a] bg-[#181818] sticky top-0 z-30">
          <div className="flex-1 flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="p-2 rounded-lg hover:bg-[#6C63FF]/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#EAEAEA]" />
            </motion.button>
            
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold bg-gradient-to-r from-[#6C63FF] to-[#FF6B6B] bg-clip-text text-transparent">
                PromptVerse
              </span>
              <div className="h-4 w-px bg-[#2a2a2a]" />
              <span className="text-sm font-medium text-[#EAEAEA]/70">
                Live Prompt Testing
              </span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveConversation}
            className="p-2 rounded-lg bg-[#6C63FF]/10 hover:bg-[#6C63FF]/20 border border-[#6C63FF]/20 text-[#6C63FF]"
          >
            <Save className="w-5 h-5" />
          </motion.button>
        </div>
        
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {/* Chat Container with adjusted padding */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
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
                  className={messageContainerClass(message)}
                >
                  <div className={messageContentClass(message)}>
                    {message.type !== 'system' && (
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-sm ${
                        message.type === 'user' 
                          ? 'bg-[#6C63FF]/20 border border-[#6C63FF]/30' 
                          : message.category === 'image'
                          ? 'bg-[#FF6B6B]/20 border border-[#FF6B6B]/30'
                          : message.category === 'code'
                          ? 'bg-[#4ADE80]/20 border border-[#4ADE80]/30'
                          : 'bg-[#FF6B6B]/20 border border-[#FF6B6B]/30'
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
                    <div className={`rounded-lg p-4 ${
                      message.type === 'system'
                        ? 'bg-[#181818] text-[#EAEAEA]/70 text-sm text-center border border-[#2a2a2a]'
                        : message.type === 'user'
                        ? 'bg-[#6C63FF]/10 text-[#EAEAEA] border border-[#6C63FF]/20'
                        : 'bg-[#181818] text-[#EAEAEA] border border-[#2a2a2a]'
                    }`}>
                      {renderMessageContent(message)}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  variants={loadingVariants}
                  initial="initial"
                  animate="animate"
                  className={messageContainerClass({type: 'ai'})}
                >
                  <div className={messageContentClass({type: 'ai'})}>
                    <div className="w-8 h-8 rounded-sm bg-emerald-600/80 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="flex gap-1">
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-emerald-500"
                      />
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-emerald-500"
                      />
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-emerald-500"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-[#2a2a2a] bg-[#181818]">
            <div className="max-w-3xl mx-auto p-4">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={handlePromptChange}
                    placeholder="Type your prompt here..."
                    className="w-full bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-3 pr-12 text-[#EAEAEA] placeholder-[#EAEAEA]/40 focus:border-[#6C63FF]/50 focus:ring-2 focus:ring-[#6C63FF]/20 text-base min-h-[52px] max-h-[200px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <div className="absolute bottom-2 right-2 text-[#EAEAEA]/30 text-xs">
                    {characterCount}/1000
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 h-[52px] bg-[#6C63FF]/10 hover:bg-[#6C63FF]/20 rounded-lg border border-[#6C63FF]/30 text-[#EAEAEA] flex items-center gap-2"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span className="hidden sm:inline text-sm">{promptType}</span>
                    </motion.button>

                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full mb-2 right-0 w-48 bg-[#181818] rounded-xl border border-[#2a2a2a] overflow-hidden backdrop-blur-xl"
                      >
                        {promptTypes.map(({ id, icon: Icon, label }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => {
                              setPromptType(id);
                              if (id !== 'chat') {
                                setIsDropdownOpen(false);
                              }
                            }}
                            className={`w-full px-4 py-2 flex items-center gap-2 ${
                              promptType === id
                                ? 'bg-[#6C63FF]/20 text-[#EAEAEA]'
                                : 'text-[#EAEAEA]/70 hover:bg-[#6C63FF]/10'
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
                                    ? 'bg-[#6C63FF]/20 text-[#EAEAEA]'
                                    : 'text-[#EAEAEA]/70 hover:bg-[#6C63FF]/10'
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
                    className="w-[52px] h-[52px] bg-[#6C63FF] hover:bg-[#6C63FF]/90 rounded-lg flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
