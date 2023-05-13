import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import './Infobar.css';


function Infobar({selectedItems2}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isGlow, setGlow] = useState(false);
    const [clickContent, setClickContent] = useState(false);
    const [assessmentContent, setAssessmentContent] = useState(false);

    // Maintain state of data from Excel Sheet
    const [paperData, setPaperData] = useState([]);
    const [assessmentData, setAssessmentData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const file = await fetch(process.env.PUBLIC_URL + '/data.xlsx');
            const blob = await file.blob();
            const reader = new FileReader();
            reader.onload = () => {
                const wb = XLSX.read(reader.result, { type: 'binary' });
 
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                console.log(wsname);
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                setPaperData(data);

                const wsname2 = wb.SheetNames[1];
                const ws2 = wb.Sheets[wsname2];
                const data2 = XLSX.utils.sheet_to_json(ws2, { header: 1 });
                setAssessmentData(data2);
            };
            reader.readAsBinaryString(blob);
        };

        fetchData();
    }, []);

    function toggleInfobar() {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        setGlow(true);
        // Reset the glow effect after some time
        setTimeout(() => setGlow(false), 100);
        console.log(selectedItems2);
        // Clicked a node or edge
        if (selectedItems2[0] == "node" | selectedItems2[0] == "edge") {
            // Check if node or edge
            if (selectedItems2[0] == "node") {
                // Node, display paper and assessment data
                setAssessmentContent(true);
            } else if (selectedItems2[0] == "edge") {
                // Edge, display paper data
                setAssessmentContent(false);

            } else {
                setAssessmentContent(false);
			}
            setClickContent(true);
        }

        // Anything else clicked
        else {
            setClickContent(false);
            setAssessmentContent(false);
        }
        setTimeout(1000);

    }, [selectedItems2]);

    return (
        <div>
            <button className={isGlow ? "button2_glow" : "button2"} onClick={toggleInfobar}>Graph Data</button>
            <div className={`infobar ${isOpen ? "open" : "closed"}`}>
                <div className="infobar_content">
                    <div className="infobar_content_element">

                        {clickContent ? ( // Clicked a node or edge
                            assessmentContent ? (// Clicked node
                                <div>
                                    <hr></hr><h1>Paper(s) containing {selectedItems2[1]}:</h1><hr></hr>
                                    <table>
                                        <thead>
                                            <tr>

                                            </tr>
                                            <tr>
                                                <th>No.</th>
                                                <th>Author(s)</th>
                                                <th>Year</th>
                                                <th>DOI</th>
                                                <th>Title</th>
                                                <th>URL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paperData.reduce((filteredRows, row, index) => {
                                                const columnName = selectedItems2[1]; // Replace with your column name
                                                const noColumn = 'No.'; // Replace with your 'No.' column header
                                                const columnIdx = paperData[0].indexOf(columnName);
                                                const noColumnIdx = paperData[0].indexOf(noColumn);
                                                const shouldIncludeRow = row[columnIdx] === 'x' && row[noColumnIdx];

                                                if (shouldIncludeRow) {
                                                    const rowNumber = filteredRows.length + 1; // Calculate row number

                                                    const url = row[paperData[0].indexOf('URL')];
                                                    const shortenedUrl = url ? (url.slice(0, 20) + '...') : ''; // Shorten the URL to the first 20 characters if it exists, otherwise set empty string                                                   // const clickableUrl = <a href={url} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>; // Wrap the shortened URL with an anchor tag
                                                    const clickableUrl = url ? (
                                                        <a href={url} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
                                                    ) : null; // Wrap the shortened URL with an anchor tag and set target="_blank" only if URL exists


                                                    const doi = row[paperData[0].indexOf('DOI')];
                                                    const shortenedDoi = doi ? (doi.slice(0, 20) + '...') : '';
                                                    const clickableDoi = doi ? (
                                                        <a href={doi} target="_blank" rel="noopener noreferrer">{shortenedDoi}</a>
                                                    ) : null; // Wrap the shortened URL with an anchor tag and set target="_blank" only if URL exists


                                                    filteredRows.push(
                                                        <tr key={index} className="result-row">
                                                            <td>{rowNumber}</td>
                                                            <td>{row[paperData[0].indexOf('Author(s)')]}</td>
                                                            <td>{row[paperData[0].indexOf('Year')]}</td>
                                                            <td>{clickableDoi}</td>
                                                            <td>{row[paperData[0].indexOf('Title')]}</td>
                                                            <td>{clickableUrl}</td>
                                                        </tr>
                                                    );
                                                }

                                                return filteredRows;
                                            }, [])}
                                        </tbody>
                                    </table>
                                </div>
                            ) : ( // Clicked edge
                                <div>
                                    <hr></hr><h1>Paper(s) containing {selectedItems2[1]} and {selectedItems2[2]}:</h1><hr></hr>
                                    <table>
                                        <thead>
                                            <tr>

                                            </tr>
                                            <tr>
                                                <th>No.</th>
                                                <th>Author(s)</th>
                                                <th>Year</th>
                                                <th>DOI</th>
                                                <th>Title</th>
                                                <th>URL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paperData.reduce((filteredRows, row, index) => {
                                                const columnName = selectedItems2[1]; // Replace with your column name
                                                const columnName2 = selectedItems2[2]; // Replace with your column name
                                                const noColumn = 'No.'; // Replace with your 'No.' column header
                                                const columnIdx = paperData[0].indexOf(columnName);
                                                const columnIdx2 = paperData[0].indexOf(columnName2);
                                                const noColumnIdx = paperData[0].indexOf(noColumn);
                                                const shouldIncludeRow = row[columnIdx] === 'x' && row[columnIdx2] === 'x' && row[noColumnIdx];

                                                if (shouldIncludeRow) {
                                                    const rowNumber = filteredRows.length + 1; // Calculate row number

                                                    const url = row[paperData[0].indexOf('URL')];
                                                    const shortenedUrl = url ? (url.slice(0, 20) + '...') : ''; // Shorten the URL to the first 20 characters if it exists, otherwise set empty string                                                   // const clickableUrl = <a href={url} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>; // Wrap the shortened URL with an anchor tag
                                                    const clickableUrl = url ? (
                                                        <a href={url} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
                                                    ) : null; // Wrap the shortened URL with an anchor tag and set target="_blank" only if URL exists


                                                    const doi = row[paperData[0].indexOf('DOI')];
                                                    const shortenedDoi = doi ? (doi.slice(0, 20) + '...') : '';
                                                    const clickableDoi = doi ? (
                                                        <a href={doi} target="_blank" rel="noopener noreferrer">{shortenedDoi}</a>
                                                    ) : null; // Wrap the shortened URL with an anchor tag and set target="_blank" only if URL exists

                                                    filteredRows.push(
                                                        <tr key={index} className="result-row">
                                                            <td>{rowNumber}</td>
                                                            <td>{row[paperData[0].indexOf('Author(s)')]}</td>
                                                            <td>{row[paperData[0].indexOf('Year')]}</td>
                                                            <td>{clickableDoi}</td>
                                                            <td>{row[paperData[0].indexOf('Title')]}</td>
                                                            <td>{clickableUrl}</td>
                                                        </tr>
                                                    );
                                                }

                                                return filteredRows;
                                            }, [])}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        ) : (
                            <div><h2>No node or edge selected. Please make a selection using the graph.</h2></div>
                        )}
                    </div>
                    <div className="infobar_content_element">
                        {assessmentContent ? (
                            <div>Clicked node for sure!.</div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Infobar;
