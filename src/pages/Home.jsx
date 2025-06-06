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