import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Copy, Trash2, Save, MessageSquare, Image, Code, User, Plus, MessagesSquare, MoreVertical, Trash, Calendar, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Navigation } from '../App';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

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
    } px-4 py-6 hover:bg-black/10 transition-colors
  `;

  const messageContentClass = (message) => `
    max-w-2xl flex items-start gap-6 ${
      message.type === 'system' 
        ? 'justify-center' 
        : message.type === 'user'
          ? 'flex-row-reverse' // Reverse flex direction for user messages
          : 'flex-row'
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1f] via-[#1a1a3f] to-[#0a0a2f] flex">
      {/* Updated Chat History Sidebar */}
      <motion.div 
        initial={false}
        animate={{ width: showSidebar ? 320 : 0 }}
        className="h-screen bg-black/40 backdrop-blur-2xl border-r border-white/10 overflow-hidden relative"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/10 bg-black/20">
            <button
              onClick={handleNewChat}
              className="w-full p-3 flex items-center justify-center gap-2 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 transition-all duration-200 group"
            >
              <Plus className="w-5 h-5 text-violet-300 group-hover:scale-110 transition-transform" />
              <span className="text-violet-100 font-medium">New Chat</span>
            </button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto py-2 space-y-1">
            {conversations.map((conv) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-2"
              >
                <button
                  onClick={() => handleLoadConversation(conv)}
                  className={`w-full p-3 text-left rounded-lg flex items-start gap-3 hover:bg-white/5 transition-colors group relative ${
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === conv.id ? null : conv.id);
                        }}
                        className="p-1 rounded-lg hover:bg-white/10 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      
                      {activeDropdown === conv.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-0 top-full mt-1 w-36 py-1 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg z-50"
                        >
                          <button
                            onClick={(e) => handleDeleteConversation(conv.id, e)}
                            className="w-full px-3 py-2 text-sm text-rose-400 hover:bg-white/10 flex items-center gap-2"
                          >
                            <Trash className="w-4 h-4" />
                            Delete Chat
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Toggle Button Container */}
      <div className="fixed top-4 z-20">
        <motion.button
          onClick={() => setShowSidebar(prev => !prev)}
          animate={{
            left: showSidebar ? "336px" : "16px",
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
      <div className="flex-1 flex flex-col">
        {/* Add animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[500px] h-[500px] -top-20 -right-20 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute w-[500px] h-[500px] -bottom-40 -left-20 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="flex items-center gap-4 p-4 border-b border-white/5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2 text-white/70 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.button>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
            PromptVerse
          </span>
        </div>
        
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

          {/* Save button */}
          <div className="absolute top-4 right-4">
            <motion.button
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
                    className={messageContainerClass(message)}
                  >
                    <div className={messageContentClass(message)}>
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
                        {renderMessageContent(message)}
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
    </div>
  );
}
