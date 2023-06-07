import React, { useRef, useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import './Infobar.css';
import graph_data from "./data.json";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';


function Infobar({ selectedItems2 }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isGlow, setGlow] = useState(false);
    const [clickContent, setClickContent] = useState(false);
    const [assessmentContent, setAssessmentContent] = useState(false);
    const [assessmentContent2, setAssessmentContent2] = useState(false);

    // Maintain state of data from Excel Sheet
    const [paperData, setPaperData] = useState([]);
    const [assessmentData, setAssessmentData] = useState([]);

    const toolRequirements = graph_data.assessment_data.Unity3D;
    const requirementNames = Object.keys(toolRequirements)
    const requirementDefinitions = graph_data.requirements_and_challenges[0];
    console.log(requirementDefinitions)

    const visualization_tools = graph_data.visualization_tool.reduce((values, category) => {
        const categoryValues = category.options.map(option => option.value);
        return [...values, ...categoryValues];
    }, []);

    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }


    // Component to render a table row using the ratings of a specific tool
    const ToolTableRow = ({ toolName }) => {
        // Retrieve the ratings for the specific tool
        const ratings = assessmentData[toolName];

        // Extract the ratings as an array
        const ratingValues = Object.values(ratings).map(data => data.Rating);
        const URLs = Object.values(ratings).map(data => data.URL);
        const descriptions = Object.values(ratings).map(data => data.Description);

        return (
            <tr>
                <td>Rating</td>
                {ratingValues.map((rating, index) => (
                    <td key={index}>
                        <Tooltip TransitionComponent={Zoom}
                            title={descriptions[index]}>
                            <p className="tooltip_marker">
                                {isValidURL(URLs[index]) ? (
                                    <a href={URLs[index]} target="_blank">{rating}</a>
                                ) : (
                                    rating
                                )}
                            </p>
                        </Tooltip>
                    </td>
                ))}
            </tr>
        );
    };

    //============
    //===========

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
                setAssessmentData(graph_data.assessment_data);

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
        // Clicked a node or edge
        if (selectedItems2[0] == "node" | selectedItems2[0] == "edge") {
            // Check if node or edge
            if (selectedItems2[0] == "node") {
                // Node, display paper and assessment data
                setAssessmentContent(true);
                if (visualization_tools.includes(selectedItems2[1])) {
                    console.log("TRUE")
                    setAssessmentContent2(true);
                } else {
                    setAssessmentContent2(false);
                    console.log("FALSE")
                }

            } else if (selectedItems2[0] == "edge") {
                // Edge, display paper data
                setAssessmentContent(false);
                setAssessmentContent2(false);

            } else {
                setAssessmentContent(false);
                setAssessmentContent2(false);
            }
            setClickContent(true);
        }

        // Anything else clicked
        else {
            setClickContent(false);
            setAssessmentContent(false);
            setAssessmentContent2(false);
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
                                                <th>Domain(s)</th>
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
                                                            <td>{row[paperData[0].indexOf('Domain(s)')]}</td>
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
                                                <th>Domain(s)</th>
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
                                                            <td>{row[paperData[0].indexOf('Domain(s)')]}</td>
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
                        {assessmentContent && assessmentContent2 ? (
                            <div><hr></hr><h1>Assessment for {selectedItems2[1]} on digital twin requirements and challenges:</h1><hr></hr>
                                <table>
                                    <thead>
                                        <tr className="result-row">
                                            <th >Requirement <br></br>or Challenge</th>
                                            {requirementNames.map((requirementName) => (
                                                <th className="rotated-header"
                                                    key={requirementName}>
                                                    <Tooltip TransitionComponent={Zoom}
                                                        title={requirementDefinitions[requirementName]}>
                                                        <p className="tooltip_marker"> {requirementName} </p>
                                                    </Tooltip>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <ToolTableRow toolName={selectedItems2[1]} />
                                    </tbody>
                                </table>
                                <br></br>
                                <p>Hover over the ratings for a full description. Click on the rating (where possible) for source information.</p>
                                <div className="legend_container">
                                    <Tooltip className="legend_item" TransitionComponent={Zoom}
                                        title={graph_data.assessment[0].Suitable}>
                                        <p className="tooltip_marker">(+) Suitable</p>
                                    </Tooltip>
                                    <Tooltip className="legend_item" TransitionComponent={Zoom}
                                        title={graph_data.assessment[0]["Moderately Suitable"]}>
                                        <p className="tooltip_marker">(+/-) Moderately Suitable</p>
                                    </Tooltip>
                                    <Tooltip className="legend_item" TransitionComponent={Zoom}
                                        title={graph_data.assessment[0]["Unsuitable"]}>
                                        <p className="tooltip_marker">(-) Unsuitable</p>
                                    </Tooltip>
                                    <Tooltip className="legend_item" TransitionComponent={Zoom}
                                        title={graph_data.assessment[0]["Blank"]}>
                                        <p className="tooltip_marker">( ) Blank</p>
                                    </Tooltip>
                                </div>
                            </div>
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
