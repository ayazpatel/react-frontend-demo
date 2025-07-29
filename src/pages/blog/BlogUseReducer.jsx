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
        [
            { 
                id: 1, 
                title: 'First Post (useReducer)', 
                content: 'This is a sample blog post content using useReducer.', 
                category: 'Technology' 
            }
        ] // Initial state
    );

    // useState for form inputs - simple state that doesn't need reducer
    // This demonstrates combining useReducer with useState appropriately
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    // Available categories for the dropdown
    const categories = ['Technology', 'Lifestyle', 'Business', 'Health', 'Education', 'Entertainment'];

    // Get notification function from context
    const showNotification = useNotification();

    /**
     * Function to add new blog post
     * Dispatches ADD_POST action to reducer
     */
    const handleAddPost = () => {
        // Input validation
        if (title.trim() && content.trim() && category) {
            // Dispatch action to reducer with type and payload
            dispatch({
                type: 'ADD_POST',
                payload: {
                    id: Date.now(), // Simple ID generation
                    title: title.trim(),
                    content: content.trim(),
                    category: category,
                    createdAt: new Date().toISOString() // Add timestamp
                }
            });

            // Show success notification
            showNotification('Post added successfully!');

            // Clear form inputs
            setTitle('');
            setContent('');
            setCategory('');
        } else {
            showNotification('Please fill in all fields (title, content, and category)!');
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
                    {/* Title Input */}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Post Title</label>
                        <input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter post title..."
                            className="form-control"
                            type="text"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="form-select"
                        >
                            <option value="">Select a category...</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Content Textarea */}
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter post content..."
                            className="form-control"
                            rows="4"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleAddPost}
                        className="btn btn-primary w-100"
                        disabled={!title.trim() || !content.trim() || !category}
                    >
                        Add Post
                    </button>
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
                        <div className="row">
                            {/* Map through posts to render each one */}
                            {posts.map(post => (
                                <div key={post.id} className="col-md-6 mb-3">
                                    <div className="card h-100">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <h5 className="card-title mb-0">{post.title}</h5>
                                            <div>
                                                <span className="badge bg-primary me-2">{post.category}</span>
                                                <button
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className="btn btn-outline-danger btn-sm"
                                                    title="Delete post"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">{post.content}</p>
                                        </div>
                                        <div className="card-footer">
                                            <small className="text-muted">
                                                ID: {post.id}
                                                {post.createdAt && (
                                                    <span className="ms-2">
                                                        Created: {new Date(post.createdAt).toLocaleString()}
                                                    </span>
                                                )}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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