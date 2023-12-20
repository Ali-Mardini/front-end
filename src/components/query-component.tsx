import React, { useState, ChangeEvent } from "react";

interface QueryComponentProps {
    onQueryExecution: (query: string) => void;
}

const QueryComponent: React.FC<QueryComponentProps> = ({ onQueryExecution }) => {
    const [query, setQuery] = useState<string>('');

    const handleQueryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        // Pass the query to the parent component for execution
        onQueryExecution(query);
    };

    return (
        <div className="container mx-auto border border-gray-400 p-4 mt-5">
            <h1 className="text-lg font-bold mb-4">MySQL Query</h1>
            <textarea
                className="w-full h-32 border border-gray-400 p-2 mb-4"
                onChange={handleQueryChange}
                placeholder="Enter MySQL query here"
            ></textarea>
            <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Search
            </button>
        </div>
    );
};

export default QueryComponent;
