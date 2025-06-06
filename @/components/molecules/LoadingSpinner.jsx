import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const LoadingSpinner = ({ message = 'Loading...', className, iconSize = 24, iconClassName = 'text-primary' }) => {
    return (
        <div className={`flex items-center justify-center py-12 ${className}`}>
            <ApperIcon name="Loader2" size={iconSize} className={`animate-spin ${iconClassName}`} />
            <span className="ml-2 text-gray-600 dark:text-gray-400">{message}</span>
        </div>
    );
};

export default LoadingSpinner;