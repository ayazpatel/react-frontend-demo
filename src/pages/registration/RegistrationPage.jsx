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
  // State Declaration: Local component state for comprehensive user form data
  // Using object state to group related form fields together
  // Initial state: empty form with all registration fields
  const [user, setUser] = useState({ 
    name: '',           // User's full name
    email: '',          // User's email address
    phone: '',          // User's phone number
    gender: '',         // User's gender
    dob: '',            // User's date of birth
    address: '',        // User's address
    city: '',           // User's city
    state: '',          // User's state
    zipCode: '',        // User's zip code
    hobbies: [],        // User's hobbies (array for multiple selection)
    occupation: '',     // User's occupation
    education: '',      // User's education level
    newsletter: false   // Newsletter subscription preference
  });
  
  // Available options for dropdowns
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const educationOptions = ['High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Other'];
  const hobbyOptions = ['Reading', 'Sports', 'Music', 'Travel', 'Cooking', 'Gaming', 'Photography', 'Art', 'Technology', 'Fitness'];
  
  // Context Hook: Get notification function from NotificationContext
  // This demonstrates consuming context without prop drilling
  // showNotification is a function that displays toast notifications
  const showNotification = useNotification();
  
  /**
   * Handle Input Changes
   * Generic change handler for all form inputs including checkboxes and multi-select
   * 
   * Key Concepts:
   * - Event object destructuring to get target properties
   * - Dynamic property names using computed property syntax
   * - Immutable state updates using spread operator
   * - Controlled component pattern
   * - Handling different input types (text, select, checkbox, etc.)
   * 
   * @param {Event} e - The change event from input element
   */
  const handleChange = (e) => {
    // Destructure name, value, type, and checked from the input element
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'hobbies') {
        // Handle hobbies array - add or remove hobby based on checkbox state
        setUser(prevUser => ({
          ...prevUser,
          hobbies: checked 
            ? [...prevUser.hobbies, value]  // Add hobby if checked
            : prevUser.hobbies.filter(hobby => hobby !== value)  // Remove if unchecked
        }));
      } else {
        // Handle other checkboxes (like newsletter)
        setUser(prevUser => ({
          ...prevUser,
          [name]: checked
        }));
      }
    } else {
      // Handle all other input types (text, email, select, etc.)
      setUser(prevUser => ({
        ...prevUser,     // Spread existing user data
        [name]: value    // Update only the changed field
      }));
    }
  };
  
  /**
   * Handle Form Submission
   * Processes the comprehensive registration form when submitted
   * 
   * Key Concepts:
   * - Preventing default form submission behavior
   * - Context API usage for cross-component communication
   * - Form state reset after successful submission
   * - User feedback through notifications
   * - Basic form validation
   * 
   * @param {Event} e - The submit event from form element
   */
  const handleSubmit = (e) => {
    // Prevent default form submission (page reload)
    e.preventDefault();
    
    // Basic validation
    if (!user.name.trim() || !user.email.trim() || !user.phone.trim()) {
      showNotification('Please fill in all required fields!', 'error');
      return;
    }
    
    // Show success notification using context
    // Template literal for dynamic message content
    showNotification(`User Registered Successfully: ${user.name}`, 'success');
    
    // Log the complete user data (in real app, this would be sent to server)
    console.log('Registration Data:', user);
    
    // Reset form state to initial empty values
    // This clears the form after successful submission
    setUser({ 
      name: '',
      email: '',
      phone: '',
      gender: '',
      dob: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      hobbies: [],
      occupation: '',
      education: '',
      newsletter: false
    });
  };
  
  // JSX Return: Comprehensive registration form UI
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {/* Form Header */}
        <h2 className="card-title mb-4">User Registration Form</h2>
        <p className="text-muted mb-4">Please fill in all the required information to create your account.</p>
        
        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="row g-3">
          {/* Personal Information Section */}
          <div className="col-12">
            <h5 className="text-primary border-bottom pb-2 mb-3">Personal Information</h5>
          </div>
          
          {/* Full Name */}
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Full Name *</label>
            <input 
              id="name"
              name="name"
              value={user.name}
              placeholder="Enter your full name"
              onChange={handleChange}
              required
              className="form-control"
              type="text"
              autoComplete="name"
              maxLength="50"
            />
          </div>
          
          {/* Email */}
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email Address *</label>
            <input 
              id="email"
              name="email"
              value={user.email}
              type="email"
              placeholder="Enter your email address"
              onChange={handleChange}
              required
              className="form-control"
              autoComplete="email"
              maxLength="100"
            />
          </div>
          
          {/* Phone */}
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">Phone Number *</label>
            <input 
              id="phone"
              name="phone"
              value={user.phone}
              type="tel"
              placeholder="Enter your phone number"
              onChange={handleChange}
              required
              className="form-control"
              autoComplete="tel"
              maxLength="15"
            />
          </div>
          
          {/* Gender */}
          <div className="col-md-6">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select 
              id="gender"
              name="gender"
              value={user.gender}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select gender...</option>
              {genderOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          {/* Date of Birth */}
          <div className="col-md-6">
            <label htmlFor="dob" className="form-label">Date of Birth</label>
            <input 
              id="dob"
              name="dob"
              value={user.dob}
              type="date"
              onChange={handleChange}
              className="form-control"
              max={new Date().toISOString().split('T')[0]} // Prevent future dates
            />
          </div>
          
          {/* Occupation */}
          <div className="col-md-6">
            <label htmlFor="occupation" className="form-label">Occupation</label>
            <input 
              id="occupation"
              name="occupation"
              value={user.occupation}
              placeholder="Enter your occupation"
              onChange={handleChange}
              className="form-control"
              type="text"
              maxLength="50"
            />
          </div>
          
          {/* Address Information Section */}
          <div className="col-12 mt-4">
            <h5 className="text-primary border-bottom pb-2 mb-3">Address Information</h5>
          </div>
          
          {/* Address */}
          <div className="col-12">
            <label htmlFor="address" className="form-label">Street Address</label>
            <textarea 
              id="address"
              name="address"
              value={user.address}
              placeholder="Enter your street address"
              onChange={handleChange}
              className="form-control"
              rows="2"
              maxLength="200"
            />
          </div>
          
          {/* City */}
          <div className="col-md-4">
            <label htmlFor="city" className="form-label">City</label>
            <input 
              id="city"
              name="city"
              value={user.city}
              placeholder="Enter your city"
              onChange={handleChange}
              className="form-control"
              type="text"
              maxLength="50"
            />
          </div>
          
          {/* State */}
          <div className="col-md-4">
            <label htmlFor="state" className="form-label">State</label>
            <input 
              id="state"
              name="state"
              value={user.state}
              placeholder="Enter your state"
              onChange={handleChange}
              className="form-control"
              type="text"
              maxLength="50"
            />
          </div>
          
          {/* Zip Code */}
          <div className="col-md-4">
            <label htmlFor="zipCode" className="form-label">Zip Code</label>
            <input 
              id="zipCode"
              name="zipCode"
              value={user.zipCode}
              placeholder="Enter zip code"
              onChange={handleChange}
              className="form-control"
              type="text"
              maxLength="10"
            />
          </div>
          
          {/* Additional Information Section */}
          <div className="col-12 mt-4">
            <h5 className="text-primary border-bottom pb-2 mb-3">Additional Information</h5>
          </div>
          
          {/* Education */}
          <div className="col-md-6">
            <label htmlFor="education" className="form-label">Education Level</label>
            <select 
              id="education"
              name="education"
              value={user.education}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select education level...</option>
              {educationOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          {/* Hobbies */}
          <div className="col-12">
            <label className="form-label">Hobbies & Interests</label>
            <div className="row">
              {hobbyOptions.map(hobby => (
                <div key={hobby} className="col-md-3 col-6 mb-2">
                  <div className="form-check">
                    <input 
                      className="form-check-input"
                      type="checkbox"
                      id={`hobby-${hobby}`}
                      name="hobbies"
                      value={hobby}
                      checked={user.hobbies.includes(hobby)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`hobby-${hobby}`}>
                      {hobby}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Newsletter Subscription */}
          <div className="col-12">
            <div className="form-check">
              <input 
                className="form-check-input"
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={user.newsletter}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="newsletter">
                Subscribe to our newsletter for updates and promotions
              </label>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="col-12 mt-4">
            <button 
              type="submit"
              className="btn btn-primary btn-lg w-100"
              disabled={!user.name.trim() || !user.email.trim() || !user.phone.trim()}
            >
              Complete Registration
            </button>
          </div>
        </form>
        
        {/* Form Help Text */}
        <div className="mt-4">
          <small className="text-muted">
            <strong>Note:</strong> This comprehensive registration form demonstrates advanced React form handling 
            with useState for complex state management, multiple input types, and Context API for notifications.
            Fields marked with * are required.
          </small>
        </div>
      </div>
    </div>
  );
};

// Export component as default export for routing
export default RegistrationPage;