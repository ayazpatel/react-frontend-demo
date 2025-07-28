// Import React library with useReducer and useState hooks
import React, { useReducer, useState } from 'react';
// Import custom notification context hook for showing user feedback
import { useNotification } from '../../context/NotificationContext';

/**
 * Blog Reducer Function
 * Handles state transitions for blog posts using reducer pattern
 * 
 * @param {Array} state - Current posts array
 * @param {Object} action - Action object with type and payload
 * @returns {Array} - New posts state
 * 
 * Reducer Pattern Benefits:
 * - Predictable state updates
 * - Centralized state logic
 * - Easy to test and debug
 * - Scalable for complex state operations
 */
const blogReducer = (state, action) => {
    switch (action.type) {
        // ADD_POST action: Adds new post to the posts array
        case 'ADD_POST':
            // Return new array with existing posts plus new post
            // Spread operator ensures immutability
            return [...state, action.payload];
        
        // DELETE_POST action: Removes post by ID
        case 'DELETE_POST':
            return state.filter(post => post.id !== action.payload.id);
        
        // UPDATE_POST action: Updates existing post
        case 'UPDATE_POST':
            return state.map(post => 
                post.id === action.payload.id 
                    ? { ...post, ...action.payload.updates }
                    : post
            );
        
        // CLEAR_POSTS action: Removes all posts
        case 'CLEAR_POSTS':
            return [];
        
        // Default case: Return unchanged state for unknown actions
        default:
            return state;
    }
};

/**
 * BlogUseReducer Component
 * Demonstrates blog post management using useReducer hook
 * 
 * Key Concepts Demonstrated:
 * 1. useReducer for managing complex state logic
 * 2. Action-based state updates
 * 3. Combining useReducer with useState
 * 4. Reducer pattern for predictable state changes
 * 5. Separation of state logic and UI logic
 * 
 * useReducer vs useState:
 * - useReducer: Complex state logic, multiple related updates
 * - useState: Simple state, independent variables
 */
const BlogUseReducer = () => {
    // useReducer Hook Setup
    // posts: current state (array of blog posts)
    // dispatch: function to trigger state changes via actions
    const [posts, dispatch] = useReducer(
        blogReducer, // Reducer function
        [{ id: 1, title: 'First Post (useReducer)' }] // Initial state
    );
    
    // useState for form input - simple state that doesn't need reducer
    // This demonstrates combining useReducer with useState appropriately
    const [title, setTitle] = useState('');
    
    // Get notification function from context
    const showNotification = useNotification();
    
    /**
     * Function to add new blog post
     * Dispatches ADD_POST action to reducer
     */
    const handleAddPost = () => { 
        // Input validation
        if (title.trim()) { 
            // Dispatch action to reducer with type and payload
            dispatch({ 
                type: 'ADD_POST', 
                payload: { 
                    id: Date.now(), // Simple ID generation
                    title: title.trim(),
                    createdAt: new Date().toISOString() // Add timestamp
                } 
            }); 
            
            // Show success notification
            showNotification('Post added successfully!'); 
            
            // Clear form input
            setTitle(''); 
        } else {
            showNotification('Please enter a post title!');
        }
    };
    
    /**
     * Function to delete a blog post
     * Demonstrates DELETE_POST action
     */
    const handleDeletePost = (postId) => {
        dispatch({
            type: 'DELETE_POST',
            payload: { id: postId }
        });
        showNotification('Post deleted successfully!');
    };
    
    /**
     * Function to clear all posts
     * Demonstrates CLEAR_POSTS action
     */
    const handleClearAllPosts = () => {
        if (posts.length > 0) {
            dispatch({ type: 'CLEAR_POSTS' });
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
                    <h4 className="mb-0">Add New Blog Post (useReducer)</h4>
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
                        {/* Controlled Input */}
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
                </div>
                <div className="card-body">
                    {/* Conditional Rendering */}
                    {posts.length > 0 ? (
                        <ul className="list-group list-group-flush">
                            {/* Map through posts to render each one */}
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Export component as default export
export default BlogUseReducer;