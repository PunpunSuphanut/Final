import React from 'react';
import './PostList.css';
import CommentSection from './CommentSection';

const PostList = ({ posts, onEdit, onDelete, onLike, user, comments, onAddComment }) => {
  return (
    <div>
      {posts.map((post) => (
        <div className="post-container" key={post.id}>
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{post.content}</p>
          <div className="post-footer">
            <span>Posted by: {post.user}</span>
            <div>
              {post.user === user && (
                <>
                  <button className="post-button" onClick={() => onEdit(post)}>Edit</button>
                  <button className="post-button" onClick={() => onDelete(post.id)}>Delete</button>
                </>
              )}
              <button className="post-button" onClick={() => onLike(post.id)}>
                {post.likes.includes(user) ? 'Unlike' : 'Like'} ({post.likes.length})
              </button>
            </div>
          </div>
          <CommentSection
            postId={post.id}
            comments={comments[post.id] || []}
            onAddComment={onAddComment}
          />
        </div>
      ))}
    </div>
  );
};

export default PostList;
