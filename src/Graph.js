import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";
import 'vis-network/styles/vis-network.css';
import './Graph.css';

const Graph = ({selectedItems, onChange2}) => {
    const [n, setN] = useState(null);
    const containerRef = useRef(null);
    var x = window.innerWidth / 2 + 70;
    var y = window.innerHeight / 2 + 30;
    var step = 70;
    const nodes = useMemo(() => (new DataSet([{ "color": "blue", "shape": "triangle", "size": 10, "id": "Historical Data" }, { "color": "blue", "shape": "triangle", "size": 10, "id": "Process Data" }, { "color": "blue", "shape": "triangle", "size": 10, "id": "Simulation Data" }, { "color": "blue", "shape": "triangle", "size": 10, "id": "Metadata" }, { "color": "purple", "shape": "triangle", "size": 10, "id": "Geometric Data" }, { "color": "purple", "shape": "triangle", "size": 10, "id": "Sensor data" }, { "color": "red", "shape": "triangle", "size": 10, "id": "Landscape data" }, { "color": "red", "shape": "triangle", "size": 10, "id": "Biotic data" }, { "color": "red", "shape": "triangle", "size": 10, "id": "Abiotic Data" }, { "color": "red", "shape": "triangle", "size": 10, "id": "Behavioural Data" }, { "color": "blue", "shape": "square", "size": 10, "id": "Augmented Reality" }, { "color": "blue", "shape": "square", "size": 10, "id": "Data Visualization" }, { "color": "purple", "shape": "square", "size": 10, "id": "3D Geometric Modeling" }, { "color": "purple", "shape": "square", "size": 10, "id": "Dashboard Visualization" }, { "color": "purple", "shape": "square", "size": 10, "id": "Virtual Reality" }, { "color": "red", "shape": "square", "size": 10, "id": "Diel Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Radar Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Histogram" }, { "color": "red", "shape": "square", "size": 10, "id": "Rose Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Sammon Map" }, { "color": "red", "shape": "square", "size": 10, "id": "Bar Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Line Graph" }, { "color": "red", "shape": "square", "size": 10, "id": "Raster Map" }, { "color": "red", "shape": "square", "size": 10, "id": "Heat Map" }, { "color": "red", "shape": "square", "size": 10, "id": "Bathymetrical Map" }, { "color": "red", "shape": "square", "size": 10, "id": "Pie Chart" }, { "color": "red", "shape": "square", "size": 10, "id": "Box Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Stacked Bar Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Network Graph" }, { "color": "red", "shape": "square", "size": 10, "id": "Block Chart" }, { "color": "red", "shape": "square", "size": 10, "id": "Diagram" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Grafana" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Verge3D" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Bootstrap" }, { "color": "blue", "shape": "dot", "size": 10, "id": "WebXR" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Autodesk Revit" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Autodesk Forge" }, { "color": "blue", "shape": "dot", "size": 10, "id": "OpenScene Graph" }, { "color": "blue", "shape": "dot", "size": 10, "id": "COVISE" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Three.js" }, { "color": "blue", "shape": "dot", "size": 10, "id": "WebGL" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Creo" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Wikitude" }, { "color": "purple", "shape": "dot", "size": 10, "id": "Unity3D" }, { "color": "red", "shape": "dot", "size": 10, "id": "Blender" }, { "color": "purple", "shape": "dot", "size": 10, "id": "JQuery" }, { "color": "red", "shape": "dot", "size": 10, "id": "jsPanel" }, { "color": "purple", "shape": "dot", "size": 10, "id": "Unreal Engine" }, { "color": "purple", "shape": "dot", "size": 10, "id": "Javascript" }, { "color": "red", "shape": "dot", "size": 10, "id": "Backbone" }, { "color": "red", "shape": "dot", "size": 10, "id": ".NET" }, { "color": "red", "shape": "dot", "size": 10, "id": "D3.js" }, { "color": "red", "shape": "dot", "size": 10, "id": "R" }, { "color": "red", "shape": "dot", "size": 10, "id": "Python" }, { "color": "red", "shape": "dot", "size": 10, "id": "Jupyter Notebook" }, { "color": "red", "shape": "dot", "size": 10, "id": "CityEngine" }, {
        "color": "red", "shape": "dot", "size": 10, "id": "ARCGIS"
    }, { id: "Data Type",
        color: "black",
        shape: "triangle",
        x: x,
        y: y,
        label: "Data Type",
        size: 10,
        fixed: true,
            physics: false,
        }, {
            id: "Visualization Technique",
            color: "black",
            shape: "square",
            x: x,
            y: y + step,
            label: "Visualization Technique",
            size: 10,
            fixed: true,
        physics: false,
        background: 'red',
        }, {
            id: "Visualization Tool",
            color: "black",
            shape: "dot",
            x: x,
            y: y + (2 * step),
            label: "Visualization Tool",
            size: 10,
            fixed: true,
            physics: false,
        }, {
            id: "Used with digital twin data",
            color: "blue",
            shape: "square",
            x: x,
            y: y + (3 * step),
            label: "Used with digital twin data",
            size: 10,
            fixed: true,
            physics: false,
        }, {
            id: "Used with ecosystem data",
            color: "red",
            shape: "square",
            x: x,
            y: y + (4 * step),
            label: "Used with ecosystem data",
            size: 10,
            fixed: true,
            physics: false,
        }, {
            id: "Used with digital twin\n and ecosystem data",
            color: "purple",
            shape: "square",
            x: x,
            y: y + (5 * step),
            label: "Used with digital twin\n and ecosystem data",
            size: 10,
            fixed: true,
            physics: false,
        }    ])), []);
    // Note: Make sure that conversion from JSON is compatible
    const edges = useMemo(() => (new DataSet([{ "color": "blue", "width": 3, "from": "Historical Data", "to": "Augmented Reality" }, { "color": "blue", "width": 5, "from": "Historical Data", "to": "3D Geometric Modeling" }, { "color": "blue", "width": 3, "from": "Historical Data", "to": "Virtual Reality" }, { "color": "blue", "width": 1, "from": "Historical Data", "to": "Data Visualization" }, { "color": "blue", "width": 3, "from": "Process Data", "to": "Augmented Reality" }, { "color": "blue", "width": 4, "from": "Process Data", "to": "Data Visualization" }, { "color": "blue", "width": 3, "from": "Process Data", "to": "Dashboard Visualization" }, { "color": "blue", "width": 4, "from": "Process Data", "to": "3D Geometric Modeling" }, { "color": "blue", "width": 3, "from": "Process Data", "to": "Virtual Reality" }, { "color": "blue", "width": 8, "from": "Simulation Data", "to": "3D Geometric Modeling" }, { "color": "blue", "width": 7, "from": "Simulation Data", "to": "Virtual Reality" }, { "color": "blue", "width": 2, "from": "Simulation Data", "to": "Data Visualization" }, { "color": "blue", "width": 3, "from": "Simulation Data", "to": "Augmented Reality" }, { "color": "blue", "width": 1, "from": "Simulation Data", "to": "Dashboard Visualization" }, { "color": "blue", "width": 1, "from": "Metadata", "to": "Augmented Reality" }, { "color": "blue", "width": 2, "from": "Metadata", "to": "3D Geometric Modeling" }, { "color": "blue", "width": 1, "from": "Metadata", "to": "Virtual Reality" }, { "color": "blue", "width": 5, "from": "Geometric Data", "to": "Augmented Reality" }, { "color": "purple", "width": 17, "from": "Geometric Data", "to": "3D Geometric Modeling" }, { "color": "purple", "width": 10, "from": "Geometric Data", "to": "Virtual Reality" }, { "color": "blue", "width": 5, "from": "Sensor data", "to": "Augmented Reality" }, { "color": "purple", "width": 10, "from": "Sensor data", "to": "3D Geometric Modeling" }, { "color": "purple", "width": 6, "from": "Sensor data", "to": "Dashboard Visualization" }, { "color": "purple", "width": 6, "from": "Sensor data", "to": "Virtual Reality" }, { "color": "blue", "width": 5, "from": "Sensor data", "to": "Data Visualization" }, { "color": "red", "width": 1, "from": "Sensor data", "to": "Raster Map" }, { "color": "red", "width": 1, "from": "Sensor data", "to": "Heat Map" }, { "color": "red", "width": 1, "from": "Sensor data", "to": "Bathymetrical Map" }, { "color": "red", "width": 4, "from": "Landscape data", "to": "3D Geometric Modeling" }, { "color": "red", "width": 2, "from": "Landscape data", "to": "Virtual Reality" }, { "color": "red", "width": 2, "from": "Landscape data", "to": "Heat Map" }, { "color": "red", "width": 1, "from": "Landscape data", "to": "Box Plot" }, { "color": "red", "width": 1, "from": "Landscape data", "to": "Raster Map" }, { "color": "red", "width": 1, "from": "Landscape data", "to": "Bathymetrical Map" }, { "color": "red", "width": 2, "from": "Biotic data", "to": "Heat Map" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Stacked Bar Plot" }, { "color": "red", "width": 3, "from": "Biotic data", "to": "Network Graph" }, { "color": "red", "width": 2, "from": "Biotic data", "to": "Box Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Diel Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Radar Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Histogram" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Rose Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Sammon Map" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Bar Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Line Graph" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "3D Geometric Modeling" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Dashboard Visualization" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Pie Chart" }, { "color": "red", "width": 1, "from": "Abiotic Data", "to": "Block Chart" }, { "color": "red", "width": 1, "from": "Abiotic Data", "to": "Diagram" }, { "color": "red", "width": 1, "from": "Behavioural Data", "to": "Heat Map" }, { "color": "red", "width": 1, "from": "Behavioural Data", "to": "Box Plot" }, { "color": "blue", "width": 6, "from": "Augmented Reality", "to": "Unity3D" }, { "color": "blue", "width": 1, "from": "Augmented Reality", "to": "Wikitude" }, { "color": "blue", "width": 1, "from": "Augmented Reality", "to": "Creo" }, { "color": "blue", "width": 6, "from": "Data Visualization", "to": "Unity3D" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "Verge3D" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "JQuery" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "Bootstrap" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "WebXR" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "Creo" }, { "color": "purple", "width": 10, "from": "3D Geometric Modeling", "to": "Unity3D" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "Verge3D" }, { "color": "purple", "width": 3, "from": "3D Geometric Modeling", "to": "JQuery" }, { "color": "blue", "width": 2, "from": "3D Geometric Modeling", "to": "Bootstrap" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "WebXR" }, { "color": "purple", "width": 2, "from": "3D Geometric Modeling", "to": "Unreal Engine" }, { "color": "blue", "width": 2, "from": "3D Geometric Modeling", "to": "Autodesk Revit" }, { "color": "blue", "width": 2, "from": "3D Geometric Modeling", "to": "Autodesk Forge" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "OpenScene Graph" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "COVISE" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "Wikitude" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "Three.js" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "WebGL" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "Creo" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "CityEngine" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "jsPanel" }, { "color": "purple", "width": 1, "from": "3D Geometric Modeling", "to": "Javascript" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "Backbone" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "ARCGIS" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "Blender" }, { "color": "blue", "width": 1, "from": "Dashboard Visualization", "to": "Grafana" }, { "color": "purple", "width": 3, "from": "Dashboard Visualization", "to": "Unity3D" }, { "color": "blue", "width": 1, "from": "Dashboard Visualization", "to": "Autodesk Revit" }, { "color": "blue", "width": 2, "from": "Dashboard Visualization", "to": "Autodesk Forge" }, { "color": "purple", "width": 1, "from": "Dashboard Visualization", "to": "Javascript" }, { "color": "blue", "width": 1, "from": "Dashboard Visualization", "to": "Creo" }, { "color": "red", "width": 1, "from": "Dashboard Visualization", "to": ".NET" }, { "color": "purple", "width": 8, "from": "Virtual Reality", "to": "Unity3D" }, { "color": "blue", "width": 2, "from": "Virtual Reality", "to": "Verge3D" }, { "color": "purple", "width": 2, "from": "Virtual Reality", "to": "JQuery" }, { "color": "blue", "width": 2, "from": "Virtual Reality", "to": "Bootstrap" }, { "color": "blue", "width": 2, "from": "Virtual Reality", "to": "WebXR" }, { "color": "blue", "width": 1, "from": "Virtual Reality", "to": "OpenScene Graph" }, { "color": "blue", "width": 1, "from": "Virtual Reality", "to": "COVISE" }, { "color": "blue", "width": 1, "from": "Virtual Reality", "to": "Creo" }, { "color": "purple", "width": 1, "from": "Virtual Reality", "to": "Unreal Engine" }, { "color": "red", "width": 1, "from": "Virtual Reality", "to": "CityEngine" }, { "color": "red", "width": 1, "from": "Diel Plot", "to": "R" }, { "color": "red", "width": 1, "from": "Radar Plot", "to": "R" }, { "color": "red", "width": 1, "from": "Histogram", "to": "R" }, { "color": "red", "width": 1, "from": "Rose Plot", "to": "R" }, { "color": "red", "width": 1, "from": "Sammon Map", "to": "R" }, { "color": "red", "width": 1, "from": "Bar Plot", "to": "Python" }, { "color": "red", "width": 1, "from": "Bar Plot", "to": "Jupyter Notebook" }, { "color": "red", "width": 1, "from": "Line Graph", "to": "Python" }, { "color": "red", "width": 1, "from": "Line Graph", "to": "Jupyter Notebook" }, { "color": "red", "width": 1, "from": "Raster Map", "to": "ARCGIS" }, { "color": "red", "width": 1, "from": "Heat Map", "to": "Python" }, { "color": "red", "width": 1, "from": "Heat Map", "to": "Jupyter Notebook" }, { "color": "red", "width": 1, "from": "Heat Map", "to": "R" }, { "color": "red", "width": 1, "from": "Heat Map", "to": "ARCGIS" }, { "color": "red", "width": 1, "from": "Bathymetrical Map", "to": "ARCGIS" }, { "color": "red", "width": 1, "from": "Pie Chart", "to": "Javascript" }, { "color": "red", "width": 1, "from": "Pie Chart", "to": "D3.js" }, { "color": "red", "width": 1, "from": "Pie Chart", "to": "R" }, { "color": "red", "width": 2, "from": "Box Plot", "to": "R" }, { "color": "red", "width": 1, "from": "Stacked Bar Plot", "to": "Python" }, { "color": "red", "width": 1, "from": "Stacked Bar Plot", "to": "Jupyter Notebook" }, { "color": "red", "width": 2, "from": "Network Graph", "to": "Python" }, { "color": "red", "width": 2, "from": "Network Graph", "to": "Jupyter Notebook" }, { "color": "red", "width": 1, "from": "Network Graph", "to": "R" }, { "color": "red", "width": 1, "from": "Block Chart", "to": "R" }, { "color": "red", "width": 1, "from": "Diagram", "to": "R" }])), []);

    //const nodes = new DataSet([{ "color": "blue", "shape": "triangle", "size": 10, "id": "Historical Data" }, { "color": "blue", "shape": "triangle", "size": 10, "id": "Process Data" }, { "color": "blue", "shape": "triangle", "size": 10, "id": "Simulation Data" }, { "color": "blue", "shape": "triangle", "size": 10, "id": "Metadata" }, { "color": "purple", "shape": "triangle", "size": 10, "id": "Geometric Data" }, { "color": "purple", "shape": "triangle", "size": 10, "id": "Sensor data" }, { "color": "red", "shape": "triangle", "size": 10, "id": "Landscape data" }, { "color": "red", "shape": "triangle", "size": 10, "id": "Biotic data" }, { "color": "red", "shape": "triangle", "size": 10, "id": "Abiotic Data" }, { "color": "red", "shape": "triangle", "size": 10, "id": "Behavioural Data" }, { "color": "blue", "shape": "square", "size": 10, "id": "Augmented Reality" }, { "color": "blue", "shape": "square", "size": 10, "id": "Data Visualization" }, { "color": "purple", "shape": "square", "size": 10, "id": "3D Geometric Modeling" }, { "color": "purple", "shape": "square", "size": 10, "id": "Dashboard Visualization" }, { "color": "purple", "shape": "square", "size": 10, "id": "Virtual Reality" }, { "color": "red", "shape": "square", "size": 10, "id": "Diel Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Radar Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Histogram" }, { "color": "red", "shape": "square", "size": 10, "id": "Rose Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Sammon Map" }, { "color": "red", "shape": "square", "size": 10, "id": "Bar Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Line Graph" }, { "color": "red", "shape": "square", "size": 10, "id": "Raster Map" }, { "color": "red", "shape": "square", "size": 10, "id": "Heat Map" }, { "color": "red", "shape": "square", "size": 10, "id": "Bathymetrical Map" }, { "color": "red", "shape": "square", "size": 10, "id": "Pie Chart" }, { "color": "red", "shape": "square", "size": 10, "id": "Box Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Stacked Bar Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Network Graph" }, { "color": "red", "shape": "square", "size": 10, "id": "Block Chart" }, { "color": "red", "shape": "square", "size": 10, "id": "Diagram" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Grafana" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Verge3D" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Bootstrap" }, { "color": "blue", "shape": "dot", "size": 10, "id": "WebXR" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Autodesk Revit" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Autodesk Forge" }, { "color": "blue", "shape": "dot", "size": 10, "id": "OpenScene Graph" }, { "color": "blue", "shape": "dot", "size": 10, "id": "COVISE" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Three.js" }, { "color": "blue", "shape": "dot", "size": 10, "id": "WebGL" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Creo" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Wikitude" }, { "color": "purple", "shape": "dot", "size": 10, "id": "Unity3D" }, { "color": "red", "shape": "dot", "size": 10, "id": "Blender" }, { "color": "purple", "shape": "dot", "size": 10, "id": "JQuery" }, { "color": "red", "shape": "dot", "size": 10, "id": "jsPanel" }, { "color": "purple", "shape": "dot", "size": 10, "id": "Unreal Engine" }, { "color": "purple", "shape": "dot", "size": 10, "id": "Javascript" }, { "color": "red", "shape": "dot", "size": 10, "id": "Backbone" }, { "color": "red", "shape": "dot", "size": 10, "id": ".NET" }, { "color": "red", "shape": "dot", "size": 10, "id": "D3.js" }, { "color": "red", "shape": "dot", "size": 10, "id": "R" }, { "color": "red", "shape": "dot", "size": 10, "id": "Python" }, { "color": "red", "shape": "dot", "size": 10, "id": "Jupyter Notebook" }, { "color": "red", "shape": "dot", "size": 10, "id": "CityEngine" }, { "color": "red", "shape": "dot", "size": 10, "id": "ARCGIS" }]);
    // Note: Make sure that conversion from JSON is compatible
    //const edges = new DataSet([{ "color": "blue", "width": 3, "from": "Historical Data", "to": "Augmented Reality" }, { "color": "blue", "width": 5, "from": "Historical Data", "to": "3D Geometric Modeling" }, { "color": "blue", "width": 3, "from": "Historical Data", "to": "Virtual Reality" }, { "color": "blue", "width": 1, "from": "Historical Data", "to": "Data Visualization" }, { "color": "blue", "width": 3, "from": "Process Data", "to": "Augmented Reality" }, { "color": "blue", "width": 4, "from": "Process Data", "to": "Data Visualization" }, { "color": "blue", "width": 3, "from": "Process Data", "to": "Dashboard Visualization" }, { "color": "blue", "width": 4, "from": "Process Data", "to": "3D Geometric Modeling" }, { "color": "blue", "width": 3, "from": "Process Data", "to": "Virtual Reality" }, { "color": "blue", "width": 8, "from": "Simulation Data", "to": "3D Geometric Modeling" }, { "color": "blue", "width": 7, "from": "Simulation Data", "to": "Virtual Reality" }, { "color": "blue", "width": 2, "from": "Simulation Data", "to": "Data Visualization" }, { "color": "blue", "width": 3, "from": "Simulation Data", "to": "Augmented Reality" }, { "color": "blue", "width": 1, "from": "Simulation Data", "to": "Dashboard Visualization" }, { "color": "blue", "width": 1, "from": "Metadata", "to": "Augmented Reality" }, { "color": "blue", "width": 2, "from": "Metadata", "to": "3D Geometric Modeling" }, { "color": "blue", "width": 1, "from": "Metadata", "to": "Virtual Reality" }, { "color": "blue", "width": 5, "from": "Geometric Data", "to": "Augmented Reality" }, { "color": "purple", "width": 17, "from": "Geometric Data", "to": "3D Geometric Modeling" }, { "color": "purple", "width": 10, "from": "Geometric Data", "to": "Virtual Reality" }, { "color": "blue", "width": 5, "from": "Sensor data", "to": "Augmented Reality" }, { "color": "purple", "width": 10, "from": "Sensor data", "to": "3D Geometric Modeling" }, { "color": "purple", "width": 6, "from": "Sensor data", "to": "Dashboard Visualization" }, { "color": "purple", "width": 6, "from": "Sensor data", "to": "Virtual Reality" }, { "color": "blue", "width": 5, "from": "Sensor data", "to": "Data Visualization" }, { "color": "red", "width": 1, "from": "Sensor data", "to": "Raster Map" }, { "color": "red", "width": 1, "from": "Sensor data", "to": "Heat Map" }, { "color": "red", "width": 1, "from": "Sensor data", "to": "Bathymetrical Map" }, { "color": "red", "width": 4, "from": "Landscape data", "to": "3D Geometric Modeling" }, { "color": "red", "width": 2, "from": "Landscape data", "to": "Virtual Reality" }, { "color": "red", "width": 2, "from": "Landscape data", "to": "Heat Map" }, { "color": "red", "width": 1, "from": "Landscape data", "to": "Box Plot" }, { "color": "red", "width": 1, "from": "Landscape data", "to": "Raster Map" }, { "color": "red", "width": 1, "from": "Landscape data", "to": "Bathymetrical Map" }, { "color": "red", "width": 2, "from": "Biotic data", "to": "Heat Map" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Stacked Bar Plot" }, { "color": "red", "width": 3, "from": "Biotic data", "to": "Network Graph" }, { "color": "red", "width": 2, "from": "Biotic data", "to": "Box Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Diel Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Radar Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Histogram" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Rose Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Sammon Map" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Bar Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Line Graph" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "3D Geometric Modeling" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Dashboard Visualization" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Pie Chart" }, { "color": "red", "width": 1, "from": "Abiotic Data", "to": "Block Chart" }, { "color": "red", "width": 1, "from": "Abiotic Data", "to": "Diagram" }, { "color": "red", "width": 1, "from": "Behavioural Data", "to": "Heat Map" }, { "color": "red", "width": 1, "from": "Behavioural Data", "to": "Box Plot" }, { "color": "blue", "width": 6, "from": "Augmented Reality", "to": "Unity3D" }, { "color": "blue", "width": 1, "from": "Augmented Reality", "to": "Wikitude" }, { "color": "blue", "width": 1, "from": "Augmented Reality", "to": "Creo" }, { "color": "blue", "width": 6, "from": "Data Visualization", "to": "Unity3D" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "Verge3D" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "JQuery" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "Bootstrap" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "WebXR" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "Creo" }, { "color": "purple", "width": 10, "from": "3D Geometric Modeling", "to": "Unity3D" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "Verge3D" }, { "color": "purple", "width": 3, "from": "3D Geometric Modeling", "to": "JQuery" }, { "color": "blue", "width": 2, "from": "3D Geometric Modeling", "to": "Bootstrap" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "WebXR" }, { "color": "purple", "width": 2, "from": "3D Geometric Modeling", "to": "Unreal Engine" }, { "color": "blue", "width": 2, "from": "3D Geometric Modeling", "to": "Autodesk Revit" }, { "color": "blue", "width": 2, "from": "3D Geometric Modeling", "to": "Autodesk Forge" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "OpenScene Graph" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "COVISE" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "Wikitude" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "Three.js" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "WebGL" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "Creo" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "CityEngine" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "jsPanel" }, { "color": "purple", "width": 1, "from": "3D Geometric Modeling", "to": "Javascript" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "Backbone" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "ARCGIS" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "Blender" }, { "color": "blue", "width": 1, "from": "Dashboard Visualization", "to": "Grafana" }, { "color": "purple", "width": 3, "from": "Dashboard Visualization", "to": "Unity3D" }, { "color": "blue", "width": 1, "from": "Dashboard Visualization", "to": "Autodesk Revit" }, { "color": "blue", "width": 2, "from": "Dashboard Visualization", "to": "Autodesk Forge" }, { "color": "purple", "width": 1, "from": "Dashboard Visualization", "to": "Javascript" }, { "color": "blue", "width": 1, "from": "Dashboard Visualization", "to": "Creo" }, { "color": "red", "width": 1, "from": "Dashboard Visualization", "to": ".NET" }, { "color": "purple", "width": 8, "from": "Virtual Reality", "to": "Unity3D" }, { "color": "blue", "width": 2, "from": "Virtual Reality", "to": "Verge3D" }, { "color": "purple", "width": 2, "from": "Virtual Reality", "to": "JQuery" }, { "color": "blue", "width": 2, "from": "Virtual Reality", "to": "Bootstrap" }, { "color": "blue", "width": 2, "from": "Virtual Reality", "to": "WebXR" }, { "color": "blue", "width": 1, "from": "Virtual Reality", "to": "OpenScene Graph" }, { "color": "blue", "width": 1, "from": "Virtual Reality", "to": "COVISE" }, { "color": "blue", "width": 1, "from": "Virtual Reality", "to": "Creo" }, { "color": "purple", "width": 1, "from": "Virtual Reality", "to": "Unreal Engine" }, { "color": "red", "width": 1, "from": "Virtual Reality", "to": "CityEngine" }, { "color": "red", "width": 1, "from": "Diel Plot", "to": "R" }, { "color": "red", "width": 1, "from": "Radar Plot", "to": "R" }, { "color": "red", "width": 1, "from": "Histogram", "to": "R" }, { "color": "red", "width": 1, "from": "Rose Plot", "to": "R" }, { "color": "red", "width": 1, "from": "Sammon Map", "to": "R" }, { "color": "red", "width": 1, "from": "Bar Plot", "to": "Python" }, { "color": "red", "width": 1, "from": "Bar Plot", "to": "Jupyter Notebook" }, { "color": "red", "width": 1, "from": "Line Graph", "to": "Python" }, { "color": "red", "width": 1, "from": "Line Graph", "to": "Jupyter Notebook" }, { "color": "red", "width": 1, "from": "Raster Map", "to": "ARCGIS" }, { "color": "red", "width": 1, "from": "Heat Map", "to": "Python" }, { "color": "red", "width": 1, "from": "Heat Map", "to": "Jupyter Notebook" }, { "color": "red", "width": 1, "from": "Heat Map", "to": "R" }, { "color": "red", "width": 1, "from": "Heat Map", "to": "ARCGIS" }, { "color": "red", "width": 1, "from": "Bathymetrical Map", "to": "ARCGIS" }, { "color": "red", "width": 1, "from": "Pie Chart", "to": "Javascript" }, { "color": "red", "width": 1, "from": "Pie Chart", "to": "D3.js" }, { "color": "red", "width": 1, "from": "Pie Chart", "to": "R" }, { "color": "red", "width": 2, "from": "Box Plot", "to": "R" }, { "color": "red", "width": 1, "from": "Stacked Bar Plot", "to": "Python" }, { "color": "red", "width": 1, "from": "Stacked Bar Plot", "to": "Jupyter Notebook" }, { "color": "red", "width": 2, "from": "Network Graph", "to": "Python" }, { "color": "red", "width": 2, "from": "Network Graph", "to": "Jupyter Notebook" }, { "color": "red", "width": 1, "from": "Network Graph", "to": "R" }, { "color": "red", "width": 1, "from": "Block Chart", "to": "R" }, { "color": "red", "width": 1, "from": "Diagram", "to": "R" }]);

    const legend_nodes2 = ["Data Type",
        "Visualization Technique",
        "Visualization Tool",
        "Used with digital twin data",
        "Used with ecosystem data",
        "Used with digital twin\n and ecosystem data"];

    nodes.forEach((node) => {
        node.label = node.id.toString();
        node.font = {
            face: "arial"
        };
        node.title = "fdhjkfsgdhjgfsdhjgfhjfshjsfjsgfhgfjkhsdgfjdhgfhjdk";

        if (!legend_nodes2.includes(node.label)) {
            if (node.color == 'blue') {
                node.color = {
                    background: 'blue',
                    border: 'black'
                }
            }
            if (node.color == 'red') {
                node.color = {
                    background: 'red',
                    border: 'black'
                }
            }
            if (node.color == 'purple') {
                node.color = {
                    background: 'purple',
                    border: 'black'
                }
            }
            node.color.highlight = {
                background: 'yellow',
                border: 'black'
            }
            node.color.hover = {
                background: 'yellow',
                border: 'black'
            }

        }
        
    });

    edges.forEach((edge) => {
        edge.title = "blabla";
        if (edge.color == 'blue') {
            edge.color = {
                color: 'blue',
                highlight: 'yellow',
                hover: 'yellow',
            }
        }
        if (edge.color == 'red') {
            edge.color = {
                color: 'red',
                highlight: 'yellow',
                hover: 'yellow',
            }
        }
        if (edge.color == 'purple') {
            edge.color = {
                color: 'purple',
                highlight: 'yellow',
                hover: 'yellow',
            }
        }
    });

    const options = {
        // Forceatlas settings: https://visjs.github.io/vis-network/docs/network/physics.html#
        physics: {
            enabled: true,
            forceAtlas2Based: {
                theta: 0.5,
                gravitationalConstant: -50,
                centralGravity: 0.01,
                springConstant: 0.08,
                springLength: 100,
                damping: 0.4,
                avoidOverlap: 0,
                //nodeDistance: 110000, // extra 
            }
        },
        // This is exactly like python graph
        //theta: 0.5,
        //gravitationalConstant: -50,
        //: 0.01, //
        //springLength: 100, // 
        //springConstant: 0.08,
       // damping: 0.4, //
       // avoidOverlap: 0,
       // minVelocity: 0.75,

        //nodeDistance: 1100, //
        //springStrength: 0.10, //
        //centralGravity: 0.33, //
        //springLength: 100, //  
        //damping: 0.95, //
        tooltips: {
            enabled: true,
        },
        interaction: {
            hover: true,
            navigationButtons: true,
            keyboard: true,
        }
    };

    const data = {
        nodes: nodes,
        edges: edges,
    };

    useEffect(() => {
        const network = containerRef.current && new Network(containerRef.current, data , options);
        setN(network);
    }, []);

    useEffect(() => {
        if (n) {
            nodes.forEach((node) => {
                if (selectedItems.some(item => node.label === item.label)) {
                    node.hidden = false;
                } else {
                    node.hidden = true;
                }
            });

            nodes.forEach((node) => {
                if (legend_nodes2.some(item => node.label === item)) {
                    node.hidden = false;
                }
            });

            edges.forEach((edge) => {
                edge.hidden = false;
            });
            n.setData({ nodes, edges });

            console.log(selectedItems, selectedItems.length)
            if (selectedItems.length == 0) {
                document.getElementById("graph_empty_text").hidden = false;
            } else {
                document.getElementById("graph_empty_text").hidden = true;
            }
        }
    }, [selectedItems]);

    if (n) {
        n.on('click', function (properties) {
            var ids;
            var clicked = null;
            if (properties.nodes.length != 0) {
                console.log('node!');
                ids = properties.nodes;

                // Legend nodes should not invoke onChange2 (Inforbar.js functionality)
                if (!legend_nodes2.includes(ids[0])) {
                    clicked = nodes.get(ids);
                }
            } else if (properties.edges.length != 0) {
                console.log('edge!');
                ids = properties.edges;
                clicked = edges.get(ids);
            }

            if (clicked != null) {
                console.log('clicked:', clicked);
                onChange2(clicked);
            }
        });

        // Source: https://jsfiddle.net/repufsmc/
        n.on("stabilizationProgress", function (params) {
            var maxWidth = 496;
            var minWidth = 20;
            var widthFactor = params.iterations / params.total;
            var width = Math.max(minWidth, maxWidth * widthFactor);

            document.getElementById("bar").style.width = width + "px";
            document.getElementById("text").innerText =
                Math.round(widthFactor * 100) + "%";
        });
        n.on("stabilizationIterationsDone", function () {
            document.getElementById("text").innerText = "100%";
            document.getElementById("bar").style.width = "496px";
            document.getElementById("loadingBar").style.opacity = 0;
            // really clean the dom element
            setTimeout(function () {
                document.getElementById("loadingBar").style.display = "none";
            }, 300);
        });

    }

    return (<div>
        <p id="graph_empty_text">The graph is empty. Please select options in 'Graph Options'.</p>
        <div id="graph-container" ref={containerRef} /><div />
        <div id="loadingBar">
            <div class="outerBorder">
                <div id="text">0%</div>
                <div id="border">
                    <div id="bar"></div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Graph;

