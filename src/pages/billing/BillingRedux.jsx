// Import React library and useState hook for local form state
import React, { useState } from 'react';
// Import Redux hooks for connecting component to global state
import { useSelector, useDispatch } from 'react-redux';
// Import action creators from billing slice for dispatching actions
import { addItem, removeItem, clearItems, applyDiscount } from '../../store/billingSlice';
// Import custom notification context hook for showing user feedback
import { useNotification } from '../../context/NotificationContext';

/**
 * BillingRedux Component
 * Demonstrates billing/invoice management using Redux Toolkit for global state management
 * 
 * Key Concepts Demonstrated:
 * 1. Redux global state management with useSelector
 * 2. Dispatching actions with useDispatch
 * 3. Action creators from Redux Toolkit slices
 * 4. Combining Redux (global state) with useState (local form state)
 * 5. Complex business logic handled by Redux reducers
 * 
 * Redux Benefits for Billing:
 * - Persist billing data across component unmounts
 * - Share billing state with other components (e.g., summary view)
 * - Centralized business logic for complex calculations
 * - Time-travel debugging for financial operations
 * - Audit trail of all billing actions
 */
const BillingRedux = () => {
  // useSelector Hook - Extract billing items from Redux store
  // This subscribes component to Redux store updates
  const items = useSelector((state) => state.billing.items);
  
  // useDispatch Hook - Get dispatch function for sending actions
  const reduxDispatch = useDispatch();
  
  // useState for form inputs - local component state
  // Form data doesn't need to be global, so useState is appropriate
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  
  // Get notification function from context
  const showNotification = useNotification();
  
  /**
   * Function to add new billing item
   * Dispatches Redux action and shows user notification
   */
  const handleAddItem = () => { 
    // Input validation
    const itemName = name.trim();
    const itemPrice = parseFloat(price);
    
    if (itemName && itemPrice > 0) { 
      // Dispatch 'addItem' action to Redux store
      reduxDispatch(addItem({ 
        id: Date.now(),
        name: itemName, 
        price: itemPrice,
        addedAt: new Date().toISOString(),
        category: 'general'
      })); 
      
      // Show success notification
      showNotification(`${itemName} added to bill - $${itemPrice.toFixed(2)}`); 
      
      // Clear form inputs
      setName(''); 
      setPrice(''); 
    } else {
      // Show validation error
      if (!itemName) {
        showNotification('Please enter an item name!');
      } else if (itemPrice <= 0) {
        showNotification('Please enter a valid price greater than 0!');
      }
    }
  };
  
  /**
   * Function to remove billing item
   * Dispatches removeItem action to Redux store
   */
  const handleRemoveItem = (itemId) => {
    reduxDispatch(removeItem({ id: itemId }));
    showNotification('Item removed from bill');
  };
  
  /**
   * Function to clear all billing items
   * Dispatches clearItems action to Redux store
   */
  const handleClearAllItems = () => {
    if (items.length > 0) {
      reduxDispatch(clearItems());
      showNotification('All items cleared from bill');
    }
  };
  
  /**
   * Function to apply discount to item
   * Dispatches applyDiscount action with business logic handled by Redux
   */
  const handleApplyDiscount = (itemId, discountPercent) => {
    reduxDispatch(applyDiscount({ 
      id: itemId, 
      discount: discountPercent / 100 
    }));
    showNotification(`${discountPercent}% discount applied`);
  };
  
  /**
   * Handle Enter key press for form submission
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };
  
  // Calculate billing totals - data comes from Redux store
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.08; // 8% tax
  const grandTotal = subtotal + tax;
  
  // JSX Return - Component Rendering
  return (
    <div className="container-fluid">
      {/* Form Section - Add New Item */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Add Billing Item (Redux)</h4>
          {/* Clear All Button */}
          {items.length > 0 && (
            <button 
              onClick={handleClearAllItems}
              className="btn btn-outline-danger btn-sm"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="card-body">
          {/* Bootstrap Row for Form Layout */}
          <div className="row g-3 mb-3">
            {/* Item Name Input */}
            <div className="col-sm">
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Item name..." 
                className="form-control"
                type="text"
              />
            </div>
            
            {/* Price Input */}
            <div className="col-sm">
              <input 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onKeyPress={handleKeyPress}
                type="number" 
                step="0.01"
                min="0"
                placeholder="Price ($)" 
                className="form-control"
              />
            </div>
            
            {/* Add Button */}
            <div className="col-sm-auto">
              <button 
                onClick={handleAddItem} 
                className="btn btn-primary"
                disabled={!name.trim() || !price || parseFloat(price) <= 0}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bill Display Section */}
      <div className="card bg-light">
        <div className="card-body">
          <h5 className="card-title">
            Current Bill ({items.length} items)
          </h5>
          <small className="text-muted">
            Data managed by Redux store - persists across component re-mounts
          </small>
          
          {/* Items List - Data comes from Redux store */}
          <ul className="list-group list-group-flush mt-3">
            {/* Conditional Rendering */}
            {items.length > 0 ? (
              items.map(item => (
                <li 
                  key={item.id} 
                  className="list-group-item bg-transparent"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {/* Item Name */}
                      <span className="fw-medium">{item.name}</span>
                      
                      {/* Item Metadata */}
                      <div className="small text-muted">
                        Added: {new Date(item.addedAt).toLocaleTimeString()}
                        {item.originalPrice && (
                          <span className="ms-2 text-success">
                            (Discounted from ${item.originalPrice.toFixed(2)})
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center">
                      {/* Item Price */}
                      <span className="me-2 fw-bold">
                        ${item.price.toFixed(2)}
                      </span>
                      
                      {/* Action Buttons */}
                      <div className="btn-group btn-group-sm">
                        {/* Apply 10% Discount */}
                        <button
                          onClick={() => handleApplyDiscount(item.id, 10)}
                          className="btn btn-outline-success"
                          title="Apply 10% discount"
                          disabled={!!item.originalPrice}
                        >
                          -10%
                        </button>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="btn btn-outline-danger"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              /* Empty State */
              <li className="list-group-item bg-transparent text-center text-muted py-4">
                <p>No items in bill yet. Add items above to get started.</p>
                <small>This data is managed by Redux store</small>
              </li>
            )}
          </ul>
          
          {/* Bill Summary */}
          {items.length > 0 && (
            <>
              <hr />
              <div className="row">
                <div className="col-md-6 offset-md-6">
                  {/* Subtotal */}
                  <div className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {/* Tax */}
                  <div className="d-flex justify-content-between text-muted">
                    <span>Tax (8%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <hr />
                  
                  {/* Grand Total */}
                  <div className="d-flex justify-content-between fs-5 fw-bold">
                    <span>Total:</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Export component as default export for use in other parts of the application
export default BillingRedux;