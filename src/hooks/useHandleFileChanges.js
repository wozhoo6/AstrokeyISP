import { useState } from 'react';
export default function useHandleFileChanges() {
    const [lines, setLines] = useState([]);
    const [files, setFiles] = useState([]);
    const [data, setData] = useState([]); // ✅ fixed: useState for data
    const [fileInputKey, setFileInputKey] = useState(0); // to reset file input


    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const txtFiles = selectedFiles.filter(file => file.type === "text/plain" || file.name.endsWith(".txt"));

        if (txtFiles.length !== selectedFiles.length) {
            alert("Only .txt files are allowed!");
        }

        // store only txt files
        setFiles(txtFiles);
    };

    const processFiles = () => {
        setLines([]); // reset before processing



        files.forEach((file) => {
            file.text().then((text) => {

                const fileLines = text.split(/\r?\n/);

                const filteredLines = filterLines(fileLines); // ✅ filter lines
                // ✅ find client
                const clientLine = fileLines.find((line) => line.includes("Client"));
                if (!clientLine) {
                    alert("Skipping invalid file:" + file.name);
                    return; // this just skips processing this file
                }

                const client = clientLine.split(":")[1].trim().toUpperCase();

                // ✅ structure: { client: "Volo", entries: [ [...lines], [...lines] ] }
                setData((prevData) => {
                    const existingClient = prevData.find((c) => c.client === client);

                    if (existingClient) {
                        return prevData.map((c) =>
                            c.client === client
                                ? { ...c, entries: [...c.entries, filteredLines] }
                                : c
                        );
                    } else {
                        return [...prevData, { client, entries: [filteredLines] }];
                    }
                });

            });
        });

    };

    const filterLines = (fileLines) => {

        const exclude = ["Staff:", "Client:", "Date of Call:",]

        const resolvedLine = fileLines.find(line => line.includes("Resolved:"));
        const callTypeLine = fileLines.find(line => line.includes("Call Type:"));

        const isOutageCall = callTypeLine.split(":")[1].trim().toLowerCase() === "outage";
        const isResolved = resolvedLine.split(":")[1].trim().toLowerCase() === "yes";

        console.log("isOutageCall:", isOutageCall);

        if (!isOutageCall) {
            exclude.push("Outage Type:", "Call Type:", "Assigned To:");
        }
        if (isResolved) {
            exclude.push("Next Step:", "Assigned To:", "Outage Type:", "Call Type:");
        }



        return fileLines.filter(line => !exclude.some(ex => line.includes(ex)));
    }


    const clearData = () => {
        setLines([]);
        setFiles([]);
        setData([]);
        setFileInputKey(prev => prev + 1);

    };

    return {
        handleFileChange,
        processFiles,
        clearData,
        lines,
        files,
        data,   // ✅ return data
        fileInputKey, // return key to reset input
    };
}