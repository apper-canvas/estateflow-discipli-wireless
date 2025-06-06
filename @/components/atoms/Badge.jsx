import React from 'react';

const Badge = ({ children, className, ...props }) => {
    return (
        <span className={`inline-block text-xs px-2 py-1 rounded-full ${className}`} {...props}>
            {children}
        </span>
    );
};

export default Badge;