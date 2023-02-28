import React, { useState } from "react";
import './Sidebar.css';
import Select from 'react-select';

// Data Types
const data_types = ['Abiotic Data', 'Behavioural Data', 'Biotic data', 'Geometric Data', 'Historical Data', 'Landscape data', 'Metadata', 'Process Data', 'Sensor data', 'Simulation Data'];
const vis_tech = ['3D Geometric Modeling', 'Augmented Reality', 'Bar Plot', 'Bathymetrical Map', 'Block Chart', 'Box Plot', 'Dashboard Visualization', 'Data Visualization', 'Diagram', 'Diel Plot', 'Heat Map', 'Histogram', 'Line Graph', 'Network Graph', 'Pie Chart', 'Radar Plot', 'Raster Map', 'Rose Plot', 'Sammon Map', 'Stacked Bar Plot', 'Virtual Reality'];
const vis_tool = ['.NET', 'ARCGIS', 'Autodesk Forge', 'Autodesk Revit', 'Backbone', 'Blender', 'Bootstrap', 'COVISE', 'CityEngine', 'Creo', 'D3.js', 'Grafana', 'JQuery', 'Javascript', 'Jupyter Notebook', 'OpenScene Graph', 'Python', 'R', 'Three.js', 'Unity3D', 'Unreal Engine', 'Verge3D', 'WebGL', 'WebXR', 'Wikitude', 'jsPanel'];


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

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);


    function toggleSidebar() {
        setIsOpen(!isOpen);
    }

    // Data Types
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleSelectAll = () => {
        setSelectedOptions(options);
    };
    const handleOptionChange = (selected) => {
        setSelectedOptions(selected);
    };

    // Visualization Techniques
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const handleSelectAll2 = () => {
        setSelectedOptions2(options2);
    };
    const handleOptionChange2 = (selected2) => {
        setSelectedOptions2(selected2);
    };

    // Visualization Tools
    const [selectedOptions3, setSelectedOptions3] = useState([]);
    const handleSelectAll3 = () => {
        setSelectedOptions3(options3);
    };
    const handleOptionChange3 = (selected3) => {
        setSelectedOptions3(selected3);
    };


    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <button onClick={toggleSidebar}>Graph Options</button>
            <div className="sidebar-content">
                    <br></br>
                    <Select
                        options={options}
                        isMulti={true}
                        isSerachable={true}
                        placeholder="Select or search for data type(s)"
                        value={selectedOptions}
                        onChange={handleOptionChange}
                    />
                    <br></br>
                    <label class="select_all" >
                        <input type="checkbox" checked={selectedOptions.length === options.length} onChange={handleSelectAll} />
                        Select All
                    </label>
                    <br></br>
                    <Select
                        options={options2}
                        isMulti={true}
                        isSerachable={true}
                        placeholder="Select or search for visualization technique(s)"
                        value={selectedOptions2}
                        onChange={handleOptionChange2}
                    />

                    <br></br>
                    <label class="select_all" >
                        <input type="checkbox" checked={selectedOptions2.length === options2.length} onChange={handleSelectAll2} />
                        Select All
                    </label>
                    <br></br>

                    <Select
                        options={options3}
                        isMulti={true}
                        isSerachable={true}
                        placeholder="Select or search for visualization tool(s)"
                        value={selectedOptions3}
                        onChange={handleOptionChange3}
                    />

                    <br></br>
                    <label class="select_all" >
                        <input type="checkbox" checked={selectedOptions3.length === options3.length} onChange={handleSelectAll3} />
                        Select All
                    </label>
                    <br></br>
            </div>
        </div>
    );
}

export default Sidebar;
