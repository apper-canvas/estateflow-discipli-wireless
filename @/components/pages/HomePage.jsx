import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { leadService } from '@/services';
import AppHeader from '@/components/organisms/AppHeader';
import LeadPipeline from '@/components/organisms/LeadPipeline';
import Heading from '@/components/atoms/Heading';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import ErrorMessage from '@/components/molecules/ErrorMessage';

const HomePage = ({ darkMode, toggleDarkMode }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadLeads = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const result = await leadService.getAll();
        setLeads(result || []);
      } catch (err) {
        setError(err.message || 'Failed to load leads.');
      } finally {
        setLoading(false);
      }
    };
    loadLeads();
  }, []);

  // Filter leads based on search term
  const filteredLeads = leads.filter(lead => 
    lead?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
    lead?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
    lead?.stage?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-surface-300 dark:bg-gray-900">
      <AppHeader
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Heading level={2} className="text-3xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
            Lead Pipeline
          </Heading>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your real estate leads through visual workflows
          </p>
        </div>

        {loading && <LoadingSpinner message="Loading leads..." />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LeadPipeline 
              leads={filteredLeads} 
              setLeads={setLeads}
              searchTerm={searchTerm}
            />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default HomePage;