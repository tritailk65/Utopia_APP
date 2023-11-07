import { useState } from 'react';

function useSelected() {
    const [selectItem, setSelectItem] = useState<any[]>([]);
    const handleSelectItem = (index: any) => {
        if (selectItem.includes(index)) {
            const updatedNumbers = selectItem.filter((num) => num !== index);
            setSelectItem(updatedNumbers);
        } else setSelectItem((prevNumbers) => [...prevNumbers, index]);
    };
    return { selectItem, handleSelectItem };
}

export default useSelected;
