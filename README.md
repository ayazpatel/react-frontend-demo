# React Frontend Demo - State Management Showcase

A comprehensive React application demonstrating various state management patterns and techniques. This project showcases the implementation of different state management approaches including useState, useReducer, and Redux Toolkit across multiple practical examples.

## 🚀 Features

### State Management Techniques
- **useState**: Basic state management for simple components
- **useReducer**: Advanced state management for complex state logic
- **Redux Toolkit**: Global state management for enterprise-level applications
- **Context API**: Notification system with global state sharing

### Demo Applications
1. **Registration System**: Form handling with validation
2. **Blog Management**: CRUD operations for blog posts
3. **Billing System**: Invoice management with calculations
4. **Shopping Cart**: E-commerce cart with product management

## 🛠️ Tech Stack

- **React 19.1.0** - Frontend library
- **Vite 7.0.4** - Build tool and development server
- **Redux Toolkit 2.8.2** - State management
- **React Router DOM 7.7.1** - Client-side routing
- **Bootstrap 5.3.7** - UI components and styling
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
├── context/             # React Context providers
│   └── NotificationContext.jsx
├── pages/               # Main application pages
│   ├── HomePage.jsx
│   ├── registration/
│   │   └── RegistrationPage.jsx
│   ├── blog/           # Blog management demos
│   │   ├── BlogPage.jsx
│   │   ├── BlogUseState.jsx
│   │   ├── BlogUseReducer.jsx
│   │   └── BlogRedux.jsx
│   ├── billing/        # Billing system demos
│   │   ├── BillingPage.jsx
│   │   ├── BillingUseState.jsx
│   │   ├── BillingUseReducer.jsx
│   │   └── BillingRedux.jsx
│   └── cart/           # Shopping cart demos
│       ├── CartPage.jsx
│       ├── CartUseState.jsx
│       ├── CartUseReducer.jsx
│       └── CartRedux.jsx
├── store/              # Redux store configuration
│   ├── store.jsx
│   ├── blogSlice.jsx
│   ├── billingSlice.jsx
│   └── cartSlice.jsx
└── assets/             # Static assets
```

## 🎯 Learning Objectives

This project demonstrates:
- **State Management Patterns**: Compare and contrast different approaches
- **Component Architecture**: Modular and reusable component design
- **Redux Integration**: Modern Redux with Redux Toolkit
- **React Hooks**: Advanced usage of useReducer, useContext, and custom hooks
- **Routing**: Multi-page application with React Router
- **UI/UX**: Responsive design with Bootstrap

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-frontend-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality checks

## 🔍 State Management Examples

### 1. useState Example (Simple State)
```jsx
const [items, setItems] = useState([]);
const addItem = (item) => setItems([...items, item]);
```

### 2. useReducer Example (Complex State Logic)
```jsx
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': 
      // Handle adding items with quantity logic
    case 'UPDATE_QTY': 
      // Handle quantity updates
    default: 
      return state;
  }
};
```

### 3. Redux Toolkit Example (Global State)
```jsx
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      // Immer allows direct state mutation
    }
  }
});
```

## 🎨 UI Features

- **Responsive Design**: Mobile-first approach with Bootstrap
- **Interactive Components**: Dynamic forms, buttons, and cards
- **Notification System**: Toast-style notifications using Context API
- **Navigation**: Seamless routing between different demos

## 🔄 Development Setup

### Vite Configuration
This project uses Vite for fast development and building:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- Optimized build process

### ESLint Configuration
Code quality is maintained with ESLint rules for:
- React best practices
- React Hooks guidelines
- Code formatting and consistency

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)

## 📄 License

This project is created for educational purposes as part of a college assignment.
