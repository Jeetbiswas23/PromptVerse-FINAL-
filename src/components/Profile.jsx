import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../App';
import { 
  Settings, User, Mail, Calendar, Edit3, Camera, Github, 
  Twitter, Linkedin, Activity, Shield, Globe, Zap, Store, 
  Book, GitBranch, Award, Coins, Users, Sparkles, 
  TrendingUp, BarChart, Trophy, Heart, Star, X, AtSign, MapPin, FileText, Link, ArrowLeft
} from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

const FloatingOrb = ({ color, position, scale }) => (
  <Float speed={2} rotationIntensity={2} floatIntensity={3}>
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0}
        metalness={1}
      />
    </mesh>
  </Float>
);

// Optimize 3D background
const ThreeBackground = React.memo(() => (
  <div className="fixed inset-0 z-0">
    <Canvas
      camera={{ position: [0, 0, 10] }}
      dpr={[1, 2]} // Optimize for different screen densities
      performance={{ min: 0.5 }} // Lower performance threshold
    >
      <ambientLight intensity={0.5} />
      <FloatingOrb color="#4c1d95" position={[-5, 2, -5]} scale={2} />
      <FloatingOrb color="#7c3aed" position={[5, -2, -5]} scale={1.5} />
      <FloatingOrb color="#8b5cf6" position={[0, 3, -8]} scale={3} />
    </Canvas>
  </div>
));

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    bio: "AI Enthusiast | Prompt Engineer",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    website: "https://promptverse.ai",
    github: "github.com/promptverse",
    twitter: "twitter.com/promptverse",
    linkedin: "linkedin.com/in/promptverse"
  });

  const [activeTab, setActiveTab] = useState('marketplace');
  const [promptStats, setPromptStats] = useState({
    totalEarnings: "$1,234",
    promptsSold: 156,
    averageRating: 4.8,
    totalPrompts: 23
  });

  const userTabs = [
    { id: 'marketplace', label: 'Marketplace', icon: <Store className="w-4 h-4" /> },
    { id: 'prompts', label: 'My Prompts', icon: <Book className="w-4 h-4" /> },
    { id: 'versions', label: 'Versions', icon: <GitBranch className="w-4 h-4" /> }, // Changed from Git to GitBranch
    { id: 'challenges', label: 'Challenges', icon: <Trophy className="w-4 h-4" /> },
    { id: 'collaborations', label: 'Collaborations', icon: <Users className="w-4 h-4" /> },
    { id: 'earnings', label: 'Earnings', icon: <Coins className="w-4 h-4" /> },
  ];

  const userPrompts = [
    {
      id: 1,
      title: "Advanced Code Generation Assistant",
      category: "Development",
      price: "$9.99",
      rating: 4.9,
      sales: 234,
      versions: 5,
      collaborative: true
    },
    // ... more prompts
  ];

  const activeChallenges = [
    {
      id: 1,
      title: "Weekly Prompt Battle",
      deadline: "2 days left",
      prize: "$100",
      participants: 156,
      category: "Creative Writing"
    },
    // ... more challenges
  ];

  if (!user) {
    return <Navigate to="/signin" />;
  }

  const statsData = [
    { label: "Prompts Created", value: "234" },
    { label: "Contributions", value: "1.2k" },
    { label: "Following", value: "456" },
    { label: "Followers", value: "789" }
  ];

  const achievements = [
    { icon: <Zap className="w-5 h-5" />, title: "Power User", value: "Level 32" },
    { icon: <Shield className="w-5 h-5" />, title: "Contributor", value: "Elite" },
    { icon: <Activity className="w-5 h-5" />, title: "Streak", value: "47 days" },
    { icon: <Globe className="w-5 h-5" />, title: "Global Rank", value: "#142" },
  ];

  // Add new state for form data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    bio: profileData.bio,
    location: profileData.location,
    email: user?.email || '',
    github: profileData.github,
    twitter: profileData.twitter,
    linkedin: profileData.linkedin
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user context and profile data
    setUser(prev => ({
      ...prev,
      name: formData.name,
      username: formData.username,
      email: formData.email
    }));
    setProfileData(prev => ({
      ...prev,
      bio: formData.bio,
      location: formData.location,
      github: formData.github,
      twitter: formData.twitter,
      linkedin: formData.linkedin
    }));
    setEditing(false);
  };

  // Update the Edit Profile button click handler
  const handleEditClick = () => {
    setFormData({
      name: user?.name || '',
      username: user?.username || '',
      bio: profileData.bio,
      location: profileData.location,
      email: user?.email || '',
      github: profileData.github,
      twitter: profileData.twitter,
      linkedin: profileData.linkedin
    });
    setEditing(true);
  };

  // Update the Edit Profile Modal
  const renderEditModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-2xl overflow-hidden"
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 rounded-2xl animate-border-flow" />
        
        {/* Main content */}
        <div className="relative m-[1px] bg-black/90 backdrop-blur-xl rounded-2xl">
          {/* Header */}
          <div className="relative p-6 pb-0">
            <div className="absolute inset-0 bg-gradient-to-b from-violet-600/20 to-transparent" />
            <div className="relative flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent">
                Edit Profile
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEditing(false)}
                className="text-violet-300 hover:text-violet-100 p-2"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Profile Image Section */}
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000" />
                <div className="relative w-24 h-24 rounded-full border-2 border-violet-500/20 overflow-hidden">
                  <img
                    src={user.photoURL || `https://api.dicebear.com/6.x/avataaars/svg?seed=${user.name}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Form Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-violet-300 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-violet-950/40 rounded-xl p-3 text-violet-100 border border-violet-500/20 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-violet-300 flex items-center gap-2">
                    <AtSign className="w-4 h-4" />
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full bg-violet-950/40 rounded-xl p-3 text-violet-100 border border-violet-500/20 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
                    placeholder="Enter username"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-violet-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-violet-950/40 rounded-xl p-3 text-violet-100 border border-violet-500/20 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-violet-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-violet-950/40 rounded-xl p-3 text-violet-100 border border-violet-500/20 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
                    placeholder="Enter your location"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-violet-300 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-violet-950/40 rounded-xl p-3 text-violet-100 border border-violet-500/20 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about yourself"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-violet-200 flex items-center gap-2">
                <Link className="w-4 h-4" />
                Social Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl blur-sm" />
                  <div className="relative flex items-center space-x-3 bg-violet-950/40 rounded-xl p-3 border border-violet-500/20">
                    <Github className="w-5 h-5 text-violet-400" />
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="GitHub profile"
                      className="flex-1 bg-transparent text-violet-100 placeholder-violet-400/50 focus:outline-none"
                    />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl blur-sm" />
                  <div className="relative flex items-center space-x-3 bg-violet-950/40 rounded-xl p-3 border border-violet-500/20">
                    <Twitter className="w-5 h-5 text-violet-400" />
                    <input
                      type="text"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      placeholder="Twitter profile"
                      className="flex-1 bg-transparent text-violet-100 placeholder-violet-400/50 focus:outline-none"
                    />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative md:col-span-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl blur-sm" />
                  <div className="relative flex items-center space-x-3 bg-violet-950/40 rounded-xl p-3 border border-violet-500/20">
                    <Linkedin className="w-5 h-5 text-violet-400" />
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="LinkedIn profile"
                      className="flex-1 bg-transparent text-violet-100 placeholder-violet-400/50 focus:outline-none"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-violet-500/20">
              <motion.button
                type="button"
                onClick={() => setEditing(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 rounded-xl bg-violet-950/50 text-violet-300 hover:bg-violet-900/50 transition-colors duration-300"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300"
              >
                Save Changes
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );

  // Add exit animation
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  };

  const navigate = useNavigate();

  return (
    <motion.div 
      {...pageTransition}
      className="min-h-screen bg-[#0a0a0f] text-white"
    >
      {/* Background */}
      <ThreeBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-violet-300 hover:text-violet-100 transition-colors mb-8"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Back</span>
        </motion.button>

        {/* Profile Header - Cyberpunk Style */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 blur-3xl" />
          <div className="relative backdrop-blur-2xl bg-black/40 border border-violet-500/20 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Profile Image with Cyberpunk Frame */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000" />
                <div className="relative w-40 h-40 rounded-full border-4 border-violet-500/20 overflow-hidden">
                  <img 
                    src={user.photoURL || `https://api.dicebear.com/6.x/avataaars/svg?seed=${user.name}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </motion.div>

              {/* User Info with Glowing Elements */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    {user.name}
                  </span>
                </h1>
                <p className="text-violet-300/70 mb-6">@{user.username || user.name.toLowerCase().replace(' ', '')}</p>
                
                {/* Achievement Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl blur-sm" />
                      <div className="relative p-4 backdrop-blur-xl bg-black/40 rounded-xl border border-violet-500/20">
                        <div className="text-violet-400 mb-2">{achievement.icon}</div>
                        <div className="text-sm text-violet-200">{achievement.title}</div>
                        <div className="text-lg font-bold text-violet-300">{achievement.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEditClick}
                    className="px-6 py-3 bg-violet-600/20 hover:bg-violet-600/30 rounded-xl border border-violet-500/20 backdrop-blur-xl"
                  >
                    <div className="flex items-center space-x-2">
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-fuchsia-600/20 hover:bg-fuchsia-600/30 rounded-xl border border-fuchsia-500/20 backdrop-blur-xl"
                  >
                    View Analytics
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats and Activity Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Rest of your components with updated styling */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-violet-400" />
              <span>Personal Information</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-violet-400" />
                <span className="text-violet-200">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-violet-400" />
                <span className="text-violet-200">Joined {profileData.joinDate}</span>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold mb-4">Social Links</h2>
            <div className="space-y-4">
              <motion.a 
                href={`https://${profileData.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-violet-200 hover:text-violet-100 transition-colors"
                whileHover={{ x: 5 }}
              >
                <Github className="w-4 h-4" />
                <span>{profileData.github}</span>
              </motion.a>
              <motion.a 
                href={`https://${profileData.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-violet-200 hover:text-violet-100 transition-colors"
                whileHover={{ x: 5 }}
              >
                <Twitter className="w-4 h-4" />
                <span>{profileData.twitter}</span>
              </motion.a>
              <motion.a 
                href={`https://${profileData.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-violet-200 hover:text-violet-100 transition-colors"
                whileHover={{ x: 5 }}
              >
                <Linkedin className="w-4 h-4" />
                <span>{profileData.linkedin}</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* New Sections */}
        <div className="mt-8">
          {/* Tab Navigation */}
          <div className="flex overflow-x-auto space-x-2 pb-4 mb-6">
            {userTabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === tab.id 
                    ? 'bg-violet-600/20 border border-violet-500/20' 
                    : 'bg-black/20 hover:bg-violet-600/10'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Marketplace Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Earnings", value: promptStats.totalEarnings, icon: <Coins /> },
              { label: "Prompts Sold", value: promptStats.promptsSold, icon: <TrendingUp /> },
              { label: "Average Rating", value: promptStats.averageRating, icon: <Star /> },
              { label: "Total Prompts", value: promptStats.totalPrompts, icon: <Book /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl blur-sm" />
                <div className="relative p-4 backdrop-blur-xl bg-black/40 rounded-xl border border-violet-500/20">
                  <div className="text-violet-400 mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-violet-300">{stat.value}</div>
                  <div className="text-sm text-violet-400/70">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Content Based on Active Tab */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'marketplace' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userPrompts.map((prompt) => (
                    <motion.div
                      key={prompt.id}
                      whileHover={{ scale: 1.02 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-xl blur-sm" />
                      <div className="relative backdrop-blur-xl bg-black/40 rounded-xl border border-violet-500/20 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-violet-200">{prompt.title}</h3>
                          <span className="text-violet-400 font-bold">{prompt.price}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-violet-300/70">
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            {prompt.rating}
                          </span>
                          <span className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {prompt.sales} sales
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'challenges' && (
                <div className="space-y-6">
                  {activeChallenges.map((challenge) => (
                    <motion.div
                      key={challenge.id}
                      whileHover={{ scale: 1.01 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-xl blur-sm" />
                      <div className="relative backdrop-blur-xl bg-black/40 rounded-xl border border-violet-500/20 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-violet-200">{challenge.title}</h3>
                            <p className="text-violet-300/70">{challenge.category}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-violet-400 font-bold">{challenge.prize}</div>
                            <div className="text-sm text-violet-300/70">{challenge.deadline}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Add more tab content as needed */}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Edit Profile Modal */}
        <AnimatePresence>
          {editing && renderEditModal()}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default React.memo(Profile); // Memoize the entire component