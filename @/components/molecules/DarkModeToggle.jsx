import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const DarkModeToggle = ({ darkMode, toggleDarkMode, className, ...props }) => {
    return (
        <Button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg bg-surface-200 dark:bg-gray-700 hover:bg-surface-300 dark:hover:bg-gray-600 transition-colors ${className}`}
            {...props}
        >
            <ApperIcon 
                name={darkMode ? 'Sun' : 'Moon'} 
                size={18} 
                className="text-gray-600 dark:text-gray-300" 
            />
        </Button>
    );
};

export default DarkModeToggle;