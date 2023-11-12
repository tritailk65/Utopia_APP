
// import { useState, useEffect } from 'react';
// import SearchItem from './SearchItem'; 

// function SearchPanel() {
//     const [input, setInput] = useState<string>('');
//     const [results, setResults] = useState<any[]>([]);

//     useEffect(() => {
//         const fetchData = () => {
//             fetch('http://localhost:8080/api/User/')
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error('Network response was not ok');
//                     }
//                     return response.json();
//                 })
//                 .then((json) => {
//                     const filteredResults = json.Data.filter((user: any) => {
//                         return user.userName.toLowerCase().includes(input.toLowerCase());
//                     });
//                     setResults(filteredResults);
//                 })
//                 .catch((error) => {
//                     console.error('There has been a problem with your fetch operation:', error);
//                     // Xử lý lỗi ở đây (ví dụ: hiển thị thông báo lỗi cho người dùng)
//                 });
//         };
//         fetchData();
//     }, [input]);

//     const handleChange = (value: string) => {
//         setInput(value);
//     };

//     return (
//         <div className="p-3">
//             <h1 className="text-3xl font-semibold mb-7">Search</h1>
//             <div className="relative rounded-lg mb-7 bg-gray-200 group max-h-screen overflow-auto">
//                 <input
//                     className="bg-transparent w-full px-3 py-2 text-xl outline-none"
//                     value={input}
//                     onChange={(e) => handleChange(e.target.value)}
//                 />
//                 {input && (
//                     <button
//                         className="absolute top-2.5 right-3 text-gray-500 cursor-pointer"
//                         onClick={() => setInput('')}
//                     >
//                         X
//                     </button>
//                 )}
//             </div>
//             <div>
//                 {results.map((user) => (
//                     <SearchItem key={user.id} user={user} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default SearchPanel;
import { getListUser } from '../../../../services/user-service';
import { useState, useEffect } from 'react';
import SearchItem from './SearchItem'; 
import { PostForViewer, UserPostForViewer } from '../../../../types/post-type';
import { Response } from '../../../../types/api-type';
import useDebounce from '../../../../hooks/useDebounce';
import { json } from 'react-router-dom';

interface User {
    id: number;
    userName: string;
    createAt: Date;
    updateAt: Date;
    avatarPath: string;
    website: string;
}

function SearchPanel() {
    const [input, setInput] = useState<string>('');
    const [results, setResults] = useState<UserPostForViewer[]>([]);
    const delayDebounce = useDebounce(input, 1000);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: Response<UserPostForViewer[]> = await getListUser();
                if (response && response.Status === 200) {

                    const filteredResults = response.Data.filter(user => {
                        return user.userName.toLowerCase().includes(input.toLowerCase());
                    });
                    setResults(filteredResults);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchData();
    }, [delayDebounce]);

    const handleChange = (value: string) => {
        setInput(value);
    };

    return (
        <div className="p-3 max-h-screen overflow-auto">
            <h1 className="text-3xl font-semibold mb-7">Search</h1>
            <div className="relative rounded-lg mb-7 bg-gray-200 group ">
                <input
                    className="bg-transparent w-full px-3 py-2 text-xl outline-none"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                />
                {input && (
                    <button
                        className="absolute top-2.5 right-3 text-gray-500 cursor-pointer"
                        onClick={() => setInput('')}
                    >
                        X
                    </button>
                )}
            </div>
            <div>
                {results.map((user) => (
                    <SearchItem key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}

export default SearchPanel;
