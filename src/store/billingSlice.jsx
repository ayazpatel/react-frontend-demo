// Import createSlice from Redux Toolkit for creating Redux slice
import { createSlice } from '@reduxjs/toolkit';

/**
 * Billing Slice - Redux Toolkit Slice for Billing/Invoice State Management
 * 
 * Redux Slice Concepts Demonstrated:
 * 1. createSlice - Combines actions and reducers for billing operations
 * 2. Immer integration - Simplifies immutable updates for complex billing logic
 * 3. Auto-generated action creators for billing operations
 * 4. Business logic encapsulation within reducers
 * 5. Financial calculations and data transformations
 * 
 * Billing-Specific Features:
 * - Item management (add, remove, update)
 * - Discount application with original price tracking
 * - Complex business logic for financial operations
 * - Audit trail capabilities for billing changes
 */
const billingSlice = createSlice({
  // Slice name - used to identify this slice in the Redux store
  // Creates action types like 'billing/addItem', 'billing/removeItem'
  name: 'billing',
  
  // Initial state for billing slice
  // Structure: { items: [] } where items is array of billing item objects
  initialState: { 
    items: [],
    // Additional billing metadata could be added here:
    // invoiceNumber: null,
    // customerInfo: {},
    // totalDiscount: 0,
    // taxRate: 0.08
  },
  
  // Reducer functions - define how billing state updates in response to actions
  reducers: {
    /**
     * Add billing item reducer
     * Adds new item to the billing items array
     * 
     * @param {Object} state - Current billing state
     * @param {Object} action - Action object with payload containing new billing item
     */
    addItem: (state, action) => {
      // Immer allows direct mutation syntax (actually creates immutable update)
      // Add item with additional billing metadata
      state.items.push({
        ...action.payload,
        // Add billing-specific fields
        addedAt: action.payload.addedAt || new Date().toISOString(),
        category: action.payload.category || 'general',
        taxable: action.payload.taxable !== false, // Default to taxable
      });
    },
    
    /**
     * Remove billing item reducer
     * Removes billing item by ID from the items array
     * 
     * @param {Object} state - Current billing state
     * @param {Object} action - Action object with payload containing item ID to remove
     */
    removeItem: (state, action) => {
      // Filter out the item with matching ID
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    
    /**
     * Update billing item reducer
     * Updates existing billing item with new data
     * 
     * @param {Object} state - Current billing state
     * @param {Object} action - Action object with payload: { id, updates }
     */
    updateItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        // Merge existing item data with updates
        state.items[itemIndex] = { 
          ...state.items[itemIndex], 
          ...action.payload.updates,
          updatedAt: new Date().toISOString()
        };
      }
    },
    
    /**
     * Apply discount reducer
     * Applies percentage discount to specific billing item
     * Preserves original price for audit purposes
     * 
     * @param {Object} state - Current billing state
     * @param {Object} action - Action object with payload: { id, discount }
     */
    applyDiscount: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        
        // Store original price if not already stored
        if (!item.originalPrice) {
          item.originalPrice = item.price;
        }
        
        // Apply discount to current price (use original price as base)
        const basePrice = item.originalPrice || item.price;
        item.price = basePrice * (1 - action.payload.discount);
        
        // Add discount metadata
        item.discountApplied = action.payload.discount;
        item.discountedAt = new Date().toISOString();
      }
    },
    
    /**
     * Remove discount reducer
     * Restores item to original price before discount
     * 
     * @param {Object} state - Current billing state
     * @param {Object} action - Action object with payload containing item ID
     */
    removeDiscount: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        
        // Restore original price if discount was applied
        if (item.originalPrice) {
          item.price = item.originalPrice;
          // Clean up discount-related fields
          delete item.originalPrice;
          delete item.discountApplied;
          delete item.discountedAt;
        }
      }
    },
    
    /**
     * Clear all items reducer
     * Removes all billing items from the array
     * 
     * @param {Object} state - Current billing state
     */
    clearItems: (state) => {
      // Reset items array to empty
      state.items = [];
    },
    
    /**
     * Set items reducer
     * Replaces entire items array (useful for loading from saved invoice)
     * 
     * @param {Object} state - Current billing state
     * @param {Object} action - Action object with payload containing new items array
     */
    setItems: (state, action) => {
      state.items = action.payload;
    },
    
    /**
     * Bulk discount reducer
     * Applies discount to all items in the bill
     * 
     * @param {Object} state - Current billing state
     * @param {Object} action - Action object with payload containing discount percentage
     */
    applyBulkDiscount: (state, action) => {
      state.items.forEach(item => {
        // Store original price if not already stored
        if (!item.originalPrice) {
          item.originalPrice = item.price;
        }
        
        // Apply discount
        const basePrice = item.originalPrice || item.price;
        item.price = basePrice * (1 - action.payload.discount);
        item.discountApplied = action.payload.discount;
        item.discountedAt = new Date().toISOString();
      });
    }
  },
});

// Export action creators
// These are automatically generated by createSlice based on reducer names
export const { 
  addItem, 
  removeItem, 
  updateItem, 
  applyDiscount, 
  removeDiscount, 
  clearItems, 
  setItems, 
  applyBulkDiscount 
} = billingSlice.actions;

// Export reducer function
// This will be used in store configuration to combine with other reducers
export default billingSlice.reducer;