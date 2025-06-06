import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const ErrorMessage = ({ message, className, iconSize = 20, iconClassName = 'text-red-600 dark:text-red-400' }) => {
    return (
        <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 ${className}`}>
            <div className="flex items-center">
                <ApperIcon name="AlertCircle" size={iconSize} className={`${iconClassName} mr-2`} />
                <span className="text-red-700 dark:text-red-300">{message}</span>
            </div>
        </div>
    );
};

export default ErrorMessage;