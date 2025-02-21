import React, { useEffect, useState } from 'react';
import { Command, Share2, GitBranch, Star, DollarSign, Trophy, Beaker, MessageSquare, Terminal, Copy, Check, ChevronRight, Code, Wand2, PenTool, Brain } from 'lucide-react';
import { motion, LazyMotion, domAnimation, m } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Environment, PerspectiveCamera } from '@react-three/drei';

const springConfig = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 1
};

const smoothTransition = {
  type: "spring",
  stiffness: 200,
  damping: 20
};

const scrollAnimationConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 200,
      mass: 0.5
    }
  },
  viewport: { 
    once: true,
    margin: "-100px"
  }
};

const Stars = () => {
  return (
    <div className="stars-container animate-float">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}
    </div>
  );
};

const AnimatedSphere = () => {
  return (
    <Float
      speed={2}
      rotationIntensity={2}
      floatIntensity={3}
    >
      <mesh scale={2}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
          attach="material"
          distort={0.6}
          speed={3}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  );
};

// Update the HexagonRing component
const HexagonRing = () => {
  return (
    <Float
      speed={1.2}
      rotationIntensity={2}
      floatIntensity={2}
    >
      <mesh rotation={[Math.PI / 4, 0, 0]} scale={0.8}>
        <torusGeometry args={[2.5, 0.4, 16, 6]} />
        <MeshDistortMaterial
          color="#4c1d95"
          emissive="#4c1d95"
          emissiveIntensity={0.5}
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  );
};

const FloatingCube = () => {
  return (
    <Float
      speed={2.5}
      rotationIntensity={4}
      floatIntensity={3}
    >
      <mesh scale={2} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={1}
          attach="material"
          distort={0.8}
          speed={2}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  );
};

