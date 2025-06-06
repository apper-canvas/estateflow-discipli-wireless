import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface-300 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-8">
          <ApperIcon name="Home" size={64} className="mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            The property you're looking for doesn't exist in our listings.
          </p>
        </div>
        
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-warm-gradient text-white px-6 py-3 rounded-xl font-medium hover:shadow-card transition-all duration-300 hover:-translate-y-0.5"
        >
          <ApperIcon name="ArrowLeft" size={16} />
          <span>Back to Pipeline</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound