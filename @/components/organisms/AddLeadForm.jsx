import React, { useState } from 'react';
import { toast } from 'react-toastify';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';

const AddLeadForm = ({ onClose, onAddLead }) => {
    const [newLead, setNewLead] = useState({
        name: '',
        email: '',
        phone: '',
        source: '',
        notes: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLead(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!newLead.name.trim() || !newLead.email.trim()) {
            toast.error('Name and email are required');
            return;
        }

        try {
            await onAddLead(newLead);
            setNewLead({ name: '', email: '', phone: '', source: '', notes: '' }); // Reset form
            onClose(); // Close modal
        } catch (error) {
            toast.error('Failed to add new lead');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
                label="Name"
                id="lead-name"
                name="name"
                value={newLead.name}
                onChange={handleInputChange}
                placeholder="Client name"
                required
            />
            
            <FormField
                label="Email"
                id="lead-email"
                name="email"
                type="email"
                value={newLead.email}
                onChange={handleInputChange}
                placeholder="client@email.com"
                required
            />
            
            <FormField
                label="Phone"
                id="lead-phone"
                name="phone"
                type="tel"
                value={newLead.phone}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
            />
            
            <FormField
                label="Source"
                id="lead-source"
                name="source"
                as="select"
                value={newLead.source}
                onChange={handleInputChange}
            >
                <option value="">Select source</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social">Social Media</option>
                <option value="phone">Phone Call</option>
                <option value="email">Email</option>
            </FormField>
            
            <FormField
                label="Notes"
                id="lead-notes"
                name="notes"
                as="textarea"
                value={newLead.notes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Initial notes about this lead..."
            />
            
            <div className="flex space-x-3 pt-4">
                <Button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="flex-1 bg-warm-gradient text-white px-4 py-2 rounded-lg font-medium hover:shadow-card transition-all duration-300"
                >
                    Add Lead
                </Button>
            </div>
        </form>
    );
};

export default AddLeadForm;