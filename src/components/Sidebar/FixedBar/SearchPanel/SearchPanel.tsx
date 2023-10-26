// import SearchItem from './SearchItem';
// import { useState } from 'react';

// function SearchPanel() {
//     const [input, setInput] = useState<string>('');

//     return (
//         <div>
//             <h1 className="ml-2 text-3xl font-semibold mb-7 px-3">Search</h1>
//             <div className="border-2 border-transparent rounded-lg mx-3 mb-7 bg-gray-200 group">
//                 <input
//                     className="bg-transparent w-full px-3 py-2 text-xl outline-none"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                 />
//             </div>
//             {/* <div>
//                 <SearchItem />
//                 <SearchItem />
//                 <SearchItem />
//                 <SearchItem />
//                 <SearchItem />
//             </div> */}
//         </div>
//     );
// }

// export default SearchPanel;


import React, { useState, useEffect } from 'react';
import SearchItem from './SearchItem'; // Đặt đường dẫn đúng đến SearchItem

function SearchPanel() {
  const [input, setInput] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, [input]);
//https://jsonplaceholder.typicode.com/users
const fetchData = () => {
  fetch('http://localhost:8080/api/User/')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((json) => {
      const filteredResults = json.Data.filter((user: any) => {
        return user.userName.toLowerCase().includes(input.toLowerCase());
      });
      setResults(filteredResults);
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
      // Xử lý lỗi ở đây (ví dụ: hiển thị thông báo lỗi cho người dùng)
    });
};


  const handleChange = (value: string) => {
    setInput(value);
  };

  return (
    <div className="p-3">
  <h1 className="text-3xl font-semibold mb-7">Search</h1>
  <div className="relative rounded-lg mb-7 bg-gray-200 group max-h-screen overflow-auto">
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
