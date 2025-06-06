import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { leadService } from '@/services'

const STAGES = [
  { id: 'inquiry', name: 'New Inquiry', color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700' },
  { id: 'qualified', name: 'Qualified', color: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700' },
  { id: 'viewing', name: 'Property Viewing', color: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700' },
  { id: 'negotiating', name: 'Negotiating', color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700' },
  { id: 'closed', name: 'Closed', color: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700' }
]

const MainFeature = ({ leads, setLeads, searchTerm }) => {
  const [draggedLead, setDraggedLead] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    source: '',
    notes: ''
  })

  const handleDragStart = (e, lead) => {
    setDraggedLead(lead)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e, targetStage) => {
    e.preventDefault()
    
    if (draggedLead && draggedLead.stage !== targetStage) {
      try {
        const updatedLead = { ...draggedLead, stage: targetStage }
        await leadService.update(draggedLead.id, updatedLead)
        
        setLeads(prevLeads => 
          prevLeads.map(lead => 
            lead.id === draggedLead.id 
              ? { ...lead, stage: targetStage }
              : lead
          )
        )
        
        toast.success(`Lead moved to ${STAGES.find(s => s.id === targetStage)?.name}`)
      } catch (error) {
        toast.error('Failed to update lead stage')
      }
    }
    
    setDraggedLead(null)
  }

  const handleAddLead = async (e) => {
    e.preventDefault()
    
    if (!newLead.name.trim() || !newLead.email.trim()) {
      toast.error('Name and email are required')
      return
    }

    try {
      const leadData = {
        ...newLead,
        stage: 'inquiry',
        createdAt: new Date().toISOString(),
        lastContact: new Date().toISOString(),
        propertyPreferences: {},
        notes: newLead.notes ? [newLead.notes] : []
      }
      
      const createdLead = await leadService.create(leadData)
      setLeads(prevLeads => [...prevLeads, createdLead])
      
      setNewLead({ name: '', email: '', phone: '', source: '', notes: '' })
      setShowAddForm(false)
      toast.success('New lead added successfully')
    } catch (error) {
      toast.error('Failed to add new lead')
    }
  }

  const getLeadsForStage = (stageId) => {
    return leads.filter(lead => lead?.stage === stageId) || []
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No contact'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getSourceIcon = (source) => {
    const icons = {
      'website': 'Globe',
      'referral': 'Users',
      'social': 'Share2',
      'phone': 'Phone',
      'email': 'Mail'
    }
    return icons[source?.toLowerCase()] || 'User'
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-heading font-medium text-gray-900 dark:text-white">
            Pipeline Overview
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {leads.length} total leads
            {searchTerm && ` • Filtered: ${leads.filter(lead => 
              lead?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
              lead?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
              lead?.stage?.toLowerCase()?.includes(searchTerm.toLowerCase())
            ).length}`}
          </div>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-warm-gradient text-white px-4 py-2 rounded-xl font-medium hover:shadow-card transition-all duration-300 hover:-translate-y-0.5"
        >
          <ApperIcon name="Plus" size={16} />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Add Lead Form Modal */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-neu-dark"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
                Add New Lead
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ApperIcon name="X" size={20} className="text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={newLead.name}
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Client name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="client@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Source
                </label>
                <select
                  value={newLead.source}
                  onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select source</option>
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="social">Social Media</option>
                  <option value="phone">Phone Call</option>
                  <option value="email">Email</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  value={newLead.notes}
                  onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Initial notes about this lead..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-warm-gradient text-white px-4 py-2 rounded-lg font-medium hover:shadow-card transition-all duration-300"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 overflow-x-auto">
        {STAGES.map((stage) => {
          const stageLeads = getLeadsForStage(stage.id)
          
          return (
            <div
              key={stage.id}
              className={`${stage.color} rounded-2xl p-4 min-h-[500px] border-2 border-dashed transition-all duration-300`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-heading font-medium text-gray-800 dark:text-gray-200">
                  {stage.name}
                </h4>
                <span className="bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 rounded-full text-gray-600 dark:text-gray-400">
                  {stageLeads.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {stageLeads.map((lead) => (
                  <motion.div
                    key={lead.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead)}
                    className="lead-card bg-white dark:bg-gray-800 rounded-xl p-4 shadow-soft cursor-move border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-gray-900 dark:text-white truncate">
                        {lead.name}
                      </h5>
                      <ApperIcon 
                        name={getSourceIcon(lead.source)} 
                        size={14} 
                        className="text-gray-400 flex-shrink-0 ml-2" 
                      />
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {lead.email}
                    </div>
                    
                    {lead.phone && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {lead.phone}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                      <span>Last contact:</span>
                      <span>{formatDate(lead.lastContact)}</span>
                    </div>
                    
                    {lead.source && (
                      <div className="mt-2">
                        <span className="inline-block bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-600 dark:text-gray-400">
                          {lead.source}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MainFeature