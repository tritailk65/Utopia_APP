import { useState, ChangeEvent } from 'react';

const useInput = (initialValues: { [key: string]: string }) => {
    const [formData, setFormData] = useState(initialValues);
    const [formError, setFormError] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        
        // Clear the error for this field when it's being edited
        setFormError((prevState) => ({
            ...prevState,
            [name]: '',
        }));
    };

    return {
        formData,
        formError,
        handleInputChange,
        setFormError, // You can use this to manually set errors if needed
    };
};

export default useInput;
