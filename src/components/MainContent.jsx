import React, { useEffect } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { Command, Share2, GitBranch, Star, DollarSign, Trophy, Beaker, MessageSquare, Terminal, Copy, Check, ChevronRight, Code, Wand2, PenTool, Brain } from 'lucide-react';
import Stars from './Stars';
import FloatingCube from './FloatingCube';
import AnimatedSphere from './AnimatedSphere';
import PromptScreen from './PromptScreen';
import Navigation from './Navigation';

const MainContent = () => {
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

  const useCases = [
    {
      title: "Programmers",
      description: "Perfect for developers and software engineers who want to accelerate their workflow with AI-assisted coding.",
      icon: <Code className="w-8 h-8" />,
      models: ["GitHub Copilot", "CodeLLaMA", "Claude", "GPT-4"]
    },
    {
      title: "Content Creators",
      description: "Ideal for writers, artists, and creators looking to enhance their workflow with AI-powered tools.",
      icon: <PenTool className="w-8 h-8" />,
      models: ["Midjourney", "DALL-E 3", "Stable Diffusion", "ChatGPT"]
    },
    {
      title: "Businesses",
      description: "Help teams standardize and improve their AI interactions across various departments.",
      icon: <Command className="w-8 h-8" />,
      models: ["Azure OpenAI", "AWS Bedrock", "Anthropic", "Cohere"]
    },
    {
      title: "Researchers",
      description: "Advanced tools for academic and industry researchers exploring AI capabilities.",
      icon: <Beaker className="w-8 h-8" />,
      models: ["AutoGPT", "LangChain", "HuggingFace", "CodeLLaMA"]
    }
  ];

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden"
      >
        {/* Background layers */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-violet-900/20 to-[#0f1625] opacity-90" />
          <Stars />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
          
          {/* Gradient orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
          </div>

          {/* Grid and vignette */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
        </div>

        {/* Content */}
        <Navigation />
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:py-32">
            {/* Hero Section */}
            <m.div
              {...scrollAnimationConfig}
              className="flex flex-col items-center text-center mb-8 sm:mb-16"
            >
              {/* Hero Content */}
              <motion.h1
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-5xl sm:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent cursor-default animate-shine"
              >
                PromptVerse
              </motion.h1>
              
              {/* Hero Subtitle */}
              <h2 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
                Create
                <span className="bg-gradient-to-r from-violet-200 to-purple-300 bg-clip-text text-transparent px-4">
                  powerful
                </span>
                <br />
                <span className="text-violet-100">
                  AI prompts
                </span>
              </h2>

              {/* Call to Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="futuristic-button group relative my-8 px-14 py-4 overflow-hidden rounded-xl bg-violet-950/30 backdrop-blur-md"
              >
                <div className="relative flex items-center space-x-2">
                  <span className="font-bold text-lg bg-gradient-to-r from-violet-200 via-white to-violet-200 bg-clip-text text-transparent group-hover:text-white transition-all duration-300">
                    Get Started
                  </span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.button>

              {/* Subtitle Badge */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-violet-200/70 px-6 py-3 rounded-full border border-violet-500/10 hover:border-violet-500/20 transition-all duration-300"
              >
                Next Generation AI Platform
              </motion.span>
            </m.div>

            {/* Main Sections */}
            <m.div {...scrollAnimationConfig}>
              <PromptScreen />
            </m.div>

            {/* Use Cases Section */}
            <m.div {...scrollAnimationConfig} className="text-center mb-16 mt-32">
              <m.h2 
                className="text-6xl font-bold mb-6 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Who's this for?
              </m.h2>
              <m.p className="text-violet-300/70 text-lg max-w-2xl mx-auto mb-12">
                PromptVerse is designed for everyone who works with AI, from beginners to experts
              </m.p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {useCases.map((useCase, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.2 }
                    }}
                    viewport={{ once: true }}
                    className="bg-violet-900/10 backdrop-blur-sm rounded-xl p-8 border border-violet-500/10 hover:bg-violet-800/20 transition-all duration-300"
                  >
                    <m.div
                      whileHover={{ scale: 1.1 }}
                      className="text-violet-400 mb-6 flex justify-center"
                    >
                      {useCase.icon}
                    </m.div>
                    <h3 className="text-xl font-semibold text-violet-200 mb-4">
                      {useCase.title}
                    </h3>
                    <p className="text-violet-300/70 mb-6">
                      {useCase.description}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {useCase.models.map((model, idx) => (
                        <m.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + idx * 0.1 }}
                          className="px-3 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20"
                        >
                          {model}
                        </m.span>
                      ))}
                    </div>
                  </m.div>
                ))}
              </div>
            </m.div>

            {/* Features Section */}
            <m.div {...scrollAnimationConfig} className="text-center mb-16 mt-16">
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12"
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

export default React.memo(MainContent);