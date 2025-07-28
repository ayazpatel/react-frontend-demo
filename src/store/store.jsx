// Import configureStore from Redux Toolkit for creating Redux store
// configureStore is an enhanced version of createStore with good defaults
import { configureStore } from '@reduxjs/toolkit';

// Import all reducer functions from their respective slices
// Each slice handles a specific domain of application state
import blogReducer from './blogSlice';
import billingReducer from './billingSlice';
import cartReducer from './cartSlice';

/**
 * Redux Store Configuration
 * 
 * Redux Store Concepts Demonstrated:
 * 1. configureStore - Redux Toolkit's store creator with built-in middleware
 * 2. Reducer combination - Multiple slices combined into root reducer
 * 3. State structure - Organized by feature domains
 * 4. Middleware integration - Built-in thunk, devtools, and serialization checks
 * 
 * Store Benefits:
 * - Centralized state management
 * - Predictable state updates through actions and reducers
 * - Time-travel debugging with Redux DevTools
 * - Middleware support for async operations
 * - Hot reloading support in development
 */

// Create and configure Redux store
export const store = configureStore({
  // Reducer configuration - combines multiple slice reducers
  reducer: {
    // Each key becomes a slice of the global state
    // State structure: { blog: {...}, billing: {...}, cart: {...} }
    
    // Blog slice - handles blog posts CRUD operations
    blog: blogReducer,
    
    // Billing slice - handles billing/invoice management
    billing: billingReducer,
    
    // Cart slice - handles shopping cart operations
    cart: cartReducer,
  },
  
  // configureStore automatically includes:
  // - redux-thunk middleware for async actions
  // - Redux DevTools Extension integration
  // - Serialization and immutability checks in development
  // - Default middleware for better DX (Developer Experience)
});