import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';

const SearchInput = ({ searchTerm, onSearchChange, placeholder, className, ...props }) => {
    return (
        <div className={`relative ${className}`} {...props}>
            <ApperIcon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <Input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={onSearchChange}
                className="pl-10 pr-4 py-2 w-80 border border-surface-600 dark:border-gray-600 rounded-xl bg-surface-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
        </div>
    );
};

export default SearchInput;