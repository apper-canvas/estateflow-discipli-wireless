import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { propertyService } from '../services'
import ApperIcon from '../components/ApperIcon'

const Properties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('price')
  const [sortOrder, setSortOrder] = useState('desc')
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    setLoading(true)
    try {
      const result = await propertyService.getAll()
      setProperties(result || [])
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load properties')
    } finally {
      setLoading(false)
    }
  }

  const handleViewProperty = (property) => {
    setSelectedProperty(property)
    setShowModal(true)
  }

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await propertyService.delete(propertyId)
        setProperties(properties.filter(p => p.id !== propertyId))
        toast.success('Property deleted successfully')
      } catch (err) {
        toast.error('Failed to delete property')
      }
    }
  }

  // Filter and sort properties
  const filteredAndSortedProperties = properties
    .filter(property => {
      const matchesSearch = property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.city?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'all' || property.type === filterType
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === 'price') {
        aValue = parseFloat(aValue) || 0
        bValue = parseFloat(bValue) || 0
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const propertyTypes = ['all', 'house', 'apartment', 'condo', 'commercial']

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
          Properties
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your real estate property portfolio
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <ApperIcon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-surface-600 dark:border-gray-600 rounded-xl bg-surface-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center space-x-4">
            {/* Property Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-surface-600 dark:border-gray-600 rounded-lg bg-surface-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {propertyTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-surface-600 dark:border-gray-600 rounded-lg bg-surface-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="price">Price</option>
              <option value="title">Title</option>
              <option value="bedrooms">Bedrooms</option>
              <option value="bathrooms">Bathrooms</option>
              <option value="sqft">Square Feet</option>
            </select>

            {/* Sort Order */}
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 border border-surface-600 dark:border-gray-600 rounded-lg bg-surface-100 dark:bg-gray-700 hover:bg-surface-200 dark:hover:bg-gray-600 transition-colors"
              title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            >
              <ApperIcon 
                name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                size={16} 
                className="text-gray-600 dark:text-gray-300" 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <ApperIcon name="Loader2" size={24} className="animate-spin text-primary" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading properties...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
          <div className="flex items-center">
            <ApperIcon name="AlertCircle" size={20} className="text-red-600 dark:text-red-400 mr-2" />
            <span className="text-red-700 dark:text-red-300">{error}</span>
          </div>
        </div>
      )}

      {/* Properties Grid */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAndSortedProperties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="property-card bg-white dark:bg-gray-800 rounded-xl shadow-card overflow-hidden"
            >
              {/* Property Image */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                {property.images && property.images[0] ? (
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ApperIcon name="Building2" size={48} className="text-gray-400" />
                  </div>
                )}
                {/* Property Type Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-primary text-white text-xs font-medium rounded-lg">
                    {property.type?.charAt(0).toUpperCase() + property.type?.slice(1)}
                  </span>
                </div>
                {/* Status Badge */}
                {property.status && (
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                      property.status === 'available' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : property.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </span>
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {property.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex items-center">
                  <ApperIcon name="MapPin" size={14} className="mr-1" />
                  {property.address}, {property.city}
                </p>
                
                {/* Property Features */}
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <ApperIcon name="Bed" size={14} className="mr-1" />
                    {property.bedrooms} bed
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Bath" size={14} className="mr-1" />
                    {property.bathrooms} bath
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Square" size={14} className="mr-1" />
                    {property.sqft?.toLocaleString()} sqft
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewProperty(property)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-surface-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <ApperIcon name="Eye" size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteProperty(property.id)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete Property"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* No Results */}
      {!loading && !error && filteredAndSortedProperties.length === 0 && (
        <div className="text-center py-12">
          <ApperIcon name="Building2" size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No properties found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}

      {/* Property Details Modal */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-neu-dark max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-semibold text-gray-900 dark:text-white">
                  Property Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Property Images */}
                {selectedProperty.images && selectedProperty.images.length > 0 && (
                  <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={selectedProperty.images[0]}
                      alt={selectedProperty.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Basic Info */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {selectedProperty.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center mb-4">
                    <ApperIcon name="MapPin" size={16} className="mr-1" />
                    {selectedProperty.address}, {selectedProperty.city}
                  </p>
                  <div className="text-3xl font-bold text-primary mb-4">
                    {formatPrice(selectedProperty.price)}
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-surface-100 dark:bg-gray-700 rounded-lg">
                    <ApperIcon name="Bed" size={24} className="mx-auto text-gray-600 dark:text-gray-400 mb-2" />
                    <div className="font-semibold text-gray-900 dark:text-white">{selectedProperty.bedrooms}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-surface-100 dark:bg-gray-700 rounded-lg">
                    <ApperIcon name="Bath" size={24} className="mx-auto text-gray-600 dark:text-gray-400 mb-2" />
                    <div className="font-semibold text-gray-900 dark:text-white">{selectedProperty.bathrooms}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-surface-100 dark:bg-gray-700 rounded-lg">
                    <ApperIcon name="Square" size={24} className="mx-auto text-gray-600 dark:text-gray-400 mb-2" />
                    <div className="font-semibold text-gray-900 dark:text-white">{selectedProperty.sqft?.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Sq Ft</div>
                  </div>
                  <div className="text-center p-4 bg-surface-100 dark:bg-gray-700 rounded-lg">
                    <ApperIcon name="Calendar" size={24} className="mx-auto text-gray-600 dark:text-gray-400 mb-2" />
                    <div className="font-semibold text-gray-900 dark:text-white">{selectedProperty.yearBuilt}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Year Built</div>
                  </div>
                </div>

                {/* Description */}
                {selectedProperty.description && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {selectedProperty.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Properties