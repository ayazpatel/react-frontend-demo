import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import BlogUseState from './BlogUseState';
import BlogUseReducer from './BlogUseReducer';
import BlogRedux from './BlogRedux';

const ProjectMethodLayout = ({ title, subtitle, methods, children }) => {
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
                            <NavLink to={path} className={`nav-link ${currentPath === path ? 'active' : ''}`}>{name}</NavLink>
                        </li>
                    ))}
                </ul>
                {children}
            </div>
        </div>
    );
};

const BlogPage = () => {
    const methods = { useState: 'useState', useReducer: 'useReducer', redux: 'Redux' };
    return (
        <ProjectMethodLayout title="Blog Application" subtitle="Manage a list of posts." methods={methods}>
            <Routes>
                <Route path="useState" element={<BlogUseState />} />
                <Route path="useReducer" element={<BlogUseReducer />} />
                <Route path="redux" element={<BlogRedux />} />
            </Routes>
        </ProjectMethodLayout>
    );
};

export default BlogPage;