// Import React's StrictMode for development checks and warnings
import { StrictMode } from 'react'
// Import createRoot from React 18's new root API for rendering
import { createRoot } from 'react-dom/client'
// Import global CSS styles for the application
import './index.css'
// Import Redux Provider to connect React app with Redux store
import { Provider } from 'react-redux';
// Import configured Redux store
import { store } from './store/store';
// Import Bootstrap CSS for styling and responsive design
import 'bootstrap/dist/css/bootstrap.min.css';
// Import main App component
import App from './App';

/**
 * Application Entry Point - main.jsx
 * 
 * Key Concepts Demonstrated:
 * 1. React 18 Root API - Modern way to mount React applications
 * 2. StrictMode - Development mode checks for React best practices
 * 3. Redux Provider - Makes Redux store available to all components
 * 4. Provider Pattern - Higher-order component pattern for dependency injection
 * 5. CSS Imports - Global styling with Bootstrap integration
 * 
 * Provider Hierarchy:
 * StrictMode (Development checks)
 *   └── Redux Provider (Global state)
 *       └── NotificationProvider (Inside App.jsx)
 *           └── BrowserRouter (Inside App.jsx)
 *               └── Application Components
 */

// Create React root using React 18's new createRoot API
// This replaces the legacy ReactDOM.render() method
// Benefits: Better performance, concurrent features, automatic batching
createRoot(document.getElementById('root')).render(
  // StrictMode enables additional checks and warnings in development
  // - Helps identify unsafe lifecycles, deprecated APIs, and side effects
  // - Only runs in development mode, no impact on production
  <StrictMode>
    {/* Redux Provider makes store available to all child components */}
    {/* Any component can now use useSelector and useDispatch hooks */}
    <Provider store={store}>
      {/* Main App component - contains all application logic and routing */}
      <App />
    </Provider>
  </StrictMode>,
)
