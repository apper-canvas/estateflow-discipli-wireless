import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className, ...props }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            {...props}
        />
    );
};

export default Input;