// Import React library and useState hook for state management
import React, { useState } from 'react';
// Import custom notification hook from context
import { useNotification } from '../../context/NotificationContext';

/**
 * RegistrationPage Component
 * Demonstrates form handling with local state management and context integration
 * 
 * Key React Concepts Demonstrated:
 * 1. useState Hook - Managing form state
 * 2. Custom Hook - useNotification from Context API
 * 3. Controlled Components - Form inputs controlled by React state
 * 4. Event Handling - onChange and onSubmit events
 * 5. Object State Updates - Using spread operator for immutable updates
 * 6. Form Validation - HTML5 validation with required attributes
 * 7. Context Consumer - Using context without prop drilling
 * 
 * State Management Pattern: useState (Local State)
 * - Simple form state with two fields
 * - Direct state updates using setState
 * - Form reset after submission
 * 
 * Educational Value:
 * - Shows how to handle form data in React
 * - Demonstrates context API usage for notifications
 * - Example of controlled vs uncontrolled components
 * - Form validation and user feedback patterns
 */
const RegistrationPage = () => {
  // State Declaration: Local component state for user form data
  // Using object state to group related form fields together
  // Initial state: empty form with name and email fields
  const [user, setUser] = useState({ 
    name: '',    // User's full name
    email: ''    // User's email address
  });
  
  // Context Hook: Get notification function from NotificationContext
  // This demonstrates consuming context without prop drilling
  // showNotification is a function that displays toast notifications
  const showNotification = useNotification();
  
  /**
   * Handle Input Changes
   * Generic change handler for all form inputs
   * 
   * Key Concepts:
   * - Event object destructuring to get target properties
   * - Dynamic property names using computed property syntax
   * - Immutable state updates using spread operator
   * - Controlled component pattern
   * 
   * @param {Event} e - The change event from input element
   */
  const handleChange = (e) => {
    // Destructure name and value from the input element
    const { name, value } = e.target;
    
    // Update state immutably using spread operator
    // [name] creates a dynamic property key based on input's name attribute
    setUser(prevUser => ({
      ...prevUser,     // Spread existing user data
      [name]: value    // Update only the changed field
    }));
  };
  
  /**
   * Handle Form Submission
   * Processes the registration form when submitted
   * 
   * Key Concepts:
   * - Preventing default form submission behavior
   * - Context API usage for cross-component communication
   * - Form state reset after successful submission
   * - User feedback through notifications
   * 
   * @param {Event} e - The submit event from form element
   */
  const handleSubmit = (e) => {
    // Prevent default form submission (page reload)
    e.preventDefault();
    
    // Show success notification using context
    // Template literal for dynamic message content
    showNotification(`User Registered: ${user.name}`, 'success');
    
    // Reset form state to initial empty values
    // This clears the form after successful submission
    setUser({ 
      name: '', 
      email: '' 
    });
  };
  
  // JSX Return: Registration form UI
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {/* Form Header */}
        <h2 className="card-title mb-4">Registration Form</h2>
        
        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="row g-3">
          {/* Name Input Field */}
          <div className="col-md">
            <input 
              name="name"                    // Name attribute for dynamic state updates
              value={user.name}              // Controlled component - value from state
              placeholder="Full Name"        // User guidance
              onChange={handleChange}        // Change handler for state updates
              required                       // HTML5 validation
              className="form-control"       // Bootstrap styling
              type="text"                    // Input type specification
              autoComplete="name"            // Browser autocomplete hint
              maxLength="50"                 // Input length limitation
            />
          </div>
          
          {/* Email Input Field */}
          <div className="col-md">
            <input 
              name="email"                   // Name attribute for dynamic state updates
              value={user.email}             // Controlled component - value from state
              type="email"                   // HTML5 email validation
              placeholder="Email Address"    // User guidance
              onChange={handleChange}        // Change handler for state updates
              required                       // HTML5 validation
              className="form-control"       // Bootstrap styling
              autoComplete="email"           // Browser autocomplete hint
              maxLength="100"                // Input length limitation
            />
          </div>
          
          {/* Submit Button */}
          <div className="col-md-auto">
            <button 
              type="submit"                  // Form submission trigger
              className="btn btn-primary"    // Bootstrap primary button styling
              disabled={!user.name.trim() || !user.email.trim()} // Disable if fields empty
            >
              Register User
            </button>
          </div>
        </form>
        
        {/* Form Help Text */}
        <div className="mt-3">
          <small className="text-muted">
            <strong>Note:</strong> This form demonstrates basic React form handling with 
            useState for local state management and Context API for notifications.
          </small>
        </div>
      </div>
    </div>
  );
};

// Export component as default export for routing
export default RegistrationPage;