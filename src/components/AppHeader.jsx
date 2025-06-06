import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navigationRoutes } from '../config/routes'
import ApperIcon from './ApperIcon'

const AppHeader = ({ darkMode, toggleDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-soft border-b border-surface-600 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-warm-gradient rounded-lg flex items-center justify-center">
                <ApperIcon name="Home" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
                EstateFlow
              </h1>
            </Link>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationRoutes.map((route) => {
                const isActive = location.pathname === route.path
                return (
                  <Link
                    key={route.id}
                    to={route.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-surface-200 dark:hover:bg-gray-700'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <ApperIcon name={route.icon} size={16} />
                    <span>{route.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
          
          {/* Search and User Controls */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <ApperIcon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                placeholder="Search leads, properties, or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 lg:w-80 border border-surface-600 dark:border-gray-600 rounded-xl bg-surface-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-surface-200 dark:bg-gray-700 hover:bg-surface-300 dark:hover:bg-gray-600 transition-colors"
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              <ApperIcon 
                name={darkMode ? 'Sun' : 'Moon'} 
                size={18} 
                className="text-gray-600 dark:text-gray-300" 
              />
            </button>
            
            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <ApperIcon name="User" size={16} className="text-white" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                Sarah Johnson
              </span>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-surface-600 dark:border-gray-700 py-2">
          <nav className="flex items-center space-x-1">
            {navigationRoutes.map((route) => {
              const isActive = location.pathname === route.path
              return (
                <Link
                  key={route.id}
                  to={route.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-surface-200 dark:hover:bg-gray-700'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <ApperIcon name={route.icon} size={16} />
                  <span>{route.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default AppHeader