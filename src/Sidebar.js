import React, { useState, useEffect } from "react";
import './Sidebar.css';
import Select from 'react-select';

// Data Types
const data_types = ['Abiotic Data', 'Behavioural Data', 'Biotic data', 'Geometric Data', 'Historical Data', 'Landscape data', 'Metadata', 'Process Data', 'Sensor data', 'Simulation Data'];
const vis_tech = ['3D Geometric Modeling', 'Augmented Reality', 'Bar Plot', 'Bathymetrical Map', 'Block Chart', 'Box Plot', 'Dashboard Visualization', 'Data Visualization', 'Diagram', 'Diel Plot', 'Heat Map', 'Histogram', 'Line Graph', 'Network Graph', 'Pie Chart', 'Radar Plot', 'Raster Map', 'Rose Plot', 'Sammon Map', 'Stacked Bar Plot', 'Virtual Reality'];
const vis_tool = ['.NET', 'ARCGIS', 'Autodesk Forge', 'Autodesk Revit', 'Backbone', 'Blender', 'Bootstrap', 'COVISE', 'CityEngine', 'Creo', 'D3.js', 'Grafana', 'JQuery', 'Javascript', 'Jupyter Notebook', 'OpenScene Graph', 'Python', 'R', 'Three.js', 'Unity3D', 'Unreal Engine', 'VTK', 'Verge3D', 'WebGL', 'WebXR', 'Wikitude', 'jsPanel'];


const options = data_types.map((option) => ({
    value: option,
    label: option,
}));

const options2 = vis_tech.map((option) => ({
    value: option,
    label: option,
}));

const options3 = vis_tool.map((option) => ({
    value: option,
    label: option,
}));

function Sidebar({onChange}) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleSidebar() {
        setIsOpen(!isOpen);
    }

    function callOnChange(changed, value) {
        // value 1: data type change,
        // value 2: visualization technique change
        // value 3: visualization tool change
        if (value == 1) {
            onChange([...changed, ...selectedOptions2.map((item) => ({ value: item, label: item })), ...selectedOptions3.map((item) => ({ value: item, label: item }))])
        } else if (value == 2) {
            onChange([...selectedOptions.map((item) => ({ value: item, label: item })), ...changed, ...selectedOptions3.map((item) => ({ value: item, label: item }))])
        } else if (value == 3) {
            onChange([...selectedOptions.map((item) => ({ value: item, label: item })), ...selectedOptions2.map((item) => ({ value: item, label: item })), ...changed])
        }

    }
    //================
     // Data Types
    // Used specifically to show what is selected on the multiselect
    const [selectedOptions, setSelectedOptions] = useState([]);
    // select all state
    const [checkboxState, setCheckboxState] = useState(false);
        useEffect(() => {
            if (checkboxState == true) {
                setSelectedOptions(options.map((option) => option.value));
                callOnChange(options, 1)
            }
            else {
                setSelectedOptions([]);
                // It immediately hides all for this
                callOnChange([], 1)
            }
        }, [checkboxState]);

        const handleSelectAll = () => {
            setCheckboxState(!checkboxState)
        };

        function handleSelectChange(selectedOptions) {
            setSelectedOptions(selectedOptions.map((option) => option.value));
            callOnChange(selectedOptions, 1)
        }
    //===================


    // Visualization Techniques
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    // select all state
    const [checkboxState2, setCheckboxState2] = useState(false);
    useEffect(() => {
        if (checkboxState2 == true) {
            setSelectedOptions2(options2.map((option) => option.value));
            callOnChange(options2, 2)
        }
        else {
            setSelectedOptions2([]);
            // It immediately hides all for this
            callOnChange([], 2)
        }
    }, [checkboxState2]);

    const handleSelectAll2 = () => {
        setCheckboxState2(!checkboxState2)
    };

    function handleSelectChange2(selectedOptions2) {
        setSelectedOptions2(selectedOptions2.map((option) => option.value));
        callOnChange(selectedOptions2, 2)
    }

    //===================
    // Visualization Tools
    const [selectedOptions3, setSelectedOptions3] = useState([]);
    const [checkboxState3, setCheckboxState3] = useState(false);
    useEffect(() => {
        if (checkboxState3== true) {
            setSelectedOptions3(options3.map((option) => option.value));
            callOnChange(options3, 3)
        }
        else {
            setSelectedOptions3([]);
            // It immediately hides all for this
            callOnChange([], 3)
        }
    }, [checkboxState3]);

    const handleSelectAll3 = () => {
        setCheckboxState3(!checkboxState3)
    };

    function handleSelectChange3(selectedOptions3) {
        setSelectedOptions3(selectedOptions3.map((option) => option.value));
        callOnChange(selectedOptions3, 3)
    }


    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <button onClick={toggleSidebar}>Graph Options</button>
            <div className="sidebar-content">
                <br></br>
                <p className="title" > Choose data type(s)</p>
                <Select
                    options={options}
                    isMulti={true}
                    isSerachable={true}
                    placeholder="Select or search for data type(s)"
                    value={selectedOptions.map((item) => ({ value: item, label: item }))}
                    onChange={handleSelectChange}
                />
                <br></br>
                <label className="checkbox" >
                    <input type="checkbox" checked={selectedOptions.length === options.length} onChange={handleSelectAll} />
                    Select All
                </label>
                <br></br>
                <p className="title" > Choose visualization technique(s)</p>
                <Select
                    options={options2}
                    isMulti={true}
                    isSerachable={true}
                    placeholder="Select or search for visualization technique(s)"
                    value={selectedOptions2.map((item) => ({ value: item, label: item }))}
                    onChange={handleSelectChange2}
                />

                <br></br>
                <label className="checkbox" >
                    <input type="checkbox" checked={selectedOptions2.length === options2.length} onChange={handleSelectAll2} />
                    Select All
                </label>
                <br></br>
                <p className="title"> Choose visualization tool(s)</p>
                <Select
                    options={options3}
                    isMulti={true}
                    isSerachable={true}
                    placeholder="Select or search for visualization tool(s)"
                    value={selectedOptions3.map((item) => ({ value: item, label: item }))}
                    onChange={handleSelectChange3}
                />

                <br></br>
                <label className="checkbox" >
                    <input type="checkbox" checked={selectedOptions3.length === options3.length} onChange={handleSelectAll3} />
                    Select All
                </label>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}

export default Sidebar;
