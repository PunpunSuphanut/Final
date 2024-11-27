import React, { useState } from 'react';
import './CommentSection.css';

const CommentSection = ({ postId, comments, onAddComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddComment(postId, comment);
    setComment('');
  };

  return (
    <div className="comment-container">
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          className="comment-textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        ></textarea>
        <button className="comment-button" type="submit">
          Add Comment
        </button>
      </form>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.user}</strong>: <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
