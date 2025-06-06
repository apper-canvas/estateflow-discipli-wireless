import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';
import ApperIcon from '@/components/ApperIcon';

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
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
                    <Heading level={3} className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
                        {title}
                    </Heading>
                    <Button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <ApperIcon name="X" size={20} className="text-gray-500" />
                    </Button>
                </div>
                {children}
            </motion.div>
        </motion.div>
    );
};

export default Modal;