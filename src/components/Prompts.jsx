import React, { useState, useEffect } from 'react';
import { Search, Copy, Heart, MessageSquare, Code, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Simplified PromptCard component
const PromptCard = ({ prompt, onClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClick}
      className="bg-[#121212] p-6 rounded-lg border border-[#6C63FF]/20 hover:border-[#6C63FF]/40 transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-[#EAEAEA]">{prompt.title}</h3>
        <span className="px-2 py-1 text-xs rounded-full bg-[#6C63FF]/20 text-[#EAEAEA]">
          {prompt.type}
        </span>
      </div>
      
      <p className="text-[#EAEAEA]/70 mb-4 line-clamp-2">{prompt.description}</p>
      
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
    </div>
  );
};

// Main Prompts component
const Prompts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [prompts, setPrompts] = useState([]);

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

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || prompt.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#121212] text-[#EAEAEA]">
      {/* Header */}
      <header className="border-b border-[#6C63FF]/20 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-xl font-bold text-[#6C63FF]"
          >
            PromptVerse
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 bg-[#121212] border border-[#6C63FF]/20 rounded-lg focus:border-[#6C63FF]/40 focus:ring-1 focus:ring-[#6C63FF]/40"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6C63FF]/40" />
          </div>
        </div>

        {/* Type filters */}
        <div className="flex gap-4 mb-8">
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                selectedType === type.id
                  ? 'border-[#6C63FF] bg-[#6C63FF]/10'
                  : 'border-[#6C63FF]/20 hover:border-[#6C63FF]/40'
              }`}
            >
              {type.icon}
              <span>{type.label}</span>
            </button>
          ))}
        </div>

        {/* Prompts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onClick={() => {/* Handle prompt selection */}}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Prompts;