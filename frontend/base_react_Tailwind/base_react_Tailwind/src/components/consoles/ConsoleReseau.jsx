import React, { useState, useEffect } from 'react';
import { FaWifi } from "react-icons/fa";
import NetworkAnalysis from './reseau/NetworkAnalysis';
import NetworkStatus from './reseau/NetworkStatus';

const ConsoleReseau = () => {
    const [messages, setMessages] = useState([]);
    const maxMessages = 2;

    const saveTestResults = (testResults) => {
        localStorage.setItem('networkTestResults', JSON.stringify(testResults));
    };

    const getSavedTestResults = () => {
        const savedResults = localStorage.getItem('networkTestResults');
        if (savedResults) {
            return JSON.parse(savedResults);
        }
        return [];
    };

    const deleteMessage = (timestamp) => {
        const updatedMessages = messages.filter(msg => msg.timestamp !== timestamp);
        setMessages(updatedMessages);
        saveTestResults(updatedMessages);
    };

    useEffect(() => {
        const savedResults = getSavedTestResults();
        if (savedResults) {
            setMessages(savedResults);
        }

        const interval = setInterval(() => {
            const newTestResult = {
                timestamp: new Date().toISOString(),
                status: 'success',
                message: 'Network test completed successfully.',
            };

            setMessages((prevMessages) => {
                const updatedMessages = [newTestResult, ...prevMessages];

                const limitedMessages = updatedMessages.slice(0, maxMessages);

                saveTestResults(limitedMessages);
                return limitedMessages;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4">
            <div style={{ marginTop: "-25px" }} className="flex justify-center mb-6">
                <img
                    src="public/Depositphotos_10497011_l-2015-removebg-preview.png"
                    alt="Logo"
                    className="w-24 h-24"
                />
            </div>
            <div className="flex items-center mb-6">
                <FaWifi className="mr-2 text-green-400" size={30} />
                <span className="text-lg">Performance Réseau : {status === "inProgress" ? "Test en cours..." : "Bon"}</span>
            </div>
            <NetworkAnalysis />
            <NetworkStatus />
            <div className="mt-6 px-6 md:px-8 lg:px-20">
                <ul className="list-disc pl-5 space-y-3">
                    {messages.map((msg) => (
                        <li key={msg.timestamp} className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                            <span className="text-sm sm:text-base">
                                {msg.timestamp} - {msg.status}: {msg.message}
                            </span>
                            <button
                                onClick={() => deleteMessage(msg.timestamp)}
                                className="ml-0 sm:ml-2 text-red-500 hover:text-red-700 text-xs sm:text-sm cursor-pointer"
                            >
                                🗑️ Supprimer
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ConsoleReseau;




