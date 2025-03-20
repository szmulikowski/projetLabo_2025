import React, { useState, useEffect } from 'react';

const ConsoleData = () => {
    const [output, setOutput] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [selectedScanType, setSelectedScanType] = useState("personalFiles");
    const [isProtected, setIsProtected] = useState(false);

    useEffect(() => {
        const savedOutput = localStorage.getItem('scanResults');
        if (savedOutput) {
            setOutput(JSON.parse(savedOutput));
        }
    }, []);

    const scanSensitiveData = () => {
        setIsScanning(true);
        setOutput((prevOutput) => [
            ...prevOutput,
            "Début du scan des données sensibles...",
        ]);

        setTimeout(() => {
            const scanResults = [];

            if (selectedScanType === "personalFiles") {
                scanResults.push({ message: "Scan des fichiers personnels", status: "OK" });
            } else if (selectedScanType === "passwords") {
                scanResults.push({ message: "Scan des mots de passe", status: "KO", details: "Trouvé 3 mots de passe non sécurisés", fixable: true });
            } else if (selectedScanType === "apiKeys") {
                scanResults.push({ message: "Scan des clés API", status: "KO", details: "2 clés API exposées", fixable: true });
            }

            scanResults.push({ message: "Scan des fichiers sensibles", status: "OK" });

            setOutput((prevOutput) => {
                const newOutput = [
                    ...prevOutput,
                    ...scanResults.map((result) => ({
                        ...result,
                        color: result.status === "OK" ? "text-green-500" : "text-red-500",
                    })),
                ];

                localStorage.setItem('scanResults', JSON.stringify(newOutput));

                return newOutput;
            });

            const allOk = scanResults.every((result) => result.status === "OK");
            setIsProtected(allOk);

            setIsScanning(false);
        }, 3000);
    };

    const clearConsole = () => {
        setOutput([]);
        localStorage.removeItem('scanResults');
        setIsProtected(false);
    };

    const handleScanTypeChange = (e) => {
        setSelectedScanType(e.target.value);
    };

    const fixIssue = (index) => {
        setOutput((prevOutput) => {
            const updatedOutput = [...prevOutput];
            const result = updatedOutput[index];

            result.status = "OK";
            result.color = "text-green-500";

            localStorage.setItem('scanResults', JSON.stringify(updatedOutput));

            const allOk = updatedOutput.every((line) => line.status === "OK");
            setIsProtected(allOk);

            return updatedOutput;
        });
    };

    return (
        <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-4">
            <div style={{ marginTop: "-20px" }} className="flex justify-center mb-6">
                <img
                    style={{ width: "70px", height: "70px" }}
                    src="public/database-removebg-preview.png"
                    alt="Logo"
                    className="w-24 h-24"
                />
            </div>

            <div className="bg-black text-green-500 p-4 w-full max-w-lg rounded-lg shadow-lg">
                <div className="font-mono text-sm h-80 overflow-auto whitespace-pre-wrap">
                    {output.length === 0 ? (
                        <p>Bienvenue dans la console des données sensibles. Choisissez un type de scan et appuyez sur "Scanner".</p>
                    ) : (
                        output.map((line, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <p className={line.color}>
                                    {line.message} {line.details && `: ${line.details}`}
                                </p>
                                {line.fixable && line.status === "KO" && (
                                    <button
                                        onClick={() => fixIssue(index)}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-1 rounded ml-4 cursor-pointer"
                                    >
                                        Réparer
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Choix des données à scanner */}
                <div className="mt-4 flex space-x-4">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="personalFiles"
                            name="scanType"
                            value="personalFiles"
                            checked={selectedScanType === "personalFiles"}
                            onChange={handleScanTypeChange}
                            className="text-green-500 cursor-pointer"
                        />
                        <label htmlFor="personalFiles" className="ml-2 text-white">Fichiers</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="passwords"
                            name="scanType"
                            value="passwords"
                            checked={selectedScanType === "passwords"}
                            onChange={handleScanTypeChange}
                            className="text-green-500 cursor-pointer"
                        />
                        <label htmlFor="passwords" className="ml-2 text-white">Password</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="apiKeys"
                            name="scanType"
                            value="apiKeys"
                            checked={selectedScanType === "apiKeys"}
                            onChange={handleScanTypeChange}
                            className="text-green-500 cursor-pointer"
                        />
                        <label htmlFor="apiKeys" className="ml-2 text-white">Clés API</label>
                    </div>
                </div>

                {/* Boutons */}
                <div className="mt-4 flex space-x-2">
                    <button
                        onClick={scanSensitiveData}
                        disabled={isScanning}
                        className={`${isScanning ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-white flex items-center justify-center w-full py-2 rounded cursor-pointer`}
                    >
                        {isScanning ? "Scan en cours..." : "Scanner"}
                    </button>
                    <button
                        onClick={clearConsole}
                        className="bg-red-500 hover:bg-red-700 text-white flex items-center justify-center w-full py-2 rounded cursor-pointer"
                    >
                        Effacer
                    </button>
                </div>
            </div>

            {/* Message si toutes les données sont protégées */}
            {isProtected && (
                <div className="mt-8 text-5xl text-green-500 flex items-center">
                    <span>✔</span>
                    <p style={{ fontSize: "18px" }} className="mt-2 ml-2">Vos données sont protégées !</p>
                </div>
            )}
        </div>
    );
};

export default ConsoleData;



