import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../App';
import { Settings, User, Mail, Calendar, Edit3, Camera, Github, Twitter, Linkedin } from 'lucide-react';
import { Navigate } from 'react-router-dom';

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

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Profile Image */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-violet-500/20">
                <img 
                  src={user.photoURL || `https://api.dicebear.com/6.x/avataaars/svg?seed=${user.name}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-violet-600 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-200 to-purple-200 bg-clip-text text-transparent">
                    {user.name}
                  </h1>
                  <p className="text-violet-300/70">@{user.username || user.name.toLowerCase().replace(' ', '')}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditing(!editing)}
                  className="px-4 py-2 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/20 flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </motion.button>
              </div>

              {/* Bio */}
              <p className="mt-4 text-violet-200/90">{profileData.bio}</p>

              {/* User Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {statsData.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="text-2xl font-bold text-violet-300">{stat.value}</div>
                    <div className="text-sm text-violet-400/70">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Personal Info */}
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