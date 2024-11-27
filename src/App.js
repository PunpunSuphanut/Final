import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import SearchBar from './components/SearchBar';

const App = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
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
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
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
    setSearchResults(posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase())));
  };

  return (
    <div className="container">
      {!user ? (
        <Login onLogin={handleLogin} />
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
