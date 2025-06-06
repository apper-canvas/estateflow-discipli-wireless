import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import { motion } from 'framer-motion';

const LeadCard = ({ lead, onDragStart, formatDate, getSourceIcon }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            draggable
            onDragStart={(e) => onDragStart(e, lead)}
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
                    <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        {lead.source}
                    </Badge>
                </div>
            )}
        </motion.div>
    );
};

export default LeadCard;