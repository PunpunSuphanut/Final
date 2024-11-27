import React, { useState, useEffect } from 'react';
import './PostForm.css';

const PostForm = ({ onSave, post }) => {
  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: post ? post.id : Date.now(), title, content });
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <label className="post-form-label">
        Title:
        <input
          className="post-form-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className="post-form-label">
        Content:
        <textarea
          className="post-form-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </label>
      <button className="post-form-button" type="submit">
        {post ? 'Update' : 'Add'} Post
      </button>
    </form>
  );
};

export default PostForm;
