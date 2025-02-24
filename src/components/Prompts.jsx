import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Copy, Heart, Share2, MessageSquare, Tags, Command, Code } from 'lucide-react';
import { Navigation } from '../App';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Stars } from '@react-three/drei';

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

const Prompts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('chat');

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

  // Expanded mock prompts data
  const mockPrompts = [
    {
      id: 1,
      title: "Neural Dream Architect",
      description: "Generate surreal dreamscapes with neural network manipulation",
      prompt: "Architect a dreamscape where quantum particles form conscious structures...",
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
      id: 2,
      title: "Quantum Code Synthesizer",
      description: "Transform thoughts into quantum-optimized algorithms",
      prompt: "Synthesize a quantum algorithm that solves...",
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
    return matchesSearch && matchesCategory;
  };

  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      <div className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-lg border-b border-violet-500/20">
        <Navigation />
      </div>
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

        {/* Futuristic Search Interface */}
        <div className="relative z-10">
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

            {/* Prompt Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {prompts.filter(filterPrompts).map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative"
                >
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 animate-pulse" />
                  
                  <div className="relative backdrop-blur-xl bg-black/40 rounded-xl border border-violet-500/30 overflow-hidden">
                    {/* Hexagonal Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NCIgaGVpZ2h0PSI4NCI+CiAgPHBhdGggZD0iTTAgMGg4NHY4NEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik00MiA0TDQgNDJsMzggMzggMzgtMzh6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4=')]" />

                    {/* Custom Image Container */}
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 mix-blend-overlay" />
                      <img
                        src={prompt.image}
                        alt={prompt.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Floating Stats with Glowing Effect */}
                      <div className="absolute top-4 right-4 flex items-center space-x-3">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center space-x-1 px-3 py-1 rounded-full bg-black/60 border border-violet-500/30 backdrop-blur-md"
                        >
                          <span className="text-violet-300 text-xs">{prompt.tokenCount}</span>
                          <Command className="w-3 h-3 text-violet-400" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center space-x-1 px-3 py-1 rounded-full bg-black/60 border border-violet-500/30 backdrop-blur-md"
                        >
                          <span className="text-violet-300 text-xs">{prompt.difficulty}</span>
                          <Star className="w-3 h-3 text-yellow-500" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Content with Glassmorphism */}
                    <div className="p-6 relative backdrop-blur-sm">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
                        {prompt.title}
                      </h3>
                      <p className="text-violet-300/70 text-sm mt-2 line-clamp-2">
                        {prompt.description}
                      </p>

                      {/* Interactive Stats Bar */}
                      <div className="flex items-center justify-between mt-4 py-2">
                        <div className="flex items-center space-x-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center space-x-1 text-violet-300"
                          >
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{prompt.likes}</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center space-x-1 text-violet-300"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-sm">{prompt.comments}</span>
                          </motion.button>
                        </div>
                        <span className="text-xs text-violet-400">{prompt.lastUsed}</span>
                      </div>
                    </div>

                    {/* Action Overlay */}
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-6">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-4 bg-violet-500/20 rounded-full backdrop-blur-xl border border-violet-500/40 relative group/button"
                      >
                        <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-xl group-hover/button:blur-2xl transition-all duration-300" />
                        <Copy className="w-6 h-6 text-violet-200 relative z-10" />
                      </motion.button>
                      {/* Add more action buttons with similar effects */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompts;