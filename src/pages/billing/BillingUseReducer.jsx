// Import React library with useReducer and useState hooks
import React, { useReducer, useState } from 'react';
// Import custom notification context hook for showing user feedback
import { useNotification } from '../../context/NotificationContext';

/**
 * Billing Reducer Function
 * Handles state transitions for billing items using reducer pattern
 * 
 * @param {Array} state - Current billing items array
 * @param {Object} action - Action object with type and payload
 * @returns {Array} - New billing items state
 * 
 * Reducer Pattern Benefits:
 * - Centralized state logic
 * - Predictable state updates
 * - Easy to test and debug
 * - Scalable for complex operations
 */
const billingReducer = (state, action) => {
    switch (action.type) {
        // ADD_ITEM action: Adds new billing item to the array
        case 'ADD_ITEM':
            // Return new array with existing items plus new item
            return [...state, action.payload];
        
        // REMOVE_ITEM action: Removes item by ID
        case 'REMOVE_ITEM':
            return state.filter(item => item.id !== action.payload.id);
        
        // UPDATE_ITEM action: Updates existing item
        case 'UPDATE_ITEM':
            return state.map(item => 
                item.id === action.payload.id 
                    ? { ...item, ...action.payload.updates }
                    : item
            );
        
        // CLEAR_ITEMS action: Removes all items
        case 'CLEAR_ITEMS':
            return [];
        
        // APPLY_DISCOUNT action: Applies discount to specific item
        case 'APPLY_DISCOUNT':
            return state.map(item =>
                item.id === action.payload.id
                    ? { 
                        ...item, 
                        originalPrice: item.originalPrice || item.price,
                        price: (item.originalPrice || item.price) * (1 - action.payload.discount)
                      }
                    : item
            );
        
        // Default case: Return unchanged state
        default:
            return state;
    }
};

/**
 * BillingUseReducer Component
 * Demonstrates billing/invoice management using useReducer hook
 * 
 * Key Concepts Demonstrated:
 * 1. useReducer for managing complex billing operations
 * 2. Action-based state updates with detailed payloads
 * 3. Combining useReducer with useState for form inputs
 * 4. Complex business logic handled by reducer
 * 5. Multiple action types for different operations
 * 
 * useReducer Benefits:
 * - Better for complex state logic
 * - Multiple related state updates
 * - Predictable state transitions
 * - Easier testing of business logic
 */
const BillingUseReducer = () => {
    // useReducer Hook Setup
    // items: current state (array of billing items)
    // dispatch: function to trigger state changes via actions
    const [items, dispatch] = useReducer(billingReducer, []);
    
    // useState for form inputs - simple state that doesn't need reducer
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    
    // Get notification function from context
    const showNotification = useNotification();
    
    /**
     * Function to add new billing item
     * Dispatches ADD_ITEM action with validated data
     */
    const addItem = () => { 
        // Input validation
        const itemName = name.trim();
        const itemPrice = parseFloat(price);
        
        if (itemName && itemPrice > 0) { 
            // Dispatch action to reducer
            dispatch({ 
                type: 'ADD_ITEM', 
                payload: { 
                    id: Date.now(),
                    name: itemName, 
                    price: itemPrice,
                    addedAt: new Date().toISOString(),
                    category: 'general' // Additional metadata
                } 
            }); 
            
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
     * Dispatches REMOVE_ITEM action
     */
    const removeItem = (itemId) => {
        dispatch({
            type: 'REMOVE_ITEM',
            payload: { id: itemId }
        });
        showNotification('Item removed from bill');
    };
    
    /**
     * Function to clear all billing items
     * Dispatches CLEAR_ITEMS action
     */
    const clearAllItems = () => {
        if (items.length > 0) {
            dispatch({ type: 'CLEAR_ITEMS' });
            showNotification('All items cleared from bill');
        }
    };
    
    /**
     * Function to apply discount to item
     * Demonstrates complex business logic in reducer
     */
    const applyDiscount = (itemId, discountPercent) => {
        dispatch({
            type: 'APPLY_DISCOUNT',
            payload: { 
                id: itemId, 
                discount: discountPercent / 100 
            }
        });
        showNotification(`${discountPercent}% discount applied`);
    };
    
    /**
     * Handle Enter key press for form submission
     */
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    };
    
    // Calculate billing totals using reduce
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const tax = subtotal * 0.08; // 8% tax
    const grandTotal = subtotal + tax;
    
    // JSX Return - Component Rendering
    return (
        <div className="container-fluid">
            {/* Form Section - Add New Item */}
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Add Billing Item (useReducer)</h4>
                    {/* Clear All Button */}
                    {items.length > 0 && (
                        <button 
                            onClick={clearAllItems}
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
                                onClick={addItem} 
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
                    
                    {/* Items List */}
                    <ul className="list-group list-group-flush">
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
                                                    onClick={() => applyDiscount(item.id, 10)}
                                                    className="btn btn-outline-success"
                                                    title="Apply 10% discount"
                                                    disabled={!!item.originalPrice}
                                                >
                                                    -10%
                                                </button>
                                                
                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeItem(item.id)}
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
                                No items in bill yet. Add items above to get started.
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

// Export component as default export
export default BillingUseReducer;