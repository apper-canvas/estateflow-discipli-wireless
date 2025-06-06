import React from 'react';
import Heading from '@/components/atoms/Heading';
import LeadCard from '@/components/molecules/LeadCard';

const LeadPipelineColumn = ({ 
    stage, 
    leads, 
    onDragOver, 
    onDrop, 
    onDragStart, 
    formatDate, 
    getSourceIcon 
}) => {
    return (
        <div
            className={`${stage.color} rounded-2xl p-4 min-h-[500px] border-2 border-dashed transition-all duration-300`}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, stage.id)}
        >
            <div className="flex items-center justify-between mb-4">
                <Heading level={4} className="font-heading font-medium text-gray-800 dark:text-gray-200">
                    {stage.name}
                </Heading>
                <span className="bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 rounded-full text-gray-600 dark:text-gray-400">
                    {leads.length}
                </span>
            </div>
            
            <div className="space-y-3">
                {leads.map((lead) => (
                    <LeadCard 
                        key={lead.id}
                        lead={lead}
                        onDragStart={onDragStart}
                        formatDate={formatDate}
                        getSourceIcon={getSourceIcon}
                    />
                ))}
            </div>
        </div>
    );
};

export default LeadPipelineColumn;