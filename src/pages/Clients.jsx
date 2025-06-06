import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { clientService } from '../services'
import ApperIcon from '../components/ApperIcon'

const Clients = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [selectedClient, setSelectedClient] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    setLoading(true)
    try {
      const result = await clientService.getAll()
      setClients(result || [])
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load clients')
    } finally {
      setLoading(false)
    }
  }

  const handleViewClient = (client) => {
    setSelectedClient(client)
    setShowModal(true)
  }

  const handleDeleteClient = async (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await clientService.delete(clientId)
        setClients(clients.filter(c => c.id !== clientId))
        toast.success('Client deleted successfully')
      } catch (err) {
        toast.error('Failed to delete client')
      }
    }
  }

  // Filter and sort clients
  const filteredAndSortedClients = clients
    .filter(client => {
      const matchesSearch = client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.phone?.includes(searchTerm)
      const matchesStatus = filterStatus === 'all' || client.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const clientStatuses = ['all', 'active', 'inactive', 'lead', 'prospect']

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
      case 'lead':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'prospect':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Helper function to safely format numbers and prevent NaN errors
  const formatCurrency = (value) => {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return 'N/A'
    }
    const numValue = Number(value)
    return isNaN(numValue) ? 'N/A' : `$${numValue.toLocaleString()}`
  }

  // Helper function to safely display numeric values
  const formatNumber = (value) => {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return 'N/A'
    }
    const numValue = Number(value)
    return isNaN(numValue) ? 'N/A' : numValue.toString()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
          Clients
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your client relationships and contacts
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
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-surface-600 dark:border-gray-600 rounded-xl bg-surface-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center space-x-4">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-surface-600 dark:border-gray-600 rounded-lg bg-surface-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {clientStatuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-surface-600 dark:border-gray-600 rounded-lg bg-surface-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="status">Status</option>
              <option value="createdAt">Date Added</option>
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
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading clients...</span>
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

      {/* Clients List */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-600 dark:divide-gray-700">
                {filteredAndSortedClients.map((client) => (
                  <motion.tr
                    key={client.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-surface-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                          <ApperIcon name="User" size={16} className="text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {client.name}
                          </div>
                          {client.company && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {client.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {client.email}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {client.phone}
                      </div>
                    </td>
<td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                        {client.status ? client.status.charAt(0).toUpperCase() + client.status.slice(1) : 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(client.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewClient(client)}
                          className="p-1 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-surface-200 dark:hover:bg-gray-600 rounded transition-colors"
                          title="View Details"
                        >
                          <ApperIcon name="Eye" size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClient(client.id)}
                          className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          title="Delete Client"
                        >
                          <ApperIcon name="Trash2" size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* No Results */}
      {!loading && !error && filteredAndSortedClients.length === 0 && (
        <div className="text-center py-12">
          <ApperIcon name="Users" size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No clients found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}

      {/* Client Details Modal */}
      {showModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-neu-dark max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-semibold text-gray-900 dark:text-white">
                  Client Profile
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Client Header */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <ApperIcon name="User" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedClient.name}
                    </h3>
                    {selectedClient.company && (
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedClient.company}
                      </p>
                    )}
<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-2 ${getStatusColor(selectedClient.status)}`}>
                      {selectedClient.status ? selectedClient.status.charAt(0).toUpperCase() + selectedClient.status.slice(1) : 'Unknown'}
                    </span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <ApperIcon name="Mail" size={16} className="text-gray-400 mr-2" />
                        <span className="text-gray-900 dark:text-white">{selectedClient.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <ApperIcon name="Phone" size={16} className="text-gray-400 mr-2" />
                        <span className="text-gray-900 dark:text-white">{selectedClient.phone}</span>
                      </div>
                      {selectedClient.address && (
                        <div className="flex items-start text-sm">
                          <ApperIcon name="MapPin" size={16} className="text-gray-400 mr-2 mt-0.5" />
                          <span className="text-gray-900 dark:text-white">{selectedClient.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <ApperIcon name="Calendar" size={16} className="text-gray-400 mr-2" />
                        <span className="text-gray-600 dark:text-gray-400">Added: </span>
                        <span className="text-gray-900 dark:text-white ml-1">
                          {formatDate(selectedClient.createdAt)}
                        </span>
                      </div>
{selectedClient.budget && !isNaN(Number(selectedClient.budget)) && (
                        <div className="flex items-center text-sm">
                          <ApperIcon name="DollarSign" size={16} className="text-gray-400 mr-2" />
                          <span className="text-gray-600 dark:text-gray-400">Budget: </span>
                          <span className="text-gray-900 dark:text-white ml-1">
                            {formatCurrency(selectedClient.budget)}
                          </span>
                        </div>
                      )}
                      {selectedClient.source && (
                        <div className="flex items-center text-sm">
                          <ApperIcon name="Globe" size={16} className="text-gray-400 mr-2" />
                          <span className="text-gray-600 dark:text-gray-400">Source: </span>
                          <span className="text-gray-900 dark:text-white ml-1">
                            {selectedClient.source}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedClient.notes && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Notes</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {selectedClient.notes}
                    </p>
                  </div>
                )}

{/* Preferences */}
                {selectedClient.preferences && typeof selectedClient.preferences === 'object' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Preferences</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedClient.preferences?.propertyType && (
                        <div className="p-3 bg-surface-100 dark:bg-gray-700 rounded-lg">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Property Type</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {selectedClient.preferences.propertyType}
                          </div>
                        </div>
                      )}
                      {selectedClient.preferences?.location && (
                        <div className="p-3 bg-surface-100 dark:bg-gray-700 rounded-lg">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Preferred Location</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedClient.preferences.location}
                          </div>
                        </div>
                      )}
                      {(selectedClient.preferences?.minPrice || selectedClient.preferences?.maxPrice) && 
                       (selectedClient.preferences.minPrice !== null && selectedClient.preferences.minPrice !== undefined) && (
                        <div className="p-3 bg-surface-100 dark:bg-gray-700 rounded-lg">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Price Range</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {formatCurrency(selectedClient.preferences.minPrice)} - {formatCurrency(selectedClient.preferences.maxPrice)}
                          </div>
                        </div>
                      )}
                      {selectedClient.preferences?.bedrooms && 
                       !isNaN(Number(selectedClient.preferences.bedrooms)) && (
                        <div className="p-3 bg-surface-100 dark:bg-gray-700 rounded-lg">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Bedrooms</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {formatNumber(selectedClient.preferences.bedrooms)}+
                          </div>
                        </div>
                      )}
                    </div>
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

export default Clients