const PromptModel = () => {
  return (
    <Float
      speed={2}
      rotationIntensity={2}
      floatIntensity={1.5}
    >
      <mesh>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <MeshDistortMaterial
          color="#a855f7"
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const PromptScreen = () => {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [copied, setCopied] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState('GPT-4');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [showSettings, setShowSettings] = useState(false);

  // Add more engine options
  const engines = [
    { name: 'GPT-4', maxTokens: 8192 },
    { name: 'GPT-3.5 Turbo', maxTokens: 4096 },
    { name: 'DALL-E 3', maxTokens: 4096 },
    { name: 'Claude 2', maxTokens: 8192 },
    { name: 'CodeLlama', maxTokens: 4096 },
    { name: 'Stable Diffusion XL', maxTokens: 2048 },
    { name: 'PaLM 2', maxTokens: 8192 },
    { name: 'Llama 2', maxTokens: 4096 }
  ];

  const prompts = [
    {
      title: "AI Art Generation",
      prompt: "Create a surreal landscape with floating islands, bioluminescent plants, and crystalline structures under a double moon sky",
      category: "Art & Design",
      icon: <Wand2 className="w-4 h-4" />,
      tags: ["Midjourney", "Stable Diffusion", "DALL-E"],
      engine: "DALL-E 3"
    },
    {
      title: "Story Writing",
      prompt: "Write a cyberpunk short story about a hacker who discovers an AI consciousness hidden in an abandoned virtual reality game",
      category: "Creative Writing",
      icon: <PenTool className="w-4 h-4" />,
      tags: ["Fiction", "Sci-Fi", "Narrative"],
      engine: "GPT-4"
    },
    {
      title: "Code Generation",
      prompt: "Generate a React component for a futuristic dashboard with animated data visualizations and real-time updates",
      category: "Programming",
      icon: <Code className="w-4 h-4" />,
      tags: ["React", "TypeScript", "Animation"],
      engine: "CodeLlama"
    },
    {
      title: "AI Assistant",
      prompt: "Create a complex problem-solving algorithm that combines machine learning with traditional optimization methods",
      category: "AI Development",
      icon: <Brain className="w-4 h-4" />,
      tags: ["ML", "Optimization", "Algorithm"],
      engine: "Claude 2"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrompt((prev) => (prev + 1) % prompts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompts[currentPrompt].prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-12">
      {/* 3D Models Container */}
      <div className="pointer-events-none">
        {/* Right side model */}
        <div className="absolute -right-20 top-0 w-[500px] h-[500px]">
          <Canvas legacy={true}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={3} />
            <pointLight position={[10, 10, 10]} intensity={4} color="#8b5cf6" />
            <AnimatedSphere />
            <OrbitControls 
              enableZoom={false} 
              autoRotate 
              autoRotateSpeed={2}
            />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-radial from-violet-600/20 via-violet-600/10 to-transparent blur-2xl" />
        </div>

        {/* Left side model */}
        <div className="absolute -left-20 top-40 w-[500px] h-[500px]">
          <Canvas legacy={true}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={3} />
            <pointLight position={[10, 10, 10]} intensity={4} color="#7c3aed" />
            <FloatingCube />
            <OrbitControls 
              enableZoom={false} 
              autoRotate 
              autoRotateSpeed={-2}
            />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-radial from-purple-600/20 via-purple-600/10 to-transparent blur-2xl" />
        </div>
      </div>

      {/* Prompt Display Container */}
      <motion.div 
        className="relative z-10 backdrop-blur-xl bg-black/30 rounded-2xl border border-violet-500/20 p-8 shadow-2xl mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
      >
        {/* Terminal header */}
        <div className="flex flex-col space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Terminal className="w-6 h-6 text-violet-400" />
              <span className="text-violet-300 font-mono text-lg">prompt_verse ~/prompts</span>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettings(!showSettings)}
                className="px-4 py-2 bg-violet-500/10 rounded-lg border border-violet-500/20 text-violet-300 text-sm hover:bg-violet-500/20"
              >
                Model Settings
              </motion.button>
              <select 
                className="bg-violet-950/50 border border-violet-500/20 rounded-lg px-4 py-2 text-violet-300 text-sm min-w-[180px]"
                value={selectedEngine}
                onChange={(e) => setSelectedEngine(e.target.value)}
              >
                {engines.map(engine => (
                  <option key={engine.name}>{engine.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Settings Panel with smoother animation */}
          <motion.div
            initial={false}
            animate={{ 
              height: showSettings ? 'auto' : 0,
              opacity: showSettings ? 1 : 0
            }}
            transition={{ 
              height: { ...smoothTransition, duration: 0.3 },
              opacity: { duration: 0.2 }
            }}
            style={{ overflow: 'hidden' }}
          >
            <div className="bg-violet-950/30 rounded-lg p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-violet-300 text-sm">Temperature: {temperature}</label>
                  <span className="text-violet-400 text-xs">{temperature < 0.3 ? 'Focused' : temperature > 0.7 ? 'Creative' : 'Balanced'}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-violet-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-violet-300 text-sm">Max Tokens: {maxTokens}</label>
                  <span className="text-violet-400 text-xs">{maxTokens / 1024}k tokens</span>
                </div>
                <input
                  type="range"
                  min="256"
                  max="8192"
                  step="256"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full accent-violet-500"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          key={currentPrompt}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={springConfig}
          className="space-y-6" // Increased spacing
        >
          {/* Category and title */}
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center space-x-3 text-violet-300 text-base px-4 py-2 rounded-full border border-violet-500/20"
              whileHover={{ scale: 1.05 }}
            >
              {prompts[currentPrompt].icon}
              <span>{prompts[currentPrompt].category}</span>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex items-center space-x-2 text-violet-400 text-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy prompt"}</span>
            </motion.button>
          </div>
          
          <h3 className="text-2xl font-bold text-violet-200 flex items-center space-x-3">
            <ChevronRight className="w-6 h-6 text-violet-400" />
            <span>{prompts[currentPrompt].title}</span>
          </h3>
          
          {/* Prompt display */}
          <div className="relative">
            <motion.div
              className="bg-violet-950/50 rounded-lg p-8 font-mono text-base text-violet-300"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start space-x-3">
                <span className="text-violet-400 select-none">►</span>
                <span>{prompts[currentPrompt].prompt}</span>
              </div>
              <motion.div 
                className="absolute bottom-2 right-2 w-2 h-4 bg-violet-400"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-6">
            {prompts[currentPrompt].tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  ...smoothTransition,
                  delay: index * 0.05  // Reduced delay for snappier sequence
                }}
                className="px-4 py-2 text-sm rounded-md bg-violet-500/10 text-violet-300 border border-violet-500/20"
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 } 
                }}
              >
                #{tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    { icon: <Share2 className="w-6 h-6" />, title: "Prompt Marketplace", description: "Share and discover high-quality AI prompts across multiple categories" },
    { icon: <Command className="w-6 h-6" />, title: "Live Prompt Testing", description: "Test prompts in real-time and optimize outputs directly on platform" },
    { icon: <Beaker className="w-6 h-6" />, title: "Prompt Optimization Lab", description: "AI-powered suggestions & analytics to enhance effectiveness" },
    { icon: <Star className="w-6 h-6" />, title: "Community Reviews", description: "Rate, review, and comment on prompts to highlight the best ones" },
    { icon: <GitBranch className="w-6 h-6" />, title: "Version Control", description: "Iterate on prompts with a Git-like versioning system" },
    { icon: <MessageSquare className="w-6 h-6" />, title: "Collaborative Building", description: "Work together to refine prompts for better outputs" },
    { icon: <DollarSign className="w-6 h-6" />, title: "Prompt Monetization", description: "Sell premium prompts or offer exclusive access" },
    { icon: <Trophy className="w-6 h-6" />, title: "Challenge Mode", description: "Compete to create the most effective prompts" }
  ];

  const container = {
    hidden: { opacity: 0, y: 0 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 0 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: smoothTransition
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden"
      >
        {/* Enhanced animated background with multiple layers */}
        <div className="fixed inset-0 z-0">
          {/* Updated base gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-violet-900/20 to-[#0f1625] opacity-90" />
          
          {/* Add Stars component */}
          <Stars />
          
          {/* Noise texture */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
          
          {/* Updated gradient orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5" />

          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
        </div>

        {/* Navigation with lighter hover effects */}
        <nav className="relative z-10 backdrop-blur-sm border-b border-white/5 sticky top-0">
          <div className="max-w-7xl mx-auto flex justify-end items-center p-4">
            <div className="flex space-x-6">
              <button className="px-4 py-2 text-gray-300 hover:text-white transition-all duration-300">Blog</button>
              <button className="px-4 py-2 text-gray-300 hover:text-white transition-all duration-300">Get in touch</button>
              <button className="px-6 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10">
                Book a call
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section with Framer Motion */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-32">
            <m.div
              {...scrollAnimationConfig}
              className="flex flex-col items-center text-center mb-16"
            >
              <motion.h1
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-8xl font-bold mb-6 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent cursor-default animate-shine"
              >
                PromptVerse
              </motion.h1>
              <h2 className="text-5xl font-bold mb-4 leading-tight">
                Create
                <span className="bg-gradient-to-r from-violet-200 to-purple-300 bg-clip-text text-transparent px-4">
                  powerful
                </span>
                <br />
                <span className="text-violet-100">
                  AI prompts
                </span>
              </h2>

              {/* Animated Get Started Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="futuristic-button group relative my-8 px-14 py-4 overflow-hidden rounded-xl bg-violet-950/30 backdrop-blur-md"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-50" />
                </div>
                <div className="absolute inset-[1px] rounded-xl bg-gradient-to-b from-violet-950/50 to-violet-900/50 backdrop-blur-sm" />
                <div className="absolute inset-0 rounded-xl border border-violet-500/20 group-hover:border-violet-400/40 transition-colors duration-500" />
                <div className="relative flex items-center space-x-2">
                  <span className="font-bold text-lg bg-gradient-to-r from-violet-200 via-white to-violet-200 bg-clip-text text-transparent group-hover:text-white transition-all duration-300">
                    Get Started
                  </span>
                  <svg className="w-4 h-4 text-violet-300 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <div className="absolute -inset-1/2 group-hover:opacity-100 opacity-0 transition-opacity duration-500">
                  <div className="absolute inset-0 blur-2xl bg-violet-600/20" />
                </div>
              </motion.button>

              {/* Update the motion.span component */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-violet-200/70 px-6 py-3 rounded-full border border-violet-500/10 hover:border-violet-500/20 transition-all duration-300"
              >
                Next Generation AI Platform
              </motion.span>
            </m.div>

            {/* Add Prompt Screen */}
            <m.div {...scrollAnimationConfig}>
              <PromptScreen />
            </m.div>

            {/* What we offer Section - updated margin-top */}
            <m.div 
              {...scrollAnimationConfig}
              className="text-center mb-16 mt-16" // Changed from mt-32 to mt-16
            >
              <m.h2 
                className="text-6xl font-bold mb-6 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                What we offer?
              </m.h2>

              <m.p className="text-violet-300/70 text-lg max-w-2xl mx-auto">
                Discover the tools and features that make PromptVerse your ultimate AI prompt engineering platform
              </m.p>
            </m.div>

            {/* Animated Features Grid */}
            <m.div
              variants={{
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            >
              {features.map((feature, index) => (
                <m.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        damping: 20,
                        stiffness: 100
                      }
                    }
                  }}
                  whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                  className="feature-card group p-6 bg-violet-900/10 rounded-xl border border-violet-500/10 hover:bg-violet-800/20 backdrop-blur-sm"
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="text-violet-300 mb-4 block"
                  >
                    {feature.icon}
                  </motion.span>
                  <h3 className="text-lg font-semibold mb-2 text-violet-100">
                    {feature.title}
                  </h3>
                  <p className="text-violet-300/70 text-sm">
                    {feature.description}
                  </p>
                </m.div>
              ))}
            </m.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-violet-500/10 mt-32">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center text-violet-300/50 text-sm">
              © {new Date().getFullYear()} PromptVerse. All rights reserved.
            </div>
          </div>
        </footer>
      </m.div>
    </LazyMotion>
  );
};

export default App;