import React, { useState, useEffect, useCallback } from 'react';
import { Search, Copy, Heart, MessageSquare, Code, Command, SortAsc, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash/debounce';
import InfiniteScroll from 'react-infinite-scroll-component';

// Add category colors
const categoryColors = {
  writing: '#6C63FF',
  art: '#FF6B6B',
  coding: '#4ADE80',
};

// Enhanced PromptCard component
const PromptCard = ({ prompt, onClick, onTagClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layoutId={`prompt-${prompt.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-[#121212] p-6 rounded-lg border cursor-pointer"
      style={{
        borderColor: `${categoryColors[prompt.category]}40`,
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-[#EAEAEA]">{prompt.title}</h3>
        <span className="px-2 py-1 text-xs rounded-full" 
              style={{ backgroundColor: `${categoryColors[prompt.category]}20`, color: categoryColors[prompt.category] }}>
          {prompt.type}
        </span>
      </div>
      
      <p className="text-[#EAEAEA]/70 mb-4 line-clamp-2">{prompt.description}</p>
      
      {/* Add tags section */}
      <div className="flex flex-wrap gap-2 mb-4">
        {prompt.tags.map((tag) => (
          <button
            key={tag}
            onClick={(e) => {
              e.stopPropagation();
              onTagClick(tag);
            }}
            className="px-2 py-1 text-xs rounded-full bg-[#6C63FF]/10 text-[#6C63FF] hover:bg-[#6C63FF]/20 transition-colors"
          >
            #{tag}
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-[#EAEAEA]/50">{prompt.difficulty}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4 text-[#FF6B6B]" />
          <span className="text-[#EAEAEA]">{prompt.likes}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-[#4ADE80] flex items-center space-x-1"
        >
          <Copy className="w-4 h-4" />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
    </motion.div>
  );
};

// New Modal Component
const PromptModal = ({ prompt, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!prompt) return null;
  
  return (
    <motion.div
      layoutId={`prompt-${prompt.id}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div 
        className="bg-[#121212] p-8 rounded-xl max-w-2xl w-full space-y-6" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-[#EAEAEA] mb-2">{prompt.title}</h2>
            <span className="px-3 py-1 rounded-full text-sm" 
                  style={{ backgroundColor: `${categoryColors[prompt.category]}20`, color: categoryColors[prompt.category] }}>
              {prompt.type}
            </span>
          </div>
          <button onClick={onClose} className="text-[#EAEAEA]/60 hover:text-[#EAEAEA]">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Description */}
        <p className="text-[#EAEAEA]/80 text-lg">{prompt.description}</p>

        {/* Prompt Content */}
        <div className="bg-[#1A1A1A] p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#EAEAEA]/60">Prompt</span>
            <button
              onClick={handleCopy}
              className="text-[#4ADE80] flex items-center space-x-1 text-sm"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-[#EAEAEA] whitespace-pre-wrap">{prompt.prompt}</p>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[#EAEAEA]/60">Difficulty</p>
            <p className="text-[#EAEAEA]">{prompt.difficulty}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[#EAEAEA]/60">Author</p>
            <p className="text-[#EAEAEA]">{prompt.author}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-full bg-[#6C63FF]/10 text-[#6C63FF]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-[#EAEAEA]/60">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{prompt.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{prompt.comments}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Prompts component
const Prompts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [sortBy, setSortBy] = useState('popular');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);

  const types = [
    { id: 'all', icon: <Command className="w-5 h-5" />, label: 'All' },
    { id: 'chat', icon: <MessageSquare className="w-5 h-5" />, label: 'Chat' },
    { id: 'code', icon: <Code className="w-5 h-5" />, label: 'Code' },
  ];

  // Simplified mock data
  const mockPrompts = [
    {
      id: 1,
      type: 'chat',
      title: "AI Conversation Expert",
      description: "Generate engaging dialogue with AI",
      prompt: "You are an expert in [field]. Engage in a conversation about [topic] while demonstrating deep knowledge and asking thought-provoking questions...",
      category: "writing",
      author: "ChatMaster",
      likes: 3427,
      comments: 892,
      shares: 1204,
      rating: 4.9,
      tags: ["ai-conversation", "dialogue", "expert"],
      image: "https://source.unsplash.com/random/800x600/?chat",
      difficulty: "Intermediate",
      tokenCount: 2048,
      lastUsed: "2 hours ago"
    },
    {
      id: 2,
      type: 'image',
      title: "Neural Dream Architect",
      description: "Generate surreal dreamscapes with neural network manipulation",
      prompt: "Create a hyperrealistic image of [subject] with [style] aesthetic, featuring [details]...",
      category: "art",
      author: "NeuralNomad",
      likes: 3427,
      comments: 892,
      shares: 1204,
      rating: 4.9,
      tags: ["neural-art", "quantum", "consciousness"],
      image: "https://source.unsplash.com/random/800x600/?quantum",
      difficulty: "Advanced",
      tokenCount: 2048,
      lastUsed: "2 hours ago"
    },
    {
      id: 3,
      type: 'code',
      title: "Quantum Code Synthesizer",
      description: "Transform thoughts into quantum-optimized algorithms",
      prompt: "Write a [language] program that implements [algorithm] with the following specifications...",
      category: "coding",
      author: "QuantumCoder",
      likes: 2891,
      comments: 567,
      shares: 892,
      rating: 4.95,
      tags: ["quantum-computing", "ai-synthesis", "neural-code"],
      image: "https://source.unsplash.com/random/800x600/?quantum-computer",
      difficulty: "Expert",
      tokenCount: 4096,
      lastUsed: "5 mins ago"
    }
  ];

  useEffect(() => {
    setPrompts(mockPrompts);
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
    setSelectedType('all'); // Reset type filter when selecting a tag
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || prompt.type === selectedType;
    const matchesTag = !selectedTag || prompt.tags.includes(selectedTag);
    return matchesSearch && matchesType && matchesTag;
  });

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setPage(1);
    }, 300),
    []
  );

  const loadMorePrompts = () => {
    // Implement pagination logic here
    setPage(prev => prev + 1);
  };

  const sortPrompts = (prompts) => {
    switch (sortBy) {
      case 'popular':
        return [...prompts].sort((a, b) => b.likes - a.likes);
      case 'recent':
        return [...prompts].sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed));
      default:
        return prompts;
    }
  };

  const filteredAndSortedPrompts = sortPrompts(filteredPrompts);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#121212] text-[#EAEAEA]"
    >
      {/* Header */}
      <motion.header
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="border-b border-[#6C63FF]/20 p-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-xl font-bold text-[#6C63FF]"
          >
            PromptVerse
          </button>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => debouncedSearch(e.target.value)}
              className="w-full p-4 bg-[#121212] border border-[#6C63FF]/20 rounded-lg focus:border-[#6C63FF]/40 focus:ring-1 focus:ring-[#6C63FF]/40"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6C63FF]/40" />
          </div>
        </motion.div>

        {/* Type filters */}
        <motion.div 
          className="flex gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {types.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                selectedType === type.id
                  ? 'border-[#6C63FF] bg-[#6C63FF]/10'
                  : 'border-[#6C63FF]/20 hover:border-[#6C63FF]/40'
              }`}
            >
              {type.icon}
              <span>{type.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Sort controls */}
        <div className="flex justify-end mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#121212] border border-[#6C63FF]/20 rounded-lg p-2"
          >
            <option value="popular">Most Popular</option>
            <option value="recent">Recently Used</option>
          </select>
        </div>

        {/* Add selected tag indicator */}
        {selectedTag && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="text-[#6C63FF]">Filtered by tag:</span>
            <button
              onClick={() => setSelectedTag(null)}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#6C63FF]/10 text-[#6C63FF]"
            >
              #{selectedTag}
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Infinite scroll wrapper */}
        <InfiniteScroll
          dataLength={filteredAndSortedPrompts.length}
          next={loadMorePrompts}
          hasMore={hasMore}
          loader={<div className="text-center mt-4">Loading...</div>}
        >
          <motion.div
            layout
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredAndSortedPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  onClick={() => setSelectedPrompt(prompt)}
                  onTagClick={handleTagClick}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </InfiniteScroll>

        {/* Modal */}
        <AnimatePresence>
          {selectedPrompt && (
            <PromptModal
              prompt={selectedPrompt}
              onClose={() => setSelectedPrompt(null)}
            />
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
};

export default Prompts;