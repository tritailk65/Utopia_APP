import SearchItem from './SearchItem';
import { useState } from 'react';

function SearchPanel() {
    const [input, setInput] = useState<string>('');
    return (
        <div>
            <h1 className="ml-2 text-3xl font-semibold mb-7 px-3">Search</h1>
            <div className="border-2 border-transparent rounded-lg mx-3 mb-7 bg-gray-200 group">
                <input
                    className="bg-transparent w-full px-3 py-2 text-xl outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
            <div>
                <SearchItem />
                <SearchItem />
                <SearchItem />
                <SearchItem />
                <SearchItem />
            </div>
        </div>
    );
}

export default SearchPanel;
