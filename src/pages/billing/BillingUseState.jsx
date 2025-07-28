// Import React library and useState hook for basic state management
import React, { useState } from 'react';
// Import custom notification context hook for showing user feedback
import { useNotification } from '../../context/NotificationContext';

/**
 * BillingUseState Component
 * Demonstrates billing/invoice management using useState hook
 * 
 * Key Concepts Demonstrated:
 * 1. useState for managing multiple independent state variables
 * 2. Form handling with multiple controlled inputs
 * 3. Number input validation and type conversion
 * 4. Array state updates with spread operator
 * 5. Calculated values (total) derived from state
 * 6. Input validation and error handling
 * 
 * Business Logic:
 * - Add billing items with name and price
 * - Calculate running total automatically
 * - Validate inputs before adding items
 * - Clear form after successful submission
 */
const BillingUseState = () => {
    // useState for billing items array - stores all invoice items
    const [items, setItems] = useState([]);
    
    // useState for form inputs - controlled components
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    
    // Get notification function from context
    const showNotification = useNotification();
    
    /**
     * Function to add new billing item
     * Includes validation for both name and price fields
     */
    const addItem = () => { 
        // Input validation
        const itemName = name.trim();
        const itemPrice = parseFloat(price);
        
        // Check if name is provided and price is valid positive number
        if (itemName && itemPrice > 0) { 
            // Update items array using functional state update
            setItems(currentItems => [
                ...currentItems, 
                { 
                    id: Date.now(), // Simple ID generation
                    name: itemName, 
                    price: itemPrice,
                    addedAt: new Date().toISOString() // Add timestamp
                }
            ]); 
            
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
     * Function to remove item from bill
     * Demonstrates array filtering for item removal
     */
    const removeItem = (itemId) => {
        setItems(currentItems => 
            currentItems.filter(item => item.id !== itemId)
        );
        showNotification('Item removed from bill');
    };
    
    /**
     * Function to clear entire bill
     * Resets items array to empty state
     */
    const clearBill = () => {
        if (items.length > 0) {
            setItems([]);
            showNotification('Bill cleared successfully!');
        }
    };
    
    /**
     * Handle Enter key press for form submission
     * Allows users to add items by pressing Enter
     */
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    };
    
    // Calculated value - total bill amount
    // Uses reduce to sum all item prices
    const total = items.reduce((accumulator, item) => accumulator + item.price, 0);
    
    // Calculate additional billing details
    const subtotal = total;
    const tax = total * 0.08; // 8% tax
    const grandTotal = subtotal + tax;
    
    // JSX Return - Component Rendering
    return (
        <div className="container-fluid">
            {/* Form Section - Add New Item */}
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Add Billing Item (useState)</h4>
                    {/* Clear All Button */}
                    {items.length > 0 && (
                        <button 
                            onClick={clearBill}
                            className="btn btn-outline-danger btn-sm"
                        >
                            Clear Bill
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
                        {/* Conditional Rendering - Show items or empty message */}
                        {items.length > 0 ? (
                            items.map(item => (
                                <li 
                                    key={item.id} 
                                    className="list-group-item bg-transparent d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        {/* Item Name */}
                                        <span className="fw-medium">{item.name}</span>
                                        {/* Item Metadata */}
                                        <div className="small text-muted">
                                            Added: {new Date(item.addedAt).toLocaleTimeString()}
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex align-items-center">
                                        {/* Item Price */}
                                        <span className="me-2">${item.price.toFixed(2)}</span>
                                        
                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="btn btn-outline-danger btn-sm"
                                            title="Remove item"
                                        >
                                            ✕
                                        </button>
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

// Export component as default export for use in other parts of the application
export default BillingUseState;