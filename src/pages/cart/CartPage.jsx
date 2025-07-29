import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import CartUseState from './CartUseState';
import CartUseReducer from './CartUseReducer';
import CartRedux from './CartRedux';

const ProjectMethodLayout = ({ title, subtitle, methods, basePath, children }) => {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
    
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="card-subtitle mb-3 text-muted">{subtitle}</p>
                <ul className="nav nav-tabs mb-3">
                    {Object.entries(methods).map(([path, name]) => (
                        <li className="nav-item" key={path}>
                            <NavLink to={`${basePath}/${path}`} className={`nav-link ${currentPath === path ? 'active' : ''}`}>{name}</NavLink>
                        </li>
                    ))}
                </ul>
                {children}
            </div>
        </div>
    );
};

const CartPage = () => {
    const methods = { useState: 'useState', useReducer: 'useReducer', redux: 'Redux' };
    return (
        <ProjectMethodLayout title="Shopping Cart" subtitle="A complete cart example." methods={methods} basePath="/cart">
            <Routes>
                <Route path="useState" element={<CartUseState />} />
                <Route path="useReducer" element={<CartUseReducer />} />
                <Route path="redux" element={<CartRedux />} />
            </Routes>
        </ProjectMethodLayout>
    );
};
export default CartPage;