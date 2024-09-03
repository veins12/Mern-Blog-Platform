// components/CommentSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';



// Function to add a comment
const addComment = async (commentData) => {
    try {
      const response = await axios.post('/api/comments', commentData);
      console.log('Comment added:', response.data);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ content: '', author: '' });

  useEffect(() => {
    // Fetch comments when the component mounts
    axios.get(`/api/comments/${postId}`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Failed to fetch comments:', error));
  }, [postId]);

  const handleInputChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    axios.post('/api/comments', { ...newComment, postId })
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment({ content: '', author: '' });
      })
      .catch(error => console.error('Failed to add comment:', error));
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {comments.map(comment => (
        <div className="comment-box" key={comment._id}>
          <p><strong>{comment.author}:</strong> {comment.content}</p>
        </div>
      ))}
      <form className="comment-form" onSubmit={handleAddComment}>
        <input 
          type="text" 
          name="author" 
          placeholder="Your name" 
          value={newComment.author} 
          onChange={handleInputChange} 
          required 
        />
        <textarea 
          name="content" 
          placeholder="Add a comment..." 
          value={newComment.content} 
          onChange={handleInputChange} 
          required 
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;




const handleAddComment = async (commentData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/comments', commentData);
    console.log('Comment added:', response.data);
  } catch (error) {
    console.error('Failed to add comment:', error);
  }
};

