
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Copy, Heart, Share2, MessageSquare, Tags, Command } from 'lucide-react';
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

  const categories = [
    'all',
    'writing',
    'coding',
    'art',
    'business',
    'academic',
    'creative'
  ];

  // Expanded mock prompts data
  const mockPrompts = [
    {
      id: 1,
      title: "AI Art Masterpiece Generator",
      description: "Create stunning digital art with precise style control",
      prompt: "Create a hyperrealistic digital painting of a cyberpunk city at sunset...",
      category: "art",
      author: "ArtisticAI",
      likes: 1250,
      comments: 45,
      shares: 89,
      rating: 4.8,
      tags: ["digital-art", "cyberpunk", "realistic"],
      image: "https://source.unsplash.com/random/800x600/?cyberpunk"
    },
    {
      id: 2,
      title: "Code Refactoring Assistant",
      description: "Transform legacy code into modern, clean architecture",
      prompt: "Refactor this code following SOLID principles and modern patterns...",
      category: "coding",
      author: "TechOptimizer",
      likes: 892,
      comments: 67,
      shares: 123,
      rating: 4.9,
      tags: ["refactoring", "clean-code", "optimization"],
      image: "https://source.unsplash.com/random/800x600/?programming"
    },
    {
      id: 3,
      title: "Story Plot Generator",
      description: "Generate unique and engaging story plots",
      prompt: "Create a compelling story plot with unique twists...",
      category: "writing",
      author: "StoryForge",
      likes: 756,
      comments: 34,
      shares: 67,
      rating: 4.7,
      tags: ["creative-writing", "storytelling", "plot"],
      image: "https://source.unsplash.com/random/800x600/?story"
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

            {/* Prompt Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {prompts.filter(filterPrompts).map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative"
                >