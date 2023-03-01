import './App.css';
import Graph from './Graph';
import Sidebar from "./Sidebar";
import Infobar from "./Infobar";
import React, { useState } from 'react';

function App() {
    const [selectedItems, setSelectedItems] = useState([]);
    function handleMultiselectChange(selectedItems) {
        setSelectedItems(selectedItems);
    }

    const [selectedItems2, setSelectedItems2] = useState([]);
    function handleMultiselectChange2(selectedItems2) {
        setSelectedItems2(selectedItems2);
    }


    return (
        <div className="App">
            <Graph selectedItems={selectedItems} onChange2={handleMultiselectChange2} />
            <Sidebar onChange={handleMultiselectChange} />
            <Infobar selectedItems2={selectedItems2} />
        </div>
    );
}

export default App;
