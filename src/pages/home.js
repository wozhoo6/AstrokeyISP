import React, { useState } from "react";
import useHandleFileChanges from "../hooks/useHandleFileChanges";
import "../home.css"; // Assuming you have some global styles

export default function Home() {

    const [separator, setSeparator] = useState("."); // default separator, can be changed later
    const repeatedSeparator = separator.repeat(17); // repeat the separator for display

    const {
        handleFileChange,
        processFiles, files,
        clearData, lines, data, fileInputKey
    }
        = useHandleFileChanges();




    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">AstroKeyISP</h1>

            <p className="mb-2">Enter custom separator (optional):</p>
            <input
                type="text"
                maxLength={3}  // only allow 1 character
                className="border p-2"
                onChange={(e) => setSeparator(e.target.value)}
            />


            <input
                key={fileInputKey} // reset input when files change
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                multiple
            />
            <div className="mt-4">
                {files.length > 0 && (
                    <div className="mb-4 p-3 border rounded bg-white shadow-sm">
                        <h2 className="font-semibold mb-2">Selected Files:</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="mt-4 flex gap-2">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    onClick={processFiles}
                    disabled={files.length === 0}
                >
                    Bounce na ako Boss
                </button>

                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={clearData}
                >
                    Clear
                </button>
            </div>

            {data && data.length > 0 && (
                <div className="mt-6" >
                    {data.map((clientData, i) => (
                        <div key={i} className="mb-6">
                            {/* Client Name */}
                            <h2 className="font-bold text-xl mb-4">{clientData.client}</h2>

                            {/* Entries */}
                            {clientData.entries.map((entry, j) => {
                                const isLastClient = i === data.length - 1;
                                const isLastEntry = j === clientData.entries.length - 1;
                                const isFirstEntry = j === 0;

                                return (
                                    <div key={j}>
                                        <pre className="whitespace-pre-wrap mb-4">
                                            {isFirstEntry ? "\n" : ""}
                                            {entry.join("\n")}
                                            {!isLastEntry
                                                ? "\n" + repeatedSeparator + "\n\n"
                                                : !isLastClient
                                                    ? "\n" + repeatedSeparator + repeatedSeparator + "\n\n"
                                                    : ""}
                                        </pre>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
}
