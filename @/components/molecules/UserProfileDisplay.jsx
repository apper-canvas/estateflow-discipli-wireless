import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const UserProfileDisplay = ({ userName, className, ...props }) => {
    return (
        <div className={`flex items-center space-x-2 ${className}`} {...props}>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <ApperIcon name="User" size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {userName}
            </span>
        </div>
    );
};

export default UserProfileDisplay;