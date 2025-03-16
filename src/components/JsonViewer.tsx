import React, { useState, useEffect } from 'react';

// Example JSON file import (If in 'public', use fetch instead)
import jsonData from '../../public/data.json';


// Example JSON file import (If in 'public', use fetch instead)
// Recursive component to display nested JSON structure
const JsonViewer: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set()); // Track expanded keys

    useEffect(() => {
        // Load the JSON file (can use fetch if it's external)
        setData(jsonData);
    }, []);

    const toggleExpand = (key: string) => {
        setExpandedKeys((prevExpandedKeys) => {
            const newExpandedKeys = new Set(prevExpandedKeys);
            if (newExpandedKeys.has(key)) {
                newExpandedKeys.delete(key); // Collapse the key
            } else {
                newExpandedKeys.add(key); // Expand the key
            }
            return newExpandedKeys;
        });
    };

    const renderJson = (data: any, parentKey: string = '') => {
        if (Array.isArray(data)) {
            // Handle array values
            return (
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>
                            {typeof item === 'object' ? (
                                renderJson(item, `${parentKey}[${index}]`) // Recursively render array items
                            ) : (
                                <span>{item}</span>
                            )}
                        </li>
                    ))}
                </ul>
            );
        } else if (typeof data === 'object' && data !== null) {
            // Handle object values
            return (
                <ul>
                    {Object.keys(data).map((key) => {
                        const currentKey = parentKey ? `${parentKey}.${key}` : key;
                        const isExpanded = expandedKeys.has(currentKey);
                        return (
                            <li key={currentKey}>
                                <div>
                                    {typeof data[key] === 'object' ? (
                                        <button onClick={() => toggleExpand(currentKey)}>
                                            {isExpanded ? '[-]' : '[+]'}
                                        </button>
                                    ) : (
                                        <span>—</span>
                                    )}
                                    <strong>{key}:</strong>
                                    {isExpanded ? renderJson(data[key], currentKey) : ' ...'}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            // If it's a simple value like string, number, or boolean
            return <span>{data}</span>;
        }
    };

    return (
        <div>
            <h1>JSON Viewer</h1>
            <div>{data ? renderJson(data) : <p>Loading...</p>}</div>
        </div>
    );
};

export default JsonViewer;
