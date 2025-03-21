import React, { useState, useEffect } from 'react';
import { GitBranch, GitCommit, GitMerge, GitPullRequest, Plus, Check, Github, RefreshCcw, Upload, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Octokit } from '@octokit/rest';

const VersionControl = () => {
  const [versions, setVersions] = useState([
    {
      id: 1,
      name: "Main",
      type: "branch",
      commits: [
        { id: 1, message: "Initial prompt creation", timestamp: "2024-01-15 10:00" },
        { id: 2, message: "Refined tone and style", timestamp: "2024-01-15 14:30" }
      ]
    },
    {
      id: 2,
      name: "Experimental",
      type: "branch",
      commits: [
        { id: 3, message: "Testing new approach", timestamp: "2024-01-16 09:15" },
        { id: 4, message: "Added parameters", timestamp: "2024-01-16 11:45" }
      ]
    }
  ]);

  const [selectedVersion, setSelectedVersion] = useState(versions[0]);
  const [newBranchName, setNewBranchName] = useState("");
  const [showNewBranchInput, setShowNewBranchInput] = useState(false);
  
  // New states for GitHub integration
  const [githubToken, setGithubToken] = useState(localStorage.getItem('githubToken') || '');
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const octokit = new Octokit({ auth: githubToken });

  useEffect(() => {
    if (githubToken) {
      fetchRepositories();
    }
  }, [githubToken]);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      const { data } = await octokit.repos.listForAuthenticatedUser();
      setRepositories(data);
      setLoading(false);
    } catch (error) {
      showNotification('Error fetching repositories', 'error');
      setLoading(false);
    }
  };

  const createRepository = async (name, description) => {
    try {
      setLoading(true);
      const { data } = await octokit.repos.createForAuthenticatedUser({
        name,
        description,
        private: false,
      });
      setRepositories([...repositories, data]);
      setSelectedRepo(data);
      showNotification('Repository created successfully!', 'success');
      setLoading(false);
    } catch (error) {
      showNotification('Error creating repository', 'error');
      setLoading(false);
    }
  };

  const pushChanges = async () => {
    if (!selectedRepo) return;
    try {
      setLoading(true);
      // Implement your push logic here using octokit
      showNotification('Changes pushed successfully!', 'success');
      setLoading(false);
    } catch (error) {
      showNotification('Error pushing changes', 'error');
      setLoading(false);
    }
  };

  const pullChanges = async () => {
    if (!selectedRepo) return;
    try {
      setLoading(true);
      // Implement your pull logic here using octokit
      showNotification('Changes pulled successfully!', 'success');
      setLoading(false);
    } catch (error) {
      showNotification('Error pulling changes', 'error');
      setLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Add this before the return statement
  const handleGithubAuth = () => {
    // Implement GitHub OAuth flow
    const clientId = 'YOUR_GITHUB_CLIENT_ID';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`;
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* GitHub Authentication Section */}
        {!githubToken && (
          <div className="mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGithubAuth}
              className="flex items-center gap-2 px-6 py-3 bg-violet-500 rounded-lg hover:bg-violet-600 transition-colors"
            >
              <Github className="w-5 h-5" />
              Connect with GitHub
            </motion.button>
          </div>
        )}

        {/* Notification Toast */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed top-4 right-4 p-4 rounded-lg ${
              notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {notification.message}
          </motion.div>
        )}

        {/* Repository Selection */}
        {githubToken && (
          <div className="mb-8 bg-violet-900/20 rounded-xl p-6 border border-violet-500/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">GitHub Repositories</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchRepositories}
                className="p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 transition-colors"
              >
                <RefreshCcw className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {repositories.map(repo => (
                <motion.button
                  key={repo.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedRepo(repo)}
                  className={`p-4 rounded-lg ${
                    selectedRepo?.id === repo.id
                      ? 'bg-violet-500/30 border-violet-500/50'
                      : 'bg-violet-900/30 border-violet-500/20'
                  } border`}
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    <span>{repo.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <GitBranch className="w-8 h-8 text-violet-400" />
          Version Control
        </h1>

        {/* Branches Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-violet-900/20 rounded-xl p-6 border border-violet-500/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Branches</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNewBranchInput(true)}
                className="p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>

            {showNewBranchInput && (
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newBranchName}
                  onChange={(e) => setNewBranchName(e.target.value)}
                  placeholder="New branch name"
                  className="flex-1 bg-violet-900/30 border border-violet-500/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreateBranch}
                  className="p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 transition-colors"
                >
                  <Check className="w-5 h-5" />
                </motion.button>
              </div>
            )}

            <div className="space-y-2">
              {versions.map((version) => (
                <motion.button
                  key={version.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedVersion(version)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedVersion.id === version.id
                      ? 'bg-violet-500/30 border border-violet-500/50'
                      : 'bg-violet-900/30 border border-violet-500/20 hover:bg-violet-500/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-violet-400" />
                    <span>{version.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Commits Section */}
          <div className="col-span-2 bg-violet-900/20 rounded-xl p-6 border border-violet-500/20">
            <h2 className="text-xl font-semibold mb-6">Commits</h2>
            <div className="space-y-4">
              {selectedVersion.commits.map((commit) => (
                <motion.div
                  key={commit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-violet-900/30 rounded-lg p-4 border border-violet-500/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <GitCommit className="w-4 h-4 text-violet-400" />
                    <span className="text-sm text-violet-300">{commit.timestamp}</span>
                  </div>
                  <p className="text-white/90">{commit.message}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="mt-8 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 rounded-lg border border-violet-500/30 hover:bg-violet-500/30 transition-colors"
          >
            <GitMerge className="w-4 h-4" />
            Merge Branch
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 rounded-lg border border-violet-500/30 hover:bg-violet-500/30 transition-colors"
          >
            <GitPullRequest className="w-4 h-4" />
            Create Pull Request
          </motion.button>

          {/* New GitHub-specific actions */}
          {selectedRepo && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={pushChanges}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-colors"
                disabled={loading}
              >
                <Upload className="w-4 h-4" />
                Push Changes
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={pullChanges}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                disabled={loading}
              >
                <Download className="w-4 h-4" />
                Pull Changes
              </motion.button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VersionControl;
