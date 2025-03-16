import React, { useState, useEffect } from 'react';

// Example JSON file import (If in 'public', use fetch instead)
import jsonData from '../../public/data.json';

const isEmptyObject = (obj: object) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

// Example JSON file import (If in 'public', use fetch instead)
// Recursive component to display nested JSON structure
const JsonViewer: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set()); // Track expanded keys

    useEffect(() => {
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
            return (
                <ul>
                    {data.map((item, index) => {
                        const currentKey = `${parentKey}[${index}]`;
                        return (
                            <li key={index}>
                                {typeof item === 'object' ? renderJson(item, currentKey) : <span>{item}</span>}
                            </li>
                        );
                    })}
                </ul>
            );
        } else if (typeof data === 'object' && data !== null) {
            return (
                <ul>
                    {Object.keys(data).map((key) => {
                        const currentKey = parentKey ? `${parentKey}.${key}` : key;
                        const isExpanded = expandedKeys.has(currentKey);
                        return (
                            <li key={currentKey}>
                                <div>
                                    {typeof data[key] === 'object' ? isEmptyObject(data[key]) ? '' : (
                                        <button onClick={() => toggleExpand(currentKey)}>
                                            {isExpanded ? '[-]' : '[+]'}
                                        </button>
                                    ) : (
                                        <span>▶</span>
                                    )}
                                    <strong>{key}:</strong>
                                    {isExpanded ? (
                                        renderJson(data[key], currentKey)
                                    ) : (
                                        <span>{typeof data[key] === 'object' ? isEmptyObject(data[key]) ? '{}' : '...' : ' ' + data[key].toString()}</span>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            // If it's a simple value like string, number, or boolean
            console.log('If it\'s a simple value like string, number, or boolean');
            console.log(parentKey);
            console.log(data);
            return <span>{data}</span>;
        }
    };

    return (
        <div>
            <h1>OPUS KG</h1>
            <div>{data ? renderJson(data) : <p>Loading...</p>}</div>
        </div>
    );
};

export default JsonViewer;
