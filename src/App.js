import './App.css';
import Graph from './Graph';
import Sidebar from "./Sidebar";
import Infobar from "./Infobar";
import React, { useState } from 'react';

function App() {
    return (
        <div className="App">
            <Graph />
            <Sidebar />
            <Infobar />


        </div>
    );
}

export default App;
