// Import React library and useState hook for local form state
import React, { useState } from 'react';
// Import Redux hooks for connecting component to global state
import { useSelector, useDispatch } from 'react-redux';
// Import action creators from blog slice for dispatching actions
import { addPost, deletePost, clearPosts } from '../../store/blogSlice';
// Import custom notification context hook for showing user feedback
import { useNotification } from '../../context/NotificationContext';

/**
 * BlogRedux Component
 * Demonstrates blog post management using Redux Toolkit for global state management
 * 
 * Key Concepts Demonstrated:
 * 1. Redux global state management with useSelector
 * 2. Dispatching actions with useDispatch
 * 3. Action creators from Redux Toolkit slices
 * 4. Combining Redux (global state) with useState (local form state)
 * 5. Separation of concerns - state logic in slice, UI logic in component
 * 
 * Redux Benefits:
 * - Global state accessible from any component
 * - Predictable state updates through actions
 * - Time-travel debugging with Redux DevTools
 * - State persistence across component unmounts
 * - Centralized state management for complex applications
 */
const BlogRedux = () => {
  // useSelector Hook - Extract posts data from Redux store
  // This subscribes component to Redux store updates
  // When posts state changes, component automatically re-renders
  const posts = useSelector((state) => state.blog.posts);
  
  // useDispatch Hook - Get dispatch function to send actions to Redux store
  const reduxDispatch = useDispatch();
  
  // useState for form input - local component state
  // Form state doesn't need to be global, so useState is appropriate here
  const [title, setTitle] = useState('');
  
  // Get notification function from context
  const showNotification = useNotification();
  
  /**
   * Function to add new blog post
   * Dispatches Redux action and shows user notification
   */
  const handleAddPost = () => { 
    // Input validation
    if (title.trim()) { 
      // Dispatch 'addPost' action to Redux store
      // Action creator automatically creates proper action object
      reduxDispatch(addPost({ 
        id: Date.now(), // Simple ID generation
        title: title.trim(),
        createdAt: new Date().toISOString() // Add timestamp
      })); 
      
      // Show success notification
      showNotification('Post added successfully!'); 
      
      // Clear local form state
      setTitle(''); 
    } else {
      showNotification('Please enter a post title!');
    }
  };
  
  /**
   * Function to delete a blog post
   * Dispatches deletePost action to Redux store
   */
  const handleDeletePost = (postId) => {
    reduxDispatch(deletePost({ id: postId }));
    showNotification('Post deleted successfully!');
  };
  
  /**
   * Function to clear all posts
   * Dispatches clearPosts action to Redux store
   */
  const handleClearAllPosts = () => {
    if (posts.length > 0) {
      reduxDispatch(clearPosts());
      showNotification('All posts cleared!');
    }
  };
  
  /**
   * Handle Enter key press for form submission
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddPost();
    }
  };
  
  // JSX Return - Component Rendering
  return (
    <div className="container-fluid">
      {/* Form Section - Add New Post */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Add New Blog Post (Redux)</h4>
          {/* Clear All Button */}
          {posts.length > 0 && (
            <button 
              onClick={handleClearAllPosts}
              className="btn btn-outline-danger btn-sm"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="card-body">
          {/* Bootstrap Input Group */}
          <div className="input-group mb-3">
            {/* Controlled Input - local state managed by useState */}
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter post title..." 
              className="form-control"
              type="text"
            />
            
            {/* Submit Button */}
            <button 
              onClick={handleAddPost} 
              className="btn btn-primary"
              disabled={!title.trim()}
            >
              Add Post
            </button>
          </div>
        </div>
      </div>
      
      {/* Posts Display Section */}
      <div className="card">
        <div className="card-header">
          <h4 className="mb-0">Blog Posts ({posts.length})</h4>
          <small className="text-muted">
            Data managed by Redux store - persists across component re-mounts
          </small>
        </div>
        <div className="card-body">
          {/* Conditional Rendering - data comes from Redux store */}
          {posts.length > 0 ? (
            <ul className="list-group list-group-flush">
              {/* Map through posts from Redux store */}
              {posts.map(post => (
                <li 
                  key={post.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    {/* Post Title */}
                    <span className="fw-medium">{post.title}</span>
                    {/* Post Metadata */}
                    <div className="small text-muted">
                      ID: {post.id}
                      {post.createdAt && (
                        <span className="ms-2">
                          Created: {new Date(post.createdAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="btn btn-outline-danger btn-sm"
                    title="Delete post"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            /* Empty State */
            <div className="text-center text-muted py-4">
              <p>No blog posts yet. Add your first post above!</p>
              <small>This data is managed by Redux store</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export component as default export for use in other parts of the application
export default BlogRedux;