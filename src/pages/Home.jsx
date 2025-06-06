import { useState, useEffect } from 'react'
import MainFeature from '@/components/MainFeature'
import ApperIcon from '@/components/ApperIcon'
import { motion } from 'framer-motion'
import { leadService } from '@/services'

const Home = ({ darkMode, toggleDarkMode }) => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadLeads = async () => {
      setLoading(true)
      try {
        const result = await leadService.getAll()
        setLeads(result || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadLeads()
  }, [])

  const filteredLeads = leads.filter(lead => 
    lead?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
    lead?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
    lead?.stage?.toLowerCase()?.includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-surface-300 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-soft border-b border-surface-600 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-warm-gradient rounded-lg flex items-center justify-center">
                  <ApperIcon name="Home" size={20} className="text-white" />
                </div>
                <h1 className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
                  EstateFlow
                </h1>
              </div>
              
              <div className="relative">
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
                  className="pl-10 pr-4 py-2 w-80 border border-surface-600 dark:border-gray-600 rounded-xl bg-surface-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-surface-200 dark:bg-gray-700 hover:bg-surface-300 dark:hover:bg-gray-600 transition-colors"
              >
                <ApperIcon 
                  name={darkMode ? 'Sun' : 'Moon'} 
                  size={18} 
                  className="text-gray-600 dark:text-gray-300" 
                />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <ApperIcon name="User" size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sarah Johnson
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
            Lead Pipeline
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your real estate leads through visual workflows
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <ApperIcon name="Loader2" size={24} className="animate-spin text-primary" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading leads...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <ApperIcon name="AlertCircle" size={20} className="text-red-600 dark:text-red-400 mr-2" />
              <span className="text-red-700 dark:text-red-300">{error}</span>
            </div>
          </div>
        )}

        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MainFeature 
              leads={filteredLeads} 
              setLeads={setLeads}
              searchTerm={searchTerm}
            />
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default Home