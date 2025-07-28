// Import React library and useReducer hook for state management
import React, { useReducer } from 'react';
// Import custom notification context hook for showing user feedback
import { useNotification } from '../../context/NotificationContext';

// Static product data - In real application, this would come from API/database
const products = [
  { id: 1, name: 'Laptop', price: 1200 }, 
  { id: 2, name: 'Mouse', price: 25 }
];

/**
 * Reducer function for managing cart state
 * useReducer is preferred over useState when:
 * 1. State logic is complex
 * 2. Next state depends on previous state
 * 3. Multiple state transitions need to be handled
 * 
 * @param {Array} state - Current cart state (array of cart items)
 * @param {Object} action - Action object with type and payload
 * @returns {Array} - New cart state
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    // ADD action: Adds new item to cart or increments quantity if item exists
    case 'ADD': {
      // Check if item already exists in cart using find method
      const existingItem = state.find(item => item.id === action.payload.id);
      
      // If item exists, increment its quantity by 1
      if (existingItem) {
        return state.map(item => 
          item.id === action.payload.id 
            ? { ...item, qty: item.qty + 1 }  // Spread operator for immutability
            : item
        );
      }
      
      // If item doesn't exist, add new item with quantity 1
      return [...state, { ...action.payload, qty: 1 }];
    }
    
    // UPDATE_QTY action: Updates quantity of existing item or removes if quantity becomes 0
    case 'UPDATE_QTY': {
      return state
        .map(item => 
          item.id === action.id 
            ? { ...item, qty: item.qty + action.amount }  // Update quantity
            : item
        )
        .filter(item => item.qty > 0);  // Remove items with quantity 0 or less
    }
    
    // Default case: Return unchanged state for unknown actions
    default: 
      return state;
  }
};
/**
 * CartUseReducer Component
 * Demonstrates shopping cart functionality using useReducer hook
 * 
 * Key Concepts Demonstrated:
 * 1. useReducer for complex state management
 * 2. Immutable state updates
 * 3. Action-based state transitions
 * 4. Context API integration for notifications
 * 5. Component composition and reusability
 */
const CartUseReducer = () => {
  // useReducer Hook Setup
  // Syntax: const [state, dispatch] = useReducer(reducer, initialState)
  // state: Current cart items array
  // dispatch: Function to trigger state changes by sending actions
  const [cart, dispatch] = useReducer(cartReducer, []);
  
  // Get notification function from context
  // This demonstrates Context API usage for cross-component communication
  const showNotification = useNotification();
  
  /**
   * Function to add product to cart
   * Dispatches ADD action and shows user notification
   * 
   * @param {Object} product - Product object to add to cart
   */
  const addToCart = (product) => { 
    // Dispatch action to reducer with type and payload
    dispatch({ type: 'ADD', payload: product }); 
    // Show user feedback using notification context
    showNotification(`${product.name} added to cart!`); 
  };
  
  /**
   * Function to update item quantity in cart
   * Dispatches UPDATE_QTY action with item id and amount change
   * 
   * @param {number} id - Product ID to update
   * @param {number} amount - Amount to change quantity by (+1 or -1)
   */
  const updateQuantity = (id, amount) => { 
    dispatch({ type: 'UPDATE_QTY', id, amount }); 
  };
  
  // Calculate total price using reduce method
  // reduce() is a functional programming concept for aggregating array values
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
            
            {/* Cart Items List */}
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
export default CartUseReducer;