// controllers/commentController.js

// Import the Comment model (adjust the path as needed)
const Comment = require('../models/comment'); // Assuming you have a Comment model in a 'models' directory

// Controller function to add a new comment
exports.addComment = async (req, res) => {
  try {
    const { content, author } = req.body; // Extract content and author from request body

    // Create a new comment instance
    const newComment = new Comment({
      content,
      author,
      createdAt: new Date()
    });

    // Save the comment to the database
    await newComment.save();

    // Send a success response
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment', error: error.message });
  }
};

// Controller function to get all comments
exports.getAllComments = async (req, res) => {
  try {
    // Fetch all comments from the database
    const comments = await Comment.find();

    // Send a success response with the comments
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
  }
};

// Controller function to delete a comment by ID
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params; // Extract the comment ID from request parameters

    // Find the comment by ID and delete it
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Send a success response
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Failed to delete comment', error: error.message });
  }
};

// Controller function to update a comment by ID
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params; // Extract the comment ID from request parameters
    const { content } = req.body; // Extract the new content from the request body

    // Find the comment by ID and update it
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true } // Return the updated document
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Send a success response with the updated comment
    res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Failed to update comment', error: error.message });
  }
};
