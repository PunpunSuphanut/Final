import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import SearchBar from './components/SearchBar';

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setUser(username);
      setLoginError('');
    } else {
      setLoginError('รหัสผิดพลาด');
    }
  };

  const handleSignUp = (username, password) => {
    setUsers([...users, { username, password }]);
  };

  const switchToSignUp = () => {
    setIsSignUp(true);
  };

  const switchToLogin = () => {
    setIsSignUp(false);
  };

  const handleLogout = () => {
    setUser(null);
  };
const handleSavePost = (post) => {
  setPosts((prevPosts) =>
    prevPosts.some((p) => p.id === post.id)
      ? prevPosts.map((p) => (p.id === post.id ? { ...post, user: p.user, likes: p.likes } : p))
      : [...prevPosts, { ...post, user: user, likes: [] }]
  );
  setEditingPost(null);
  handleSearch(searchQuery);
};

const handleDeletePost = (postId) => {
  setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
  handleSearch(searchQuery);
};
  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleLikePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id === postId) {
          const likes = p.likes.includes(user)
            ? p.likes.filter((username) => username !== user)
            : [...p.likes, user];
          return { ...p, likes };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), { user, text: comment }]
    }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const results = posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(results);
    } else {
      setSearchResults(posts);
    }
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [posts]);

  return (
    <div className="container">
      {!user ? (
        isSignUp ? (
          <SignUp onSignUp={handleSignUp} switchToLogin={switchToLogin} />
        ) : (
          <Login onLogin={handleLogin} loginError={loginError} switchToSignUp={switchToSignUp} />
        )
      ) : (
        <>
          <header>Welcome, {user}</header>
          <button className="logout" onClick={handleLogout}>Logout</button>
          <PostForm onSave={handleSavePost} post={editingPost} />
          <SearchBar onSearch={handleSearch} />
          <PostList
            posts={searchResults.length ? searchResults : posts}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            onLike={handleLikePost}
            user={user}
            comments={comments}
            onAddComment={handleAddComment}
          />
        </>
      )}
    </div>
  );
};

export default App;
