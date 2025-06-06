import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';
import LeadPipelineColumn from '@/components/organisms/LeadPipelineColumn';
import AddLeadForm from '@/components/organisms/AddLeadForm';
import Modal from '@/components/molecules/Modal';
import { leadService } from '@/services';

const STAGES = [
  { id: 'inquiry', name: 'New Inquiry', color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700' },
  { id: 'qualified', name: 'Qualified', color: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700' },
  { id: 'viewing', name: 'Property Viewing', color: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700' },
  { id: 'negotiating', name: 'Negotiating', color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700' },
  { id: 'closed', name: 'Closed', color: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700' }
];

const LeadPipeline = ({ leads, setLeads, searchTerm }) => {
  const [draggedLead, setDraggedLead] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDragStart = (e, lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, targetStage) => {
    e.preventDefault();
    
    if (draggedLead && draggedLead.stage !== targetStage) {
      try {
        const updatedLead = { ...draggedLead, stage: targetStage };
        await leadService.update(draggedLead.id, updatedLead);
        
        setLeads(prevLeads => 
          prevLeads.map(lead => 
            lead.id === draggedLead.id 
              ? { ...lead, stage: targetStage }
              : lead
          )
        );
        
        toast.success(`Lead moved to ${STAGES.find(s => s.id === targetStage)?.name}`);
      } catch (error) {
        toast.error('Failed to update lead stage');
      }
    }
    
    setDraggedLead(null);
  };

  const handleAddLead = async (newLeadData) => {
    try {
      const leadData = {
        ...newLeadData,
        stage: 'inquiry',
        createdAt: new Date().toISOString(),
        lastContact: new Date().toISOString(),
        propertyPreferences: {},
        notes: newLeadData.notes ? [newLeadData.notes] : []
      };
      
      const createdLead = await leadService.create(leadData);
      setLeads(prevLeads => [...prevLeads, createdLead]);
      
      toast.success('New lead added successfully');
      return true; // Indicate success
    } catch (error) {
      console.error('Error adding lead:', error);
      toast.error('Failed to add new lead');
      throw error; // Propagate error
    }
  };

  const getLeadsForStage = (stageId) => {
    return leads.filter(lead => lead?.stage === stageId) || [];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No contact';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getSourceIcon = (source) => {
    const icons = {
      'website': 'Globe',
      'referral': 'Users',
      'social': 'Share2',
      'phone': 'Phone',
      'email': 'Mail'
    };
    return icons[source?.toLowerCase()] || 'User';
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Heading level={3} className="text-lg font-heading font-medium text-gray-900 dark:text-white">
            Pipeline Overview
          </Heading>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {leads.length} total leads
            {searchTerm && ` • Filtered: ${leads.filter(lead => 
              lead?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
              lead?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
              lead?.stage?.toLowerCase()?.includes(searchTerm.toLowerCase())
            ).length}`}
          </div>
        </div>
        
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-warm-gradient text-white px-4 py-2 rounded-xl font-medium hover:shadow-card transition-all duration-300 hover:-translate-y-0.5"
        >
          <ApperIcon name="Plus" size={16} />
          <span>Add Lead</span>
        </Button>
      </div>

      {/* Add Lead Form Modal */}
      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)} title="Add New Lead">
        <AddLeadForm onClose={() => setShowAddForm(false)} onAddLead={handleAddLead} />
      </Modal>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 overflow-x-auto">
        {STAGES.map((stage) => {
          const stageLeads = getLeadsForStage(stage.id);
          
          return (
            <LeadPipelineColumn
              key={stage.id}
              stage={stage}
              leads={stageLeads}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              formatDate={formatDate}
              getSourceIcon={getSourceIcon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LeadPipeline;