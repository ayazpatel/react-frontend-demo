// Import React library and useState hook for basic state management
import React, { useState } from 'react';
// Import custom notification context hook for showing user feedback
import { useNotification } from '../../context/NotificationContext';

/**
 * BlogUseState Component
 * Demonstrates blog post management using useState hook
 * 
 * Key Concepts Demonstrated:
 * 1. useState for managing multiple state variables
 * 2. Form handling with controlled components
 * 3. Array state updates with spread operator
 * 4. Input validation and user feedback
 * 5. Dynamic list rendering with map()
 * 
 * State Management Pattern:
 * - posts: Array of blog posts (complex state)
 * - title: String for form input (simple state)
 * - Separate useState calls for independent state variables
 */
const BlogUseState = () => {
    // useState for blog posts array - stores all blog posts
    // Initial state includes one sample post to demonstrate existing data
    const [posts, setPosts] = useState([
        { id: 1, title: 'First Post (useState)' }
    ]);
    
    // useState for form input - controlled component pattern
    // This creates a controlled input where React manages the input value
    const [title, setTitle] = useState('');
    
    // Get notification function from context for user feedback
    const showNotification = useNotification();
    
    /**
     * Function to add new blog post
     * Demonstrates form validation, state update, and user feedback
     */
    const handleAddPost = () => { 
        // Input validation - check if title is not empty
        if (title.trim()) { 
            // Update posts array using functional state update
            // Spread operator creates new array (immutability principle)
            setPosts(currentPosts => [
                ...currentPosts, 
                { 
                    id: Date.now(), // Simple ID generation using timestamp
                    title: title.trim() // Remove whitespace from title
                }
            ]); 
            
            // Show success notification to user
            showNotification('Post added successfully!'); 
            
            // Clear form input after successful submission
            setTitle(''); 
        } else {
            // Show error notification for empty input
            showNotification('Please enter a post title!');
        }
    };
    
    /**
     * Handle Enter key press for better UX
     * Allows users to submit form by pressing Enter
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
                <div className="card-header">
                    <h4 className="mb-0">Add New Blog Post</h4>
                </div>
                <div className="card-body">
                    {/* Bootstrap Input Group for styled form */}
                    <div className="input-group mb-3">
                        {/* Controlled Input Component */}
                        <input 
                            value={title} // Controlled by React state
                            onChange={(e) => setTitle(e.target.value)} // Update state on change
                            onKeyPress={handleKeyPress} // Handle Enter key
                            placeholder="Enter post title..." 
                            className="form-control"
                            type="text"
                        />
                        
                        {/* Submit Button */}
                        <button 
                            onClick={handleAddPost} 
                            className="btn btn-primary"
                            disabled={!title.trim()} // Disable if no title
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
                    {/* Conditional Rendering - Show posts or empty message */}
                    {posts.length > 0 ? (
                        /* List Group for displaying posts */
                        <ul className="list-group list-group-flush">
                            {/* Map through posts array to render each post */}
                            {posts.map(post => (
                                <li 
                                    key={post.id} // Unique key for React reconciliation
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    {/* Post Title */}
                                    <span className="fw-medium">{post.title}</span>
                                    
                                    {/* Post Metadata */}
                                    <small className="text-muted">
                                        ID: {post.id}
                                    </small>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        /* Empty State Message */
                        <div className="text-center text-muted py-4">
                            <p>No blog posts yet. Add your first post above!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Export component as default export for use in other parts of the application
export default BlogUseState;