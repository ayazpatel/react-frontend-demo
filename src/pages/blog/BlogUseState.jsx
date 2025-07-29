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
        { id: 1, title: 'First Post (useState)', content: 'This is a sample blog post content.', category: 'Technology' }
    ]);
    
    // useState for form inputs - controlled component pattern
    // This creates controlled inputs where React manages the input values
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    
    // Available categories for the dropdown
    const categories = ['Technology', 'Lifestyle', 'Business', 'Health', 'Education', 'Entertainment'];
    
    // Get notification function from context for user feedback
    const showNotification = useNotification();
    
    /**
     * Function to add new blog post
     * Demonstrates form validation, state update, and user feedback
     */
    const handleAddPost = () => { 
        // Input validation - check if required fields are not empty
        if (title.trim() && content.trim() && category) { 
            // Update posts array using functional state update
            // Spread operator creates new array (immutability principle)
            setPosts(currentPosts => [
                ...currentPosts, 
                { 
                    id: Date.now(), // Simple ID generation using timestamp
                    title: title.trim(), // Remove whitespace from title
                    content: content.trim(), // Remove whitespace from content
                    category: category // Selected category
                }
            ]); 
            
            // Show success notification to user
            showNotification('Post added successfully!'); 
            
            // Clear form inputs after successful submission
            setTitle(''); 
            setContent('');
            setCategory('');
        } else {
            // Show error notification for missing fields
            showNotification('Please fill in all fields (title, content, and category)!');
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
                    {/* Title Input */}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Post Title</label>
                        <input 
                            id="title"
                            value={title} // Controlled by React state
                            onChange={(e) => setTitle(e.target.value)} // Update state on change
                            onKeyPress={handleKeyPress} // Handle Enter key
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
                        disabled={!title.trim() || !content.trim() || !category} // Disable if any field is empty
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
                    {/* Conditional Rendering - Show posts or empty message */}
                    {posts.length > 0 ? (
                        /* Cards for displaying posts with full content */
                        <div className="row">
                            {/* Map through posts array to render each post */}
                            {posts.map(post => (
                                <div key={post.id} className="col-md-6 mb-3">
                                    <div className="card h-100">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <h5 className="card-title mb-0">{post.title}</h5>
                                            <span className="badge bg-primary">{post.category}</span>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">{post.content}</p>
                                        </div>
                                        <div className="card-footer">
                                            <small className="text-muted">ID: {post.id}</small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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