import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Copy, Heart, Share2, MessageSquare, Tags, Command, Code, X, Layers, Calendar, User, Zap, Award, BookOpen, Share, Download, Flag, Bookmark } from 'lucide-react';
import { Navigation } from '../App';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

// Add FloatingElement component for background
const FloatingElement = ({ position, color, scale }) => (
  <Float speed={2} rotationIntensity={2} floatIntensity={2}>
    <mesh position={position} scale={scale}>
      <torusGeometry args={[1, 0.3, 16, 32]} />
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  </Float>
);

// Add new component for dynamic background pattern
const DynamicPattern = ({ type }) => {
  const patterns = {
    chat: "M10 10c0-2.21-1.79-4-4-4v8c2.21 0 4-1.79 4-4z",
    image: "M3 3h18v18H3z",
    code: "M13 3L1 9l12 6L25 9z"
  };

  return (
    <div className="absolute inset-0 opacity-5">
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id={`pattern-${type}`} patternUnits="userSpaceOnUse" width="20" height="20">
          <path d={patterns[type]} fill="currentColor" />
        </pattern>
        <rect width="100" height="100" fill={`url(#pattern-${type})`} />
      </svg>
    </div>
  );
};

// Add new component for cyber-futuristic decorative elements
const CyberDecoration = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 blur-3xl" />
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl" />
    <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
      <pattern id="cyber-pattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M0 16h32M16 0v32" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#cyber-pattern)" />
    </svg>
  </div>
);

