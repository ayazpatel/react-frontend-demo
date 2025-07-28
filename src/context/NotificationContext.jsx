// Import React hooks and context API for creating global state
import React, { createContext, useState, useContext, useEffect } from 'react';

/**
 * Notification Context - Global State Management for User Notifications
 * 
 * React Context API Concepts Demonstrated:
 * 1. createContext - Creates context object for sharing data
 * 2. useContext - Hook to consume context values
 * 3. Provider pattern - Component that provides context value to children
 * 4. Custom hooks - Encapsulating context logic for reusability
 * 5. useEffect - Managing side effects (auto-hide notifications)
 * 
 * Context API Benefits:
 * - Avoid prop drilling (passing props through multiple levels)
 * - Global state accessible from any component
 * - Built into React (no external library needed)
 * - Simpler than Redux for basic global state needs
 */

// Create notification context object
// This will hold the notification state and functions
// Initially undefined - will be provided by NotificationProvider
const NotificationContext = createContext();

/**
 * Custom Hook for Using Notification Context
 * 
 * This encapsulates the useContext call and provides better error handling
 * Usage: const showNotification = useNotification();
 * 
 * @returns {Function} showNotification function to display notifications
 */
export const useNotification = () => {
  // useContext hook connects component to NotificationContext
  // Returns the value provided by NotificationProvider
  const context = useContext(NotificationContext);
  
  // Error handling: ensure hook is used within provider
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  
  return context;
};

/**
 * Notification Provider Component
 * 
 * This component provides notification functionality to all child components
 * It manages notification state and rendering logic
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components that can access notifications
 */
export const NotificationProvider = ({ children }) => {
  // Local state for current notification message
  // null means no notification is currently shown
  const [notification, setNotification] = useState(null);

  // useEffect hook for auto-hiding notifications
  // Runs whenever notification state changes
  useEffect(() => {
    // If there's a notification, set timer to hide it
    if (notification) {
      // setTimeout creates timer to clear notification after 3 seconds
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      
      // Cleanup function: clear timer if component unmounts or notification changes
      // This prevents memory leaks and unexpected behavior
      return () => clearTimeout(timer);
    }
  }, [notification]); // Dependency array: effect runs when notification changes

  /**
   * Function to show notification
   * This function will be passed to child components via context
   * 
   * @param {string} message - Message to display in notification
   */
  const showNotification = (message) => {
    setNotification(message);
  };

  return (
    // Provider component makes showNotification function available to all children
    <NotificationContext.Provider value={showNotification}>
      {/* Render all child components */}
      {children}
      
      {/* Conditional Rendering: Show notification if one exists */}
      {notification && (
        <div 
          className="alert alert-success position-fixed bottom-0 end-0 m-3 shadow-lg" 
          style={{ zIndex: 1050 }} 
          role="alert"
        >
          {/* Display the notification message */}
          {notification}
        </div>
      )}
    </NotificationContext.Provider>
  );
};