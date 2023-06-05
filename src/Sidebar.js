import React, { useState, useEffect } from "react";
import './Sidebar.css';
import Select from 'react-select';
import graph_data from "./data.json";


// Data Types
const options = graph_data.data_type;
const options2 = graph_data.visualization_technique;

const options2_domains = graph_data.visualization_technique_domains;
const options2_domains_multiselect = graph_data.visualization_technique_domains_multiselect;

const options3 = graph_data.visualization_tool;

function Sidebar({ sendOptions, sendToggleEdges, sendToggleCluster}) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleSidebar() {
        setIsOpen(!isOpen);
    }

    function callsendOptions(changed, value) {
        // value 1: data type change,
        // value 2: visualization technique change
        // value 3: visualization tool change
        console.log(changed)
        if (value == 1) {
            sendOptions([...changed, ...selectedOptions2.map((item) => ({ value: item, label: item })), ...selectedOptions3.map((item) => ({ value: item, label: item }))])
        } else if (value == 2) {
            sendOptions([...selectedOptions.map((item) => ({ value: item, label: item })), ...changed, ...selectedOptions3.map((item) => ({ value: item, label: item }))])
        } else if (value == 3) {
            sendOptions([...selectedOptions.map((item) => ({ value: item, label: item })), ...selectedOptions2.map((item) => ({ value: item, label: item })), ...changed])
        }

    }
    //================
     // Data Types
    // Used specifically to show what is selected on the multiselect
    const [selectedOptions, setSelectedOptions] = useState([]);
    // select all state
    const [selectAllState, setSelectAllState] = useState(false);
    const [toggleEdgesState, setToggleEdgesState] = useState(false);
    useEffect(() => {
        if (selectAllState == true) {
            setSelectedOptions(options.map((option) => option.value));
            callsendOptions(options, 1)
        }
        else {
            setSelectedOptions([]);
            // It immediately hides all for this
            callsendOptions([], 1)
        }
    }, [selectAllState]);

    const handleSelectAll = () => {
        setSelectAllState(!selectAllState)
    };

    function handleSelectChange(selectedOptions) {
        setSelectedOptions(selectedOptions.map((option) => option.value));
        callsendOptions(selectedOptions, 1)
    }

    // Handle toggle edges of same category
    function handleToggleEdges() {
        setToggleEdgesState(!toggleEdgesState)
        sendToggleEdges(["data_type", toggleEdgesState])
    }
    //===================


    // Visualization Techniques
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [selectAllState2, setSelectAllState2] = useState(false);
    const [toggleEdgesState2, setToggleEdgesState2] = useState(false);
    const [toggleClusterState2, setToggleClusterState2] = useState(false);

    const [selectedOptions2Domain, setSelectedOptions2Domain] = useState([]);

    useEffect(() => {
        if (selectAllState2 == true) {
            setSelectedOptions2((options2.flatMap(tool => tool.options)).map((option) => option.value));
            callsendOptions(options2.flatMap(tool => tool.options), 2)
        }
        else {
            setSelectedOptions2([]);
            // It immediately hides all for this
            callsendOptions([], 2)
        }
    }, [selectAllState2]);

    const handleSelectAll2 = () => {
        setSelectAllState2(!selectAllState2)
    };

    function handleSelectChange2(selectedOptions2) {
        setSelectedOptions2(selectedOptions2.map((option) => option.value));
        callsendOptions(selectedOptions2, 2)
    }

    function handleSelectChange2Domains(selectedOptions2Domain) {
        setSelectedOptions2Domain(selectedOptions2Domain.map((option) => option.value));
        // Get visualization techniques for each domain (can have duplicates)
        const matchedLabels = selectedOptions2Domain.map(obj => obj.label);
        const matchedValues = [];
        matchedLabels.forEach(label => {
            if (options2_domains.hasOwnProperty(label)) {
                matchedValues.push(...options2_domains[label]);
            }
        });
        // Merge with selected visualization techniques
        const merged = [...(new Set([...matchedValues, ...selectedOptions2]))];
        setSelectedOptions2([...merged.map((option) => option)]);
        callsendOptions([...merged.map((item) => ({ value: item, label: item }))], 2)
    }

    // Handle toggle edges of same category
    function handleToggleEdges2() {
        setToggleEdgesState2(!toggleEdgesState2)
        sendToggleEdges(["visualization_technique", toggleEdgesState2])
    }

    // Handle clustering options
    function handleToggleCluster2() {
        setToggleClusterState2(!toggleClusterState2)
    }

    //===================
    // Visualization Tools
    const [selectedOptions3, setSelectedOptions3] = useState([]);
    const [selectAllState3, setSelectAllState3] = useState(false);
    const [toggleEdgesState3, setToggleEdgesState3] = useState(false);
    const [toggleClusterState3, setToggleClusterState3] = useState(false);

    useEffect(() => {
        if (selectAllState3== true) {
            setSelectedOptions3((options3.flatMap(tool => tool.options)).map((option) => option.value));
            callsendOptions(options3.flatMap(tool => tool.options), 3)
        }
        else {
            setSelectedOptions3([]);
            // It immediately hides all for this
            callsendOptions([], 3)
        }
    }, [selectAllState3]);

    const handleSelectAll3 = () => {
        setSelectAllState3(!selectAllState3)
    };

    function handleSelectChange3(selectedOptions3) {
        setSelectedOptions3(selectedOptions3.map((option) => option.value));
        callsendOptions(selectedOptions3, 3)
    }

    // Handle toggle edges of same category
    function handleToggleEdges3() {
        setToggleEdgesState3(!toggleEdgesState3)
        sendToggleEdges(["visualization_tool", toggleEdgesState3])
    }

    // Handle clustering options
    useEffect(() => {
        sendToggleCluster([toggleClusterState2, toggleClusterState3])
    }, [toggleClusterState2, toggleClusterState3]);

    function handleToggleCluster3() {
        setToggleClusterState3(!toggleClusterState3)
    }

    const ReactSelectStyles = () => ({
        multiValueLabel: (styles: any) => ({
            ...styles,
            whiteSpace: "normal",
            fontSize: '10px',
        }),
    })


    return (
        <div>
            <button className="button" onClick={toggleSidebar}>Graph Options</button>

            <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <div className="sidebar-content">
                    <br></br>
                    <br></br>
                    <hr></hr>
                <p className="title" > Choose data type(s)</p>
                    <hr></hr>
                    <Select
                        options={options}
                        isMulti={true}
                        isSearchable={true}
                        placeholder="Select or search for data type(s)"
                        value={selectedOptions.map((item) => ({ value: item, label: item }))}
                        onChange={handleSelectChange}
                        styles={ReactSelectStyles()}
                />
                <br></br>
                <label className="checkbox" >
                        <input type="checkbox" checked={selectedOptions.length === options.length} onChange={handleSelectAll} />
                    Select All
                </label>
                <label className="checkbox" >
                    <input type="checkbox" checked={toggleEdgesState} onChange={handleToggleEdges} />
                    Display Edges Between Data Types
                </label>
                <br></br>
                <hr></hr>
                <p className="title" > Choose visualization technique(s)</p>
                    <hr></hr>
                    <Select
                    options={options2}
                    isMulti={true}
                    isSearchable={true}
                    placeholder="Select or search for visualization technique(s)"
                    value={selectedOptions2.map((item) => ({ value: item, label: item }))}
                    onChange={handleSelectChange2}
                    styles={ReactSelectStyles()}
                    />
                    <Select
                        options={options2_domains_multiselect}
                        isMulti={true}
                        isSearchable={true}
                        placeholder="Select visualization technique(s) by domain"
                        value={selectedOptions2Domain.map((item) => ({ value: item, label: item }))}
                        onChange={handleSelectChange2Domains}
                        styles={ReactSelectStyles()}
                    />

                <br></br>
                <label className="checkbox" >
                        <input type="checkbox" checked={selectedOptions2.length === (options2.flatMap(tool => tool.options)).map((option) => option.value).length} onChange={handleSelectAll2} />
                    Select All
                    </label>
                    <label className="checkbox" >
                        <input type="checkbox" checked={toggleEdgesState2} onChange={handleToggleEdges2} />
                        Display Edges Between Visualization Techniques
                    </label>
                    <label className="checkbox" >
                        <input type="checkbox" checked={toggleClusterState2} onChange={handleToggleCluster2} />
                        Cluster Groups
                    </label>
                    <br></br>
                    <hr></hr>
                <p className="title"> Choose visualization tool(s)</p>
                    <hr></hr>
                    <Select
                    options={options3}
                    isMulti={true}
                    isSearchable={true}
                    placeholder="Select or search for visualization tool(s)"
                    value={selectedOptions3.map((item) => ({ value: item, label: item }))}
                        onChange={handleSelectChange3}
                        styles={ReactSelectStyles()}
                />

                <br></br>
                <label className="checkbox" >
                        <input type="checkbox" checked={selectedOptions3.length === (options3.flatMap(tool => tool.options)).map((option) => option.value).length} onChange={handleSelectAll3} />
                    Select All
                    </label>
                    <label className="checkbox" >
                        <input type="checkbox" checked={toggleEdgesState3} onChange={handleToggleEdges3} />
                        Display Edges Between Visualization Tools
                    </label>
                    <label className="checkbox" >
                        <input type="checkbox" checked={toggleClusterState3} onChange={handleToggleCluster3} />
                        Cluster Groups
                    </label>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
            </div>
        </div>
    );
}

export default Sidebar;
