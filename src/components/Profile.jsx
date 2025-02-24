import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../App';
import { Settings, User, Mail, Calendar, Edit3, Camera, Github, Twitter, Linkedin, Activity, Shield, Globe, Zap } from 'lucide-react';
import { Navigate } from 'react-router-dom';
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

const Profile = () => {
  const { user } = useContext(AuthContext);
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

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 via-black to-black" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDIsIDkwLCAyNDksIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
      </div>

      {/* 3D Background Elements */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <FloatingOrb color="#4c1d95" position={[-5, 2, -5]} scale={2} />
          <FloatingOrb color="#7c3aed" position={[5, -2, -5]} scale={1.5} />
          <FloatingOrb color="#8b5cf6" position={[0, 3, -8]} scale={3} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
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
                    className="px-6 py-3 bg-violet-600/20 hover:bg-violet-600/30 rounded-xl border border-violet-500/20 backdrop-blur-xl"
                  >
                    Edit Profile
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

        {/* Edit Profile Modal */}
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-violet-950/90 rounded-xl p-6 max-w-md w-full border border-violet-500/20"
            >
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
              <form className="space-y-4">
                <div>
                  <label className="text-sm text-violet-300">Bio</label>
                  <textarea
                    className="w-full bg-violet-900/20 rounded-lg p-2 mt-1 text-violet-100"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-violet-300">Location</label>
                  <input
                    type="text"
                    className="w-full bg-violet-900/20 rounded-lg p-2 mt-1 text-violet-100"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 rounded-lg bg-violet-900/50 text-violet-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-violet-600 text-white"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;