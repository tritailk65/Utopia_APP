import { useState, ChangeEvent } from 'react';

const useInput = (initialValues: { [key: string]: string }) => {
    const [formData, setFormData] = useState(initialValues);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return {
        formData,
        handleInputChange,
    };
};

export default useInput;
