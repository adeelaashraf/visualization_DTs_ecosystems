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

    return (
        <div className="App">
            <Graph selectedItems={selectedItems} />
            <Sidebar onChange={handleMultiselectChange} />
            <Infobar />
        </div>
    );
}

export default App;
