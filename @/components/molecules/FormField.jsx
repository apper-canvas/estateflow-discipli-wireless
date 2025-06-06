import React from 'react';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Textarea from '@/components/atoms/Textarea';

const FormField = ({ label, id, value, onChange, type = 'text', placeholder, required, as = 'input', children, className, ...props }) => {
    const renderControl = () => {
        const controlProps = {
            id,
            value,
            onChange,
            placeholder,
            required,
            className: `w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent ${className || ''}`,
            ...props // Pass any extra props like rows for textarea, or specific input types
        };

        switch (as) {
            case 'select':
                return <Select {...controlProps}>{children}</Select>;
            case 'textarea':
                return <Textarea {...controlProps} />;
            case 'input':
            default:
                return <Input type={type} {...controlProps} />;
        }
    };

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {label} {required && '*'}
            </label>
            {renderControl()}
        </div>
    );
};

export default FormField;