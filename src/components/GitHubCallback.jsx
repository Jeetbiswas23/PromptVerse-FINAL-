import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';

export const GitHubCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const handleCallback = async () => {
      const code = new URLSearchParams(location.search).get('code');
      
      if (code) {
        try {
          // Exchange code for access token
          const accessToken = await exchangeCodeForToken(code);
          // Get user data from GitHub
          const userData = await fetchGitHubUserData(accessToken);
          
          const user = {
            name: userData.name || userData.login,
            email: userData.email,
            avatar: userData.avatar_url,
            provider: 'github',
            githubUsername: userData.login,
            githubProfile: userData.html_url
          };

          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/', { replace: true });
        } catch (error) {
          console.error('GitHub auth error:', error);
          navigate('/signin', { replace: true });
        }
      } else {
        navigate('/signin', { replace: true });
      }
    };

    handleCallback();
  }, [location, navigate, setUser]);

  // Function to exchange code for token
  const exchangeCodeForToken = async (code) => {
    const tokenUrl = `https://github.com/login/oauth/access_token?client_id=Ov23liVFc6uJxtO02iHD&client_secret=YOUR_CLIENT_SECRET&code=${code}`;
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const data = await response.json();
    return data.access_token;
  };

  // Function to fetch GitHub user data
  const fetchGitHubUserData = async (accessToken) => {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${accessToken}`
      }
    });
    
    return response.json();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-violet-300">Authenticating with GitHub...</div>
    </div>
  );
};