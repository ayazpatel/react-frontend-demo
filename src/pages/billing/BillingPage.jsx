// Import React library for creating components
import React from 'react';
// Import React Router components for nested routing and navigation
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
// Import billing components demonstrating different state management approaches
import BillingUseState from './BillingUseState';
import BillingUseReducer from './BillingUseReducer';
import BillingRedux from './BillingRedux';

/**
 * ProjectMethodLayout Component
 * Reusable layout component for displaying different state management methods
 * 
 * Key Concepts Demonstrated:
 * 1. Component composition and reusability
 * 2. Props pattern for customizable components
 * 3. useLocation hook for current route detection
 * 4. Dynamic navigation with active state management
 * 5. Bootstrap tabs for method switching
 * 
 * Design Pattern:
 * - Layout component wraps different implementation methods
 * - Provides consistent UI across all method demonstrations
 * - Handles navigation state and active tab highlighting
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Main title for the section
 * @param {string} props.subtitle - Descriptive subtitle
 * @param {Object} props.methods - Object mapping paths to method names
 * @param {ReactNode} props.children - Child components to render (Routes)
 */
const ProjectMethodLayout = ({ title, subtitle, methods, children }) => {
    // useLocation hook - Get current location information from React Router
    // This hook provides access to location object with pathname, search, hash, etc.
    const location = useLocation();
    
    // Extract current path segment to determine active tab
    // pathname example: "/billing/useState" -> currentPath: "useState"
    const currentPath = location.pathname.split('/').pop();
    
    // JSX Return - Layout Structure
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                {/* Section Header */}
                <h2 className="card-title">{title}</h2>
                <p className="card-subtitle mb-3 text-muted">{subtitle}</p>
                
                {/* Navigation Tabs */}
                <ul className="nav nav-tabs mb-3">
                    {/* Dynamic tab generation from methods object */}
                    {Object.entries(methods).map(([path, name]) => (
                        <li className="nav-item" key={path}>
                            {/* NavLink with conditional active class */}
                            <NavLink 
                                to={path} 
                                className={`nav-link ${currentPath === path ? 'active' : ''}`}
                            >
                                {name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                
                {/* Content Area - Renders child components (Routes) */}
                {children}
            </div>
        </div>
    );
};

/**
 * BillingPage Component
 * Main routing component for billing system demonstrations
 * 
 * Key Concepts Demonstrated:
 * 1. Nested routing with React Router
 * 2. Component reusability with ProjectMethodLayout
 * 3. Route configuration for different implementations
 * 4. Consistent user experience across state management methods
 * 
 * Educational Purpose:
 * - Allows users to compare different state management approaches
 * - Same business logic (billing) implemented with different patterns
 * - Demonstrates when to use useState vs useReducer vs Redux
 * 
 * Routing Structure:
 * /billing/useState    -> BillingUseState component
 * /billing/useReducer  -> BillingUseReducer component  
 * /billing/redux       -> BillingRedux component
 */
const BillingPage = () => {
    // Methods configuration - maps route paths to display names
    // This object drives both navigation tabs and route definitions
    const methods = { 
        useState: 'useState',       // Simple state management
        useReducer: 'useReducer',   // Complex state logic
        redux: 'Redux'              // Global state management
    };
    
    // JSX Return - Page Structure
    return (
        // Use ProjectMethodLayout for consistent UI
        <ProjectMethodLayout 
            title="Billing System" 
            subtitle="Invoice management with item addition, discount application, and total calculations."
            methods={methods}
        >
            {/* Nested Routes - Each route renders different state management implementation */}
            <Routes>
                {/* useState Route - Simple state management approach */}
                <Route 
                    path="useState" 
                    element={<BillingUseState />} 
                />
                
                {/* useReducer Route - Complex state logic approach */}
                <Route 
                    path="useReducer" 
                    element={<BillingUseReducer />} 
                />
                
                {/* Redux Route - Global state management approach */}
                <Route 
                    path="redux" 
                    element={<BillingRedux />} 
                />
            </Routes>
        </ProjectMethodLayout>
    );
};

// Export component as default export for use in main App routing
export default BillingPage;