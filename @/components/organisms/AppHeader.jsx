import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import SearchInput from '@/components/molecules/SearchInput';
import DarkModeToggle from '@/components/molecules/DarkModeToggle';
import UserProfileDisplay from '@/components/molecules/UserProfileDisplay';

const AppHeader = ({ searchTerm, onSearchChange, darkMode, toggleDarkMode }) => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-soft border-b border-surface-600 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-warm-gradient rounded-lg flex items-center justify-center">
                                <ApperIcon name="Home" size={20} className="text-white" />
                            </div>
                            <Heading level={1} className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
                                EstateFlow
                            </Heading>
                        </div>
                        
                        <SearchInput
                            searchTerm={searchTerm}
                            onSearchChange={onSearchChange}
                            placeholder="Search leads, properties, or clients..."
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                        <UserProfileDisplay userName="Sarah Johnson" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;