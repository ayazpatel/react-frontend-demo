// Import React library for creating components
import React from 'react';
// Import React Router components for client-side routing
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
// Import notification context provider for global notification system
import { NotificationProvider } from './context/NotificationContext';

// Import all page components for different sections of the application
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/registration/RegistrationPage';
import BlogPage from './pages/blog/BlogPage';
import BillingPage from './pages/billing/BillingPage';
import CartPage from './pages/cart/CartPage';

/**
 * Main App Component - Root component of the application
 * 
 * Key Concepts Demonstrated:
 * 1. React Router - Client-side routing for single-page application
 * 2. Context Provider Pattern - Wrapping app with global state providers
 * 3. Component composition - Building app from smaller, reusable components
 * 4. Navigation structure - Creating consistent navigation across pages
 * 5. Bootstrap integration - Using Bootstrap classes for responsive design
 * 
 * Application Architecture:
 * - Provider pattern for global state (notifications)
 * - Route-based navigation for different state management examples
 * - Consistent layout with navigation bar
 * - Modular page components for different features
 */
function App() {
  return (
    // NotificationProvider wraps entire app to provide notification functionality
    // This allows any component to show notifications using useNotification hook
    <NotificationProvider>
      {/* BrowserRouter enables client-side routing using HTML5 history API */}
      <BrowserRouter>
        {/* Navigation Bar - Consistent across all pages */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            {/* Brand/Logo - NavLink to home page */}
            <NavLink className="navbar-brand" to="/">
              React State Showcase
            </NavLink>
            
            {/* Navigation Links */}
            <div className="navbar-nav">
              {/* Registration Page - Form handling example */}
              <NavLink className="nav-link" to="/registration">
                Registration
              </NavLink>
              
              {/* Blog Page - Defaults to useState example */}
              <NavLink className="nav-link" to="/blog/useState">
                Blog
              </NavLink>
              
              {/* Billing Page - Defaults to useState example */}
              <NavLink className="nav-link" to="/billing/useState">
                Billing
              </NavLink>
              
              {/* Cart Page - Defaults to useState example */}
              <NavLink className="nav-link" to="/cart/useState">
                Shopping Cart
              </NavLink>
            </div>
          </div>
        </nav>
        
        {/* Main Content Area */}
        <main className="container my-4">
          {/* Routes Configuration - Defines which component renders for each URL */}
          <Routes>
            {/* Home Route - Wildcard catches root and undefined paths */}
            <Route path="/*" element={<HomePage />} />
            
            {/* Registration Route - Form handling demonstration */}
            <Route path="/registration" element={<RegistrationPage />} />
            
            {/* Blog Routes - Nested routing handled within BlogPage */}
            <Route path="/blog/*" element={<BlogPage />} />
            
            {/* Billing Routes - Nested routing handled within BillingPage */}
            <Route path="/billing/*" element={<BillingPage />} />
            
            {/* Cart Routes - Nested routing handled within CartPage */}
            <Route path="/cart/*" element={<CartPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </NotificationProvider>
  );
}

// Export App component as default export
// This component will be mounted to DOM in main.jsx
export default App;