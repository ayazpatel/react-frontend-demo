// Import React library for creating components
import React from 'react';
// Import Redux hooks for connecting component to global state
import { useSelector, useDispatch } from 'react-redux';
// Import action creators from cart slice for dispatching actions
import { add, updateQty } from '../../store/cartSlice';
// Import custom notification context hook for showing user feedback
import { useNotification } from '../../context/NotificationContext';

// Static product data - In real application, this would come from API/database
const products = [
  { id: 1, name: 'Laptop', price: 1200 }, 
  { id: 2, name: 'Mouse', price: 25 }
];

/**
 * CartRedux Component
 * Demonstrates shopping cart functionality using Redux Toolkit for global state management
 * 
 * Key Concepts Demonstrated:
 * 1. Redux global state management
 * 2. useSelector hook for reading state from Redux store
 * 3. useDispatch hook for dispatching actions to Redux store
 * 4. Action creators from Redux Toolkit slices
 * 5. Separation of concerns (state logic in slice, UI in component)
 * 
 * Redux Benefits:
 * - Centralized state management
 * - Predictable state updates
 * - Time-travel debugging
 * - State persistence across components
 * - DevTools integration
 */
const CartRedux = () => {
  // useSelector Hook - Extract data from Redux store state
  // Syntax: useSelector(selectorFunction)
  // This hook subscribes component to Redux store updates
  // When state changes, component re-renders automatically
  const cart = useSelector((state) => state.cart.items);
  
  // useDispatch Hook - Get dispatch function to send actions to Redux store
  // dispatch is used to trigger state changes via actions
  const reduxDispatch = useDispatch();
  
  // Get notification function from context
  // This demonstrates combining Redux with Context API
  const showNotification = useNotification();
  
  /**
   * Function to add product to cart
   * Dispatches Redux action and shows user notification
   * 
   * @param {Object} product - Product object to add to cart
   */
  const addToCart = (product) => { 
    // Dispatch 'add' action to Redux store
    // The action creator automatically creates proper action object
    reduxDispatch(add(product)); 
    
    // Show user feedback using notification context
    showNotification(`${product.name} added to cart!`); 
  };
  
  /**
   * Function to update item quantity in cart
   * Dispatches Redux action with payload object
   * 
   * @param {number} id - Product ID to update
   * @param {number} amount - Amount to change quantity by (+1 or -1)
   */
  const updateQuantity = (id, amount) => { 
    // Dispatch 'updateQty' action with payload object
    // Redux Toolkit automatically handles immutable updates
    reduxDispatch(updateQty({ id, amount })); 
  };
  
  // Calculate total price using reduce method
  // Data comes from Redux store, not local component state
  const total = cart.reduce((accumulator, item) => accumulator + (item.price * item.qty), 0);
  
  // JSX Return - Component Rendering
  return (
    <div className="row g-4">
      {/* Left Column - Products Display */}
      <div className="col-lg-8">
        <h3>Available Products</h3>
        
        {/* Bootstrap Grid System for Responsive Product Cards */}
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {/* Map through products array to render each product */}
          {products.map(product => (
            <div className="col" key={product.id}>
              {/* Bootstrap Card Component for Product Display */}
              <div className="card h-100 text-center">
                <div className="card-body d-flex flex-column justify-content-between">
                  {/* Product Information */}
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">${product.price}</p>
                  
                  {/* Add to Cart Button with onClick Event Handler */}
                  <button 
                    onClick={() => addToCart(product)} 
                    className="btn btn-primary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Column - Shopping Cart Display */}
      <div className="col-lg-4">
        <div className="card bg-light">
          <div className="card-body">
            <h3 className="card-title">Shopping Cart</h3>
            
            {/* Cart Items List - Data comes from Redux store */}
            <ul className="list-group list-group-flush">
              {/* Conditional Rendering: Show cart items if cart has items */}
              {cart.map(item => (
                <li key={item.id} className="list-group-item bg-transparent">
                  {/* Item Name and Total Price */}
                  <div className="d-flex justify-content-between fw-bold">
                    <span>{item.name}</span>
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                  
                  {/* Item Details and Quantity Controls */}
                  <div className="d-flex justify-content-between align-items-center text-muted small">
                    <span>${item.price} x {item.qty}</span>
                    
                    {/* Quantity Control Buttons */}
                    <div className="btn-group btn-group-sm">
                      {/* Decrease Quantity Button */}
                      <button 
                        onClick={() => updateQuantity(item.id, -1)} 
                        className="btn btn-outline-secondary"
                      >
                        -
                      </button>
                      
                      {/* Increase Quantity Button */}
                      <button 
                        onClick={() => updateQuantity(item.id, 1)} 
                        className="btn btn-outline-secondary"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              
              {/* Conditional Rendering: Show empty cart message if no items */}
              {cart.length === 0 && (
                <p className="text-muted">Your cart is empty.</p>
              )}
            </ul>
            
            {/* Cart Summary Section */}
            <hr />
            <ul className="list-unstyled mb-0">
              {/* Subtotal Calculation */}
              <li className="d-flex justify-content-between">
                <span>Subtotal:</span> 
                <span>${total.toFixed(2)}</span>
              </li>
              
              {/* Tax Calculation (10% of subtotal) */}
              <li className="d-flex justify-content-between">
                <span>Tax (10%):</span> 
                <span>${(total * 0.1).toFixed(2)}</span>
              </li>
              
              {/* Final Total (Subtotal + Tax) */}
              <li className="d-flex justify-content-between fw-bold fs-5 mt-2">
                <span>Total:</span> 
                <span>${(total * 1.1).toFixed(2)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export component as default export for use in other parts of the application
// This follows ES6 module system for component reusability
export default CartRedux;