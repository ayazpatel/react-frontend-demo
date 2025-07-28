// Import React library for creating components
import React from 'react';

/**
 * HomePage Component
 * Landing page that introduces the React State Management showcase application
 * 
 * Key Concepts Demonstrated:
 * 1. Functional component with JSX
 * 2. Bootstrap utility classes for styling
 * 3. Semantic HTML structure
 * 4. Typography and spacing utilities
 * 5. Static content presentation
 * 
 * Design Purpose:
 * - Welcome users to the application
 * - Explain the educational purpose
 * - Provide navigation guidance
 * - Set context for learning objectives
 * 
 * Educational Value:
 * - Introduces three state management approaches
 * - Explains when to use each method
 * - Provides context for comparison learning
 */
const HomePage = () => {
    // Get current date and time for dynamic content
    const currentDateTime = new Date().toLocaleString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata',
        timeZoneName: 'short'
    });
    
    // JSX Return - Homepage Structure
    return (
        <div className="container-fluid">
            {/* Hero Section */}
            <div className="text-center p-5 bg-light rounded-3 mb-4">
                <h1 className="display-4 fw-bold text-primary">
                    React State Management Showcase
                </h1>
                <p className="lead mb-4">
                    Explore different state management techniques through practical examples
                </p>
                <p className="text-muted fst-italic">
                    Current time: {currentDateTime} | Location: Dabhoi, Gujarat, India
                </p>
            </div>
            
            {/* Introduction Section */}
            <div className="row g-4 mb-4">
                <div className="col-md-8 mx-auto">
                    <div className="card">
                        <div className="card-body text-center">
                            <h3 className="card-title">Learning Objectives</h3>
                            <p className="card-text">
                                This application demonstrates three fundamental approaches to state management in React:
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* State Management Methods Cards */}
            <div className="row g-4 mb-4">
                {/* useState Card */}
                <div className="col-md-4">
                    <div className="card h-100 border-primary">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">useState</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                <strong>Best for:</strong> Simple, independent state variables
                            </p>
                            <ul className="list-unstyled">
                                <li>✓ Form inputs</li>
                                <li>✓ Toggle states</li>
                                <li>✓ Simple counters</li>
                                <li>✓ Basic data lists</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* useReducer Card */}
                <div className="col-md-4">
                    <div className="card h-100 border-success">
                        <div className="card-header bg-success text-white">
                            <h5 className="mb-0">useReducer</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                <strong>Best for:</strong> Complex state logic with multiple related updates
                            </p>
                            <ul className="list-unstyled">
                                <li>✓ State machines</li>
                                <li>✓ Complex forms</li>
                                <li>✓ Multiple state transitions</li>
                                <li>✓ Predictable updates</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* Redux Card */}
                <div className="col-md-4">
                    <div className="card h-100 border-warning">
                        <div className="card-header bg-warning text-dark">
                            <h5 className="mb-0">Redux Toolkit</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                <strong>Best for:</strong> Global state shared across components
                            </p>
                            <ul className="list-unstyled">
                                <li>✓ Cross-component data</li>
                                <li>✓ Complex applications</li>
                                <li>✓ Time-travel debugging</li>
                                <li>✓ State persistence</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Examples Section */}
            <div className="row g-4">
                <div className="col-md-8 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Practical Examples</h4>
                            <div className="row text-center">
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <i className="bi bi-journal-text display-6 text-primary"></i>
                                        <h6 className="mt-2">Blog System</h6>
                                        <small className="text-muted">CRUD operations for posts</small>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <i className="bi bi-receipt display-6 text-success"></i>
                                        <h6 className="mt-2">Billing System</h6>
                                        <small className="text-muted">Invoice with calculations</small>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <i className="bi bi-cart display-6 text-warning"></i>
                                        <h6 className="mt-2">Shopping Cart</h6>
                                        <small className="text-muted">E-commerce functionality</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Getting Started Section */}
            <div className="row g-4 mt-4">
                <div className="col-md-10 mx-auto">
                    <div className="alert alert-info">
                        <h5 className="alert-heading">🚀 Getting Started</h5>
                        <p className="mb-2">
                            Use the navigation bar above to explore different examples. Each section shows the same 
                            functionality implemented with different state management approaches.
                        </p>
                        <hr />
                        <p className="mb-0">
                            <strong>Tip:</strong> Try switching between tabs within each section to compare 
                            how the same features are implemented with different state management patterns.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export component as default export for use in main App routing
export default HomePage;