import React from 'react';

const Textarea = ({ value, onChange, className, rows = 3, placeholder, ...props }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder={placeholder}
            className={className}
            {...props}
        />
    );
};

export default Textarea;