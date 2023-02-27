import React, { useState } from "react";
import './Sidebar.css';
import Select from 'react-select';

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
];

const options2 = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
];

const options3 = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
];

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
                <div>
                    <Select
                        options={options}
                        isMulti={true}
                        isSerachable={true}
                        placeholder="Select or search for data type(s)"
                        value={selectedOptions}
                        onChange={handleOptionChange}
                    />
                    <label>
                        <input type="checkbox" checked={selectedOptions.length === options.length} onChange={handleSelectAll} />
                        Select All
                    </label>
                    <Select
                        options={options2}
                        isMulti={true}
                        isSerachable={true}
                        placeholder="Select or search for visualization technique(s)"
                        value={selectedOptions2}
                        onChange={handleOptionChange2}
                    />
                    <label>
                        <input type="checkbox" checked={selectedOptions2.length === options2.length} onChange={handleSelectAll2} />
                        Select All
                    </label>
                    <Select
                        options={options3}
                        isMulti={true}
                        isSerachable={true}
                        placeholder="Select or search for visualization tool(s)"
                        value={selectedOptions3}
                        onChange={handleOptionChange3}
                    />
                    <label>
                        <input type="checkbox" checked={selectedOptions3.length === options3.length} onChange={handleSelectAll3} />
                        Select All
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