// Update the card component with new styling
const PromptCard = ({ prompt, onClick }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="group relative"
    onClick={onClick}
  >
    {/* Animated border effect */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 opacity-50 blur group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-violet-500/20">
      {/* Cyber pattern background */}
      <div className="absolute inset-0 opacity-5">
        <CyberDecoration />
      </div>

      {/* Type badge with glow effect */}
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 backdrop-blur-md">
        <span className="text-xs font-medium text-violet-200 tracking-wider">
          {prompt.type.toUpperCase()}
        </span>
        <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-sm animate-pulse" />
      </div>

      {/* Content layout updates */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
            {prompt.title}
          </span>
        </h3>
        
        {prompt.type === 'image' && (
          <div className="relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 via-fuchsia-500/30 to-transparent mix-blend-overlay" />
            <img
              src={prompt.image}
              alt={prompt.title}
              className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        )}

        <p className="text-violet-300/70 line-clamp-2">
          {prompt.description}
        </p>

        {/* Stats with animated hover effects */}
        <div className="flex items-center justify-between pt-4 border-t border-violet-500/10">
          <div className="flex space-x-4">
            <motion.button whileHover={{ scale: 1.1 }} className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-pink-500" />
              <span className="text-sm text-violet-300">{prompt.likes}</span>
            </motion.button>
            <span className="text-sm text-violet-400">{prompt.difficulty}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Command className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300">{prompt.tokenCount}</span>
          </div>
        </div>
      </div>

      {/* Hover overlay with glassmorphism */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1 }}
          className="text-center"
        >
          <Copy className="w-6 h-6 text-violet-200 mx-auto mb-2" />
          <span className="text-sm text-violet-300">View Details</span>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

// Update the grid container with new layout
const PromptGrid = ({ prompts, onPromptSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
    {prompts.map((prompt) => (
      <PromptCard
        key={prompt.id}
        prompt={prompt}
        onClick={() => onPromptSelect(prompt)}
      />
    ))}
  </div>
);

const Prompts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('chat');
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [cardLayout, setCardLayout] = useState('grid'); // 'grid' or 'masonry'

  const categories = [
    'all',
    'writing',
    'coding',
    'art',
    'business',
    'academic',
    'creative'
  ];

  const promptTypes = [
    {
      id: 'chat',
      title: 'Chat Prompts',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'from-violet-500 to-fuchsia-500',
      description: 'Conversational AI prompts for natural dialogue'
    },
    {
      id: 'image',
      title: 'Image Prompts',
      icon: <Command className="w-5 h-5" />,
      color: 'from-cyan-500 to-blue-500',
      description: 'Visual generation prompts for AI art creation'
    },
    {
      id: 'code',
      title: 'Code Prompts',
      icon: <Code className="w-5 h-5" />,
      color: 'from-emerald-500 to-green-500',
      description: 'Programming prompts for software development'
    }
  ];

  // Expanded mock prompts data with type property
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
    // Simulate API call
    setTimeout(() => {
      setPrompts(mockPrompts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filterPrompts = (prompt) => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
    const matchesType = prompt.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  };

  // Add Modal Component
  const PromptModal = ({ prompt, onClose }) => {
    const [activeTab, setActiveTab] = useState('prompt'); // 'prompt' | 'examples' | 'variations'
    const [isSaved, setIsSaved] = useState(false);
  
    const tabs = [
      { id: 'prompt', label: 'Prompt' },
      { id: 'examples', label: 'Examples' },
      { id: 'variations', label: 'Variations' }
    ];
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl bg-[#0a0a0f] rounded-2xl border border-violet-500/20"
          onClick={e => e.stopPropagation()}
        >
          {/* Header Section */}
          <div className="p-6 border-b border-violet-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent mb-2">
                  {prompt.title}
                </h2>
                <div className="flex items-center space-x-4 text-violet-300/70">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{prompt.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{prompt.lastUsed}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    <span>{prompt.difficulty}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2 rounded-lg ${isSaved ? 'bg-violet-500/20' : 'bg-black/30'} border border-violet-500/20`}
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-violet-400' : ''}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-black/30 border border-violet-500/20"
                >
                  <Share className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 rounded-lg bg-black/30 border border-violet-500/20"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
  
            {/* Tab Navigation */}
            <div className="flex space-x-4">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-violet-500/20 text-violet-200'
                      : 'text-violet-400 hover:text-violet-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
  
          {/* Content Section */}
          <div className="p-6">
            {activeTab === 'prompt' && (
              <div className="space-y-6">
                {prompt.type === 'image' && (
                  <div className="relative rounded-lg overflow-hidden border border-violet-500/20">
                    <img
                      src={prompt.image}
                      alt={prompt.title}
                      className="w-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {prompt.tags?.map((tag, i) => (
                            <span key={i} className="px-2 py-1 text-xs rounded-full bg-violet-500/10 border border-violet-500/20">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
  
                <div className="bg-black/30 rounded-xl p-6 border border-violet-500/20">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-violet-200">Prompt Details</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigator.clipboard.writeText(prompt.prompt)}
                      className="px-4 py-2 bg-violet-500/20 rounded-lg border border-violet-500/40"
                    >
                      <Copy className="w-4 h-4 inline mr-2" />
                      Copy
                    </motion.button>
                  </div>
                  <pre className="text-violet-200 whitespace-pre-wrap">{prompt.prompt}</pre>
                </div>
  
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/30 rounded-lg p-4 border border-violet-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-violet-400">Uses</span>
                      <Zap className="w-4 h-4 text-violet-400" />
                    </div>
                    <p className="text-2xl font-bold text-violet-200 mt-1">
                      {Math.floor(Math.random() * 10000)}
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 border border-violet-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-violet-400">Rating</span>
                      <Star className="w-4 h-4 text-violet-400" />
                    </div>
                    <p className="text-2xl font-bold text-violet-200 mt-1">
                      {prompt.rating}
                    </p>
                  </div>
                  {/* Add more stat boxes as needed */}
                </div>
              </div>
            )}
  
            {activeTab === 'examples' && (
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="relative group rounded-lg overflow-hidden border border-violet-500/20">
                    <img
                      src={`https://source.unsplash.com/random/800x600/?prompt&${i}`}
                      alt={`Example ${i + 1}`}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-sm text-violet-200">Example {i + 1}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
  
            {activeTab === 'variations' && (
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="bg-black/30 rounded-lg p-4 border border-violet-500/20">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-violet-200 font-medium">Variation {i + 1}</h4>
                      <Copy className="w-4 h-4 text-violet-400 cursor-pointer" />
                    </div>
                    <p className="text-violet-300/70">
                      {prompt.prompt.split('[').join('(').split(']').join(')')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
  
          {/* Footer Actions */}
          <div className="border-t border-violet-500/20 p-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 rounded-lg bg-violet-500/10 text-violet-300 text-sm"
              >
                <Flag className="w-4 h-4 inline mr-1" />
                Report
              </motion.button>
            </div>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-violet-500/20 rounded-lg border border-violet-500/40"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Download
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="relative">
      <div className="bg-[#0a0a0f] min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-lg border-b border-violet-500/20">
          <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="text-xl font-bold bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent"
            >
              PromptVerse
            </motion.button>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative text-white">
          {/* 3D Background */}
          <div className="absolute inset-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10] }}>
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
              <ambientLight intensity={0.5} />
              <FloatingElement position={[3, 2, -5]} color="#4c1d95" scale={1.5} />
              <FloatingElement position={[-3, -2, -5]} color="#7c3aed" scale={1} />
              <FloatingElement position={[0, -3, -3]} color="#8b5cf6" scale={0.8} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </div>

          {/* Content Container */}
          <div className="relative z-10">
            <CyberDecoration />
            <div className="max-w-7xl mx-auto px-4 py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative backdrop-blur-2xl bg-violet-900/10 rounded-2xl border border-violet-500/20 p-8 mb-12"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-violet-600/10 rounded-2xl" />
                <motion.h1
                  className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent"
                >
                  Explore Prompts
                </motion.h1>
                
                {/* Search Bar */}
                <div className="relative max-w-3xl mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-violet-500/20 rounded-xl blur-xl" />
                  <input
                    type="text"
                    placeholder="Search prompts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 bg-black/30 backdrop-blur-xl rounded-xl border border-violet-500/20 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20 text-violet-100 placeholder-violet-400/50"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-violet-400/50" />
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap justify-center gap-4">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-2 rounded-full backdrop-blur-xl border ${
                        selectedCategory === category
                          ? 'bg-violet-500/20 border-violet-500/40 text-violet-200'
                          : 'bg-black/30 border-violet-500/20 text-violet-300'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* New Prompt Type Selector */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {promptTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`relative group ${
                        selectedType === type.id ? 'scale-105' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Animated Background */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${type.color} opacity-10 group-hover:opacity-20 rounded-xl blur-xl transition-all duration-300`} />
                      
                      {/* Card Content */}
                      <div className={`relative p-6 rounded-xl border ${
                        selectedType === type.id 
                          ? 'border-violet-500/50 bg-violet-900/30' 
                          : 'border-violet-500/20 bg-black/30'
                      } backdrop-blur-xl transition-all duration-300`}>
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${type.color}`}>
                            {type.icon}
                          </div>
                          <span className="font-bold text-lg">{type.title}</span>
                        </div>
                        <p className="text-sm text-violet-300/70">{type.description}</p>
                        
                        {/* Selection Indicator */}
                        {selectedType === type.id && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 border-2 border-violet-500 rounded-xl"
                            initial={false}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Filter chips row */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-violet-900/30 border border-violet-500/20 backdrop-blur-sm">
                  <Filter className="w-4 h-4 text-violet-400" />
                  <select 
                    className="bg-transparent text-violet-300 text-sm focus:outline-none"
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                  >
                    <option value="popular">Most Popular</option>
                    <option value="recent">Most Recent</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Add layout switcher */}
              <div className="flex justify-end mb-4">
                <div className="bg-black/30 rounded-lg p-1 backdrop-blur-sm border border-violet-500/20">
                  <button
                    onClick={() => setCardLayout('grid')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      cardLayout === 'grid' ? 'bg-violet-500/20' : 'hover:bg-violet-500/10'
                    }`}
                  >
                    <Command className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCardLayout('masonry')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      cardLayout === 'masonry' ? 'bg-violet-500/20' : 'hover:bg-violet-500/10'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modified Prompt Grid */}
              <PromptGrid
                prompts={prompts.filter(filterPrompts)}
                onPromptSelect={setSelectedPrompt}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add modal to the root level */}
      <AnimatePresence>
        {selectedPrompt && (
          <PromptModal
            prompt={selectedPrompt}
            onClose={() => setSelectedPrompt(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Prompts;