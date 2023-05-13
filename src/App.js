import './App.css';
import Graph from './Graph';
import Sidebar from "./Sidebar";
import Infobar from "./Infobar";
import React, { useState } from 'react';

function App() {
    // To send options from Sidebar to Graph
    const [selectedOptions, setSelectedOptions] = useState([]);
    function setSelectedOptionsFunction(selectedOptions) {
        setSelectedOptions(selectedOptions);
    }

    // To send toggled edges information from Sidebar to Graph
    const [toggleEdges, setToggleEdges] = useState([]);
    function setToggleEdgesFunction(toggleEdges) {
        setToggleEdges(toggleEdges);
    }

    // To send toggled cluster information from Sidebar to Graph
    const [toggleCluster, setToggleCluster] = useState([]);
    function setToggleClusterFunction(toggleCluster) {
        setToggleCluster(toggleCluster);
    }

    // To send clicked information from Graph to Infobar
    const [selectedItems2, setSelectedItems2] = useState([]);
    function handleMultiselectChange2(selectedItems2) {
        setSelectedItems2(selectedItems2);
    }

    return (
        <div className="App">
            <Graph selectedOptions={selectedOptions} onChange2={handleMultiselectChange2} toggleEdges={toggleEdges} toggleCluster={toggleCluster} />
            <Sidebar sendOptions={setSelectedOptionsFunction} sendToggleEdges={setToggleEdgesFunction} sendToggleCluster={setToggleClusterFunction} />
            <Infobar selectedItems2={selectedItems2} />
        </div>
    );
}

export default App;